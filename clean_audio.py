import os

# 清理音频目录
audio_dir = "audio"

if os.path.exists(audio_dir):
    print(f"正在清理 {audio_dir} 目录...")
    files = os.listdir(audio_dir)
    for file in files:
        if file.endswith(".mp3"):
            file_path = os.path.join(audio_dir, file)
            try:
                os.remove(file_path)
                print(f"删除: {file}")
            except Exception as e:
                print(f"删除失败: {file} - {e}")
    print("清理完成！")
else:
    print(f"目录 {audio_dir} 不存在")
