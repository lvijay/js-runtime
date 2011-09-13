@echo off

rem Execute run.bat from the test/ directory.  Won't work from
rem anywhere else.  My .bat scripting fu is weak.
    
java -jar ../js.jar -strict -e "load('../runtime.js'); load('../lib.js'); load('example.js');"
