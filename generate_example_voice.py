import edge_tts
import asyncio
import os

async def generate_voice(text, output_file, voice="zh-CN-XiaoxiaoNeural", rate="-20%"):
    """
    使用edge-tts生成语音
    text: 要转换的文本
    output_file: 输出文件路径
    voice: 语音类型，使用晓晓（适合女幼童声音）
    rate: 语速，负值减慢语速
    """
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_file)
    print(f"语音生成完成: {output_file}")

if __name__ == "__main__":
    # 示例文本
    example_text = "主人，我要洗澡澡啦，好多泡泡哦，好舒服呀！"
    output_file = "example_voice.mp3"
    
    print("正在生成示例语音...")
    print(f"文本: {example_text}")
    print(f"语音: zh-CN-XiaoxiaoNeural (晓晓，女幼童声音)")
    print(f"语速: -20% (更慢)")
    
    try:
        asyncio.run(generate_voice(example_text, output_file))
        print(f"示例语音已生成: {os.path.abspath(output_file)}")
        print("请试听该文件，确认效果后再决定是否统一更换所有语音")
    except Exception as e:
        print(f"生成失败: {e}")
        print("请确保已安装edge-tts: pip install edge-tts")
