import asyncio
import edge_tts
import os
import sys

async def main():
    # 检查edge-tts是否安装
    try:
        import edge_tts
    except ImportError:
        print("错误：未安装edge-tts")
        print("请先运行: pip install edge-tts")
        return
    
    # 配置参数
    TEXT = "小朋友，我们一起学画画吧，真开心！"
    VOICE = "zh-CN-XiaoxiaoNeural"  # 晓晓 - 5岁可爱小女孩
    RATE = "+2"  # 语速稍微加快，让声音更活泼
    OUTPUT = "voice_test.mp3"
    
    print(f"正在生成语音...")
    print(f"文本: {TEXT}")
    print(f"语音: {VOICE}")
    print(f"输出: {OUTPUT}")
    print("-" * 50)
    
    try:
        communicate = edge_tts.Communicate(TEXT, VOICE, rate=RATE)
        await communicate.save(OUTPUT)
        print(f"✅ 成功！语音已保存到: {os.path.abspath(OUTPUT)}")
    except Exception as e:
        print(f"❌ 生成失败: {e}")

if __name__ == "__main__":
    asyncio.run(main())
