import edge_tts
import asyncio

async def list_voices():
    """
    列出edge-tts支持的所有中文语音
    """
    voices = await edge_tts.list_voices()
    
    print("=== Edge TTS 中文语音列表 ===")
    print("语音ID | 语音名称 | 性别 | 语言")
    print("-" * 80)
    
    for voice in voices:
        if voice["Locale"].startswith("zh-"):
            gender = voice.get("Gender", "Unknown")
            name = voice.get("LocalName", "Unknown")
            voice_id = voice["ShortName"]
            locale = voice["Locale"]
            print(f"{voice_id} | {name} | {gender} | {locale}")

if __name__ == "__main__":
    print("正在获取中文语音列表...")
    asyncio.run(list_voices())
    print("\n请选择一个适合女幼童的语音，然后修改generate_example_voice.py中的voice参数")
