@ECHO OFF

SET PLUGIN_DIR=%cd%
SET SARAH_DIR=%cd%\..\..\
SET NODEJS_DIR=%SARAH_DIR%\NodeJS
SET EXPRESSJS_DIR=%SARAH_DIR%\ExpressJS
SET NODE_CMD=%NODEJS_DIR%\node.exe
SET NPM_CMD=%NODEJS_DIR%\npm.cmd
SET PATH=%NODEJS_DIR%;%PATH%

SET NODE_PATH=%NODEJS_DIR%\node_modules\npm\node_modules;
SET NODE_PATH=%NODE_PATH%;%NODEJS_DIR%\node_modules
SET NODE_PATH=%NODE_PATH%;%EXPRESSJS_DIR%\node_modules
SET NODE_PATH=%NODE_PATH%;%SARAH_DIR%\script\lib;%SARAH_DIR%\script\vendor

call "%NPM_CMD%" install debug
REM call "%NPM_CMD%" install request
REM call "%NPM_CMD%" install q
REM call "%NPM_CMD%" install node-xmpp
call "%NPM_CMD%" install "%PLUGIN_DIR%\src\harmonyjs"
