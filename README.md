# OBLOT Viewer

GUI application to control embedded devices

## Getting started

```
npm install 
npm run rebuild
npm run electron:serve
```
The `rebuild` step is required to match the `serialport` module to Node bundled with electron

## Building

Because `electron-rebuild` produces correct module binary, and `electron-builder install-app-deps` creates a wrong one, you should (at least on Windows) deny Write acces to the following file, after `rebuild`:
```
oblot-viewer\node_modules\@serialport\bindings\build\Release\bindings.node
```
