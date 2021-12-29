@echo off
@echo %RANDOM% > nul
set /A rnd=%random% * 35 / 32768 + 25
echo %rnd%