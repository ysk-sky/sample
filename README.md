# Quick Start
## 1．npm install
```
npm install
```

## 2．npm run
```
npm test
```

# Debug
## 1. npm install && selenium-server run
```
npm i -g selenium-standalone mocha
selenium-standalone install
selenium-standalone start
```
## 2．実行
別terminalでテストファイルを実行(例：t.js)

```
mocha t.js
```

grep optionで特定のテストのみを実行

```
mocha t.js -g 002
```

