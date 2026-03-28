@echo off
echo ========================================
echo   语音生成工具 - 使用edge-tts
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：未找到Python
    echo 请先安装Python 3.7+
    echo 下载地址：https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 检查edge-tts是否安装
python -c "import edge_tts" >nul 2>&1
if errorlevel 1 (
    echo 📦 正在安装edge-tts...
    pip install edge-tts
    if errorlevel 1 (
        echo ❌ edge-tts安装失败
        echo 请手动运行: pip install edge-tts
        pause
        exit /b 1
    )
)

echo ✅ 环境检查通过
echo.
echo 正在生成语音...
python generate_single_voice.py

echo.
echo ========================================
echo   完成！按任意键退出...
pause >nul
