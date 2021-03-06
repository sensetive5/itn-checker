/**
 * Функция проверяет корректность ИНН номера
 * @param {String|Number} innNumber
 * @return {Boolean}
 */
export function checkItn (innNumber: string | number): boolean {
  const itnNumber = typeof innNumber === 'number'
    ? innNumber.toString()
    : innNumber;

  if (!isCorrectNumber(itnNumber))
    throw new Error ('INN number should contain only digits');

  if (!isCorrectLength(itnNumber))
    throw new Error ('INN length should be 10 or 12');

  switch (getLength(itnNumber)) {
    case 10:
    	return checkTenInnNumber(itnNumber);
    case 12:
      return checkTwelveInnNumber(itnNumber);
  }
}

/**
 * Проверяет длинну ИНН номера
 * @param {String} innNumber
 * @return {Boolean}
 */
function isCorrectLength (innNumber = ''): boolean {
  const CORRECT_LENGTHS = [10, 12];
  return CORRECT_LENGTHS.includes(getLength(innNumber));
}

/**
 * Проверяет условие, чтобы в номере не было букв
 * @param {String} innNumber
 * @return {Boolean}
 */
function isCorrectNumber (innNumber = ''): boolean {
  return innNumber
    .split('')
    .every(number => isNaN(parseInt(number)) === false);
}

/**
 * Возвращает длинну ИНН номера
 * @param {String} innNumber
 * @return {Number}
 */
function getLength (innNumber = ''): number {
  return innNumber.length;
}

/**
 * Проверяет ИНН на валидность
 * @param {String} innNumber
 * @param {Number[]} multiplicators
 * @param {Boolean} isTwelve
 */
function checkNumber (
  innNumber = '',
  multiplicators: number[] = [],
  isTwelve = false
): boolean {
  const DIVIDER = 11;

  const lastNumber = getLastNumber(innNumber, isTwelve);
  const checkSum = getCheckSum(innNumber, multiplicators, isTwelve);
  const preparedCheckSum = prepareCheckSum(checkSum, DIVIDER);
  return compareCheckSums(checkSum, preparedCheckSum) === lastNumber;
}

/**
 * Проверяет десятизначный ИНН номер на корректность
 * @param {String} innNumber
 * @return {Boolean}
 */
function checkTenInnNumber (innNumber = ''): boolean {
  const TEN_INN_NUMBER_MULTIPLICATORS = [2, 4, 10, 3, 5, 9, 4, 6, 8];

  return checkNumber(innNumber, TEN_INN_NUMBER_MULTIPLICATORS);
}

/**
 * Проверяет двенадцатизначный ИНН номер на корректность
 * @param {String} innNumber
 * @return {Boolean}
 */
function checkTwelveInnNumber (innNumber = ''): boolean {
  const TWELVE_INN_NUMBER_MULTIPLICATORS_PART_1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

  const firstCheckResult = checkNumber(innNumber, TWELVE_INN_NUMBER_MULTIPLICATORS_PART_1, true)

  if (!firstCheckResult)
  	return firstCheckResult;

  const TWELVE_INN_NUMBER_MULTIPLICATORS_PART_2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
  return checkNumber(innNumber, TWELVE_INN_NUMBER_MULTIPLICATORS_PART_2);
}

/**
 * Возвращает контрольную сумму ИНН чисел
 * @param {String} innNumber
 * @param {Number[]} multiplicators
 * @param {Boolean} isTwelve
 * @return {Number}
 */

function getCheckSum (
  innNumber = '',
  multiplicators: number[] = [],
  isTwelve = false
): number {
  const preparedInnNumber = prepareInnNumber(innNumber, isTwelve);
  return preparedInnNumber.reduce((sum, number, idx) => sum + (number * multiplicators[idx]), 0);
}

/**
 * Преобразовывает ИНН номер в валидный для проверки,
 * отсекая последний знак или два последних знака (для 12 значных ИНН)
 *
 * @param {String} innNumber
 * @param {Boolean} isTwelve
 * @return {Number[]}
 */
function prepareInnNumber (innNumber = '', isTwelve = false) {
  const howMany = isTwelve
    ? -2
    : -1;

  return innNumber
    .split('')
    .slice(0, howMany)
    .map(number => +number);
}

/**
 * Берет последние или предпоследние число в ИНН
 * в зависимости от длинны номера
 *
 * @param {String} innNumber
 * @param {Boolean} isTwelve
 * @returns {Number}
 */
function getLastNumber (
  innNumber = '',
  isTwelve = false
): number {
  return isTwelve
    ? +innNumber.split('').slice(-2, -1).pop()
    : +innNumber.split('').slice(-1).pop()
}

/**
 * Подготавливает контрольную сумму
 *
 * @param {Number} sum
 * @param {Number} divider
 * @return {Number}
 */
function prepareCheckSum (
  sum = 0,
  divider = 1
): number {
  return (Math.trunc(sum / divider)) * divider;
}

/**
 * Результат сравнения двух контрольных сумм
 *
 * @param {Number} originalCheckSum
 * @param {Number} preparedCheckSum
 * @return {Number}
 */
function compareCheckSums (
  originalCheckSum = 0,
  preparedCheckSum = 0
): number {
  const difference = originalCheckSum - preparedCheckSum;
  return difference === 10
    ? 0
    : difference;
}
