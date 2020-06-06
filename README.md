# itn-checker
Модуль проверяющий на корректность ИНН номера. Осуществляет проверку десятизначных и двенадцатизначных ИНН номеров. Сравнение идет по контрольным суммам.

Написан на TypeScript.
Сборка осуществляется с помощью Rollup.

## Установка

Если вы используете NPM, то введите следующую команду

```npm install --save itn-checker```

Если Yarn

```yarn add itn-checker```

## Использование

*Использование как ESM модуль.*
```
import { checkItn } from 'itn-checker';

const isItnCorrect = checkItn(7707083893);
// isItnCorrect will be true or false if ITN number is incorrect;
```
---
*Использование как CommonJS модуль.*
```
const { checkItn } = require('itn-checker');

const isItnCorrect = checkItn(7707083893);
// isItnCorrect will be true or false if ITN number is incorrect;
```
---
*Использование в HTML файлах.*
```
<script src="./node_modules/itn-checker/dist/browser.js"></script>
<script>
  (function () {
      var isItnCorrect = ItnChecker.checkItn(7707083893);
      // isItnCorrect will be true or false if ITN number is incorrect;
  })();
</script>
```
