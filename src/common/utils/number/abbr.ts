// https://github.com/domharrington/js-number-abbreviate/blob/master/index.js

const UNITS = ['k', 'm', 'b', 't'];

const abbreviate = (num: number, decPlaces: number): string => {
  decPlaces = Math.pow(10, decPlaces);

  for (let i = UNITS.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= num) {
      num = Math.round((num * decPlaces) / size) / decPlaces;

      if (num === 1000 && i < UNITS.length - 1) {
        num = 1;
        i++;
      }

      // @ts-ignore
      num += UNITS[i];

      break;
    }
  }

  return num + '';
};

export default (num: number, decPlaces: number): string => {
  const isNegative = num < 0;
  const abbreviatedNumber = abbreviate(Math.abs(num), decPlaces || 0);

  return isNegative ? '-' + abbreviatedNumber : abbreviatedNumber;
};
