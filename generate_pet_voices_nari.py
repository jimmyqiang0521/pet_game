# Filter warnings before any imports
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", message=".*weight_norm.*")
warnings.filterwarnings("ignore", message=".*TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD.*")

import os
import sys
import hashlib
import numpy as np
import soundfile as sf
import torch
from pathlib import Path

# 添加Nari-Dia-TTS目录到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Nari-Dia-TTS'))

from dia.model import Dia

# 创建音频目录
AUDIO_DIR = "audio"
if not os.path.exists(AUDIO_DIR):
    os.makedirs(AUDIO_DIR)

# 语音消息配置（与voice.js保持一致）
MESSAGES = {
    "cat": {
        "feed": [
            "谢谢主人～好好吃哦！",
            "喵喵～香香哒！",
            "主人最好啦～",
            "吃饱饱啦～谢谢主人！",
            "喵～这个好好吃哦！",
            "主人喂我吃东西～好幸福！"
        ],
        "play": [
            "好开心好开心～喵喵！",
            "再来一次嘛～喵喵！",
            "主人陪我玩～最开心啦！",
            "嘻嘻～好好玩哦！",
            "喵～太好玩啦！还想玩！",
            "和主人一起玩～好幸福！"
        ],
        "clean": [
            "洗香香啦～好舒服哦！",
            "喵～泡泡好多哦！",
            "主人帮我洗澡澡～好开心！",
            "搓搓背～好舒服呀！",
            "喵喵～现在香香的啦！",
            "洗澡澡真好玩～泡泡飞飞！",
            "主人～水水暖暖的～好舒服！",
            "喵～搓搓小爪爪～"
        ],
        "sleep": [
            "晚安主人～我要睡觉觉啦！",
            "喵～困了困了...呼呼...",
            "主人晚安～做个好梦哦！",
            "谢谢主人～我要休息啦！",
            "呼呼呼～好困哦...",
            "喵～我要睡美容觉啦！"
        ],
        "hungry": [
            "主人～肚肚饿了...",
            "喵喵～肚子咕咕叫！",
            "想吃好吃的～主人...",
            "主人～有吃的吗？",
            "肚肚好饿哦～喵..."
        ],
        "tired": [
            "主人～我累了...",
            "想睡觉觉了喵...",
            "好困好困...",
            "需要休息一下下...",
            "主人～我想睡觉觉..."
        ],
        "dirty": [
            "主人～我想洗澡澡...",
            "身上不舒服喵～想香香的！",
            "主人帮我洗澡澡嘛～",
            "我想变得香香的～喵！"
        ],
        "sad": [
            "主人～陪我玩嘛...",
            "好无聊哦～喵...",
            "主人抱抱我～",
            "想要主人陪～喵..."
        ],
        "happy": [
            "今天好开心好开心！",
            "喵喵喵～好幸福！",
            "最喜欢主人啦！",
            "幸福满满～喵喵！",
            "主人对我最好啦～"
        ],
        "welcome": [
            "你好呀～我是你的小猫咪！",
            "喵～见到你真开心！",
            "以后要好好照顾我哦～喵！"
        ],
        "login": [
            "主人回来啦～想死你了！",
            "喵喵～主人终于回来啦！",
            "欢迎回家～主人！"
        ]
    },
    "dog": {
        "feed": [
            "谢谢主人～好好吃哦！",
            "汪汪～香香哒！",
            "主人最好啦～",
            "吃饱饱啦～谢谢主人！",
            "汪～这个好好吃哦！",
            "主人喂我吃东西～好幸福！"
        ],
        "play": [
            "好开心好开心～汪汪！",
            "再来一次嘛～汪汪！",
            "主人陪我玩～最开心啦！",
            "嘻嘻～好好玩哦！",
            "汪～太好玩啦！还想玩！",
            "和主人一起玩～好幸福！"
        ],
        "clean": [
            "洗香香啦～好舒服哦！",
            "汪～泡泡好多哦！",
            "主人帮我洗澡澡～好开心！",
            "搓搓背～好舒服呀！",
            "汪汪～现在香香的啦！",
            "洗澡澡真好玩～泡泡飞飞！",
            "主人～水水暖暖的～好舒服！",
            "汪～搓搓小爪爪～"
        ],
        "sleep": [
            "晚安主人～我要睡觉觉啦！",
            "汪～困了困了...呼呼...",
            "主人晚安～做个好梦哦！",
            "谢谢主人～我要休息啦！",
            "呼呼呼～好困哦...",
            "汪～我要睡美容觉啦！"
        ],
        "hungry": [
            "主人～肚肚饿了...",
            "汪汪～肚子咕咕叫！",
            "想吃好吃的～主人...",
            "主人～有吃的吗？",
            "肚肚好饿哦～汪..."
        ],
        "tired": [
            "主人～我累了...",
            "想睡觉觉了汪...",
            "好困好困...",
            "需要休息一下下...",
            "主人～我想睡觉觉..."
        ],
        "dirty": [
            "主人～我想洗澡澡...",
            "身上不舒服汪～想香香的！",
            "主人帮我洗澡澡嘛～",
            "我想变得香香的～汪！"
        ],
        "sad": [
            "主人～陪我玩嘛...",
            "好无聊哦～汪...",
            "主人抱抱我～",
            "想要主人陪～汪..."
        ],
        "happy": [
            "今天好开心好开心！",
            "汪汪汪～好幸福！",
            "最喜欢主人啦！",
            "幸福满满～汪汪！",
            "主人对我最好啦～"
        ],
        "welcome": [
            "你好呀～我是你的小狗狗！",
            "汪～见到你真开心！",
            "以后要好好照顾我哦～汪！"
        ],
        "login": [
            "主人回来啦～想死你了！",
            "汪汪～主人终于回来啦！",
            "欢迎回家～主人！"
        ]
    },
    "rabbit": {
        "feed": [
            "谢谢主人～好好吃哦！",
            "香香哒～好好吃！",
            "主人最好啦～",
            "吃饱饱啦～谢谢主人！",
            "这个好好吃哦！",
            "主人喂我吃东西～好幸福！"
        ],
        "play": [
            "好开心好开心～蹦蹦跳跳！",
            "再来一次嘛～",
            "主人陪我玩～最开心啦！",
            "嘻嘻～好好玩哦！",
            "太好玩啦！还想玩！",
            "和主人一起玩～好幸福！"
        ],
        "clean": [
            "洗香香啦～好舒服哦！",
            "哇～泡泡好多哦！",
            "主人帮我洗澡澡～好开心！",
            "搓搓背～好舒服呀！",
            "现在香香的啦！",
            "洗澡澡真好玩～泡泡飞飞！",
            "主人～水水暖暖的～好舒服！",
            "搓搓小爪爪～"
        ],
        "sleep": [
            "晚安主人～我要睡觉觉啦！",
            "困了困了...呼呼...",
            "主人晚安～做个好梦哦！",
            "谢谢主人～我要休息啦！",
            "呼呼呼～好困哦...",
            "我要睡美容觉啦！"
        ],
        "hungry": [
            "主人～肚肚饿了...",
            "肚子咕咕叫！",
            "想吃好吃的～主人...",
            "主人～有吃的吗？",
            "肚肚好饿哦..."
        ],
        "tired": [
            "主人～我累了...",
            "想睡觉觉了...",
            "好困好困...",
            "需要休息一下下...",
            "主人～我想睡觉觉..."
        ],
        "dirty": [
            "主人～我想洗澡澡...",
            "身上不舒服～想香香的！",
            "主人帮我洗澡澡嘛～",
            "我想变得香香的！"
        ],
        "sad": [
            "主人～陪我玩嘛...",
            "好无聊哦...",
            "主人抱抱我～",
            "想要主人陪～"
        ],
        "happy": [
            "今天好开心好开心！",
            "蹦蹦跳跳～好幸福！",
            "最喜欢主人啦！",
            "幸福满满～",
            "主人对我最好啦～"
        ],
        "welcome": [
            "你好呀～我是你的小兔子！",
            "见到你真开心！",
            "以后要好好照顾我哦～"
        ],
        "login": [
            "主人回来啦～想死你了！",
            "主人终于回来啦！",
            "欢迎回家～主人！"
        ]
    }
}

