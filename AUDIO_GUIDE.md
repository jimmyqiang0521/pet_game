# 语音文件生成指南

## 📝 概述

本项目支持两种语音播放方式：
1. **本地音频文件**（推荐，音质好）- 需要先生成MP3文件
2. **Web Speech API**（备用，浏览器内置）- 无需生成文件

## 🎵 方式一：生成本地音频文件

### 1. 安装依赖

确保你已安装Python 3.7+，然后安装edge-tts：

```bash
pip install edge-tts
```

### 2. 运行生成脚本

在项目根目录执行：

```bash
python generate_voices.py
```

脚本会自动：
- 创建 `audio/` 目录
- 使用微软晓晓语音（可爱小女孩声音）
- 生成所有需要的MP3文件
- 文件名使用文本哈希值

### 3. 可用语音选择

在 `generate_voices.py` 中修改 `VOICE` 变量：

```python
VOICE = "zh-CN-XiaoxiaoNeural"  # 晓晓（推荐，可爱小女孩）
# 其他可选：
# "zh-CN-YunxiNeural" - 云希（男孩）
# "zh-CN-YunyangNeural" - 云扬（男声）
# "zh-CN-XiaoyouNeural" - 晓悠（小女孩）
```

## 🎯 方式二：使用Web Speech API

如果不生成音频文件，系统会自动回退到浏览器内置语音合成。

可以在语音设置面板中：
- 调整语速和音调
- 选择不同的浏览器语音
- 测试语音效果

## 📂 文件结构

```
宠物/
├── audio/                    # 生成的音频文件目录
│   ├── 1a2b3c4d.mp3
│   ├── 5e6f7g8h.mp3
│   └── ...
├── generate_voices.py        # 语音生成脚本
├── AUDIO_GUIDE.md           # 本说明文档
└── ...
```

## 🔧 自定义话术

在 `generate_voices.py` 的 `MESSAGES` 字典中修改或添加话术：

```python
MESSAGES = {
    "cat": {
        "feed": [
            "你的自定义话术1",
            "你的自定义话术2",
        ],
        # ...
    }
}
```

修改后重新运行 `generate_voices.py` 即可。

## 🚀 部署到GitHub Pages

生成音频文件后，将 `audio/` 目录一起提交到GitHub：

```bash
git add audio/
git commit -m "添加语音文件"
git push
```

## 💡 提示

- 音频文件使用文本哈希值命名，避免重复生成
- 如果某段话术没有对应音频，会自动回退到Web Speech API
- 建议使用Edge浏览器测试Web Speech API，语音选择更多
