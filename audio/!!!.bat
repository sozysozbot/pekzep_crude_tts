for %%f in (*.mp3) do (
    echo %%~nf
    ffmpeg -i %%~nf.mp3 -af "silenceremove=start_periods=1:start_duration=0:start_threshold=-40dB:detection=peak,aformat=dblp,areverse,silenceremove=start_periods=1:start_duration=0:start_threshold=-40dB:detection=peak,aformat=dblp,areverse" ..\audio_syllables\%%~nf.mp3
)
pause
exit