# 生成文本的哈希值作为文件名
def get_filename(text):
    hash_obj = hashlib.md5(text.encode('utf-8'))
    return hash_obj.hexdigest() + ".mp3"

def generate_voice(model, text, output_path):
    """使用Nari-Dia-TTS生成单个语音文件"""
    try:
        # 使用模型生成音频
        with torch.inference_mode():
            output_audio_np = model.generate(
                text,
                max_tokens=1500,  # 适合短句
                cfg_scale=3.0,
                temperature=1.3,
                top_p=0.95,
                use_cfg_filter=True,
                cfg_filter_top_k=30,
                use_torch_compile=False,
                audio_prompt_path=None
            )
        
        if output_audio_np is not None:
            # 调整速度（稍慢语速）
            speed_factor = 0.9
            original_len = len(output_audio_np)
            target_len = int(original_len / speed_factor)
            if target_len != original_len and target_len > 0:
                x_original = np.arange(original_len)
                x_resampled = np.linspace(0, original_len - 1, target_len)
                resampled_audio_np = np.interp(x_resampled, x_original, output_audio_np)
                output_audio_np = resampled_audio_np
            
            # 保存为MP3文件
            sf.write(output_path, output_audio_np, 44100, format='MP3')
            print(f"✓ 生成成功: {output_path}")
            return True
        else:
            print(f"✗ 生成失败: {text} - 没有生成音频")
            return False
    except Exception as e:
        print(f"✗ 生成失败: {text} - {e}")
        return False

def main():
    print("开始加载Nari-Dia-TTS模型...")
    print("这可能需要一些时间，因为需要下载模型...")
    
    # 加载模型
    try:
        model = Dia.from_pretrained("nari-labs/Dia-1.6B")
        print("模型加载成功！")
    except Exception as e:
        print(f"模型加载失败: {e}")
        return
    
    print(f"开始生成语音文件...")
    print(f"输出目录: {AUDIO_DIR}")
    print("=" * 50)
    
    # 统计
    total_files = 0
    success_count = 0
    
    # 生成所有语音
    for pet_type, categories in MESSAGES.items():
        for category, messages in categories.items():
            for text in messages:
                filename = get_filename(text)
                output_path = os.path.join(AUDIO_DIR, filename)
                
                # 如果文件已存在，跳过
                if os.path.exists(output_path):
                    print(f"- 已存在，跳过: {text[:20]}...")
                    total_files += 1
                    success_count += 1
                    continue
                
                total_files += 1
                if generate_voice(model, text, output_path):
                    success_count += 1
                
                # 避免请求过快
                import time
                time.sleep(0.5)
    
    print("=" * 50)
    print(f"完成！共 {success_count}/{total_files} 个文件")
    print(f"文件保存在: {os.path.abspath(AUDIO_DIR)}")

if __name__ == "__main__":
    main()