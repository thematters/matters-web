import abbr from './abbr';

export const numPrefix = (num: number | string) => {
  const parsedNum = parseFloat(num + '');
  return parsedNum > 0 ? `+${num}` : num;
};

// https://stackoverflow.com/a/14428340
export const numFormat = (
  num: number,
  decimal: number = 0,
  sections: number = 3
) => {
  const re =
    '\\d(?=(\\d{' + sections + '})+' + (decimal > 0 ? '\\.' : '$') + ')';
  return num
    .toFixed(Math.max(0, ~~decimal))
    .replace(new RegExp(re, 'g'), '$&,');
};

export const numAbbr = (num: number, decPlaces: number = 2) =>
  abbr(num, decPlaces);
