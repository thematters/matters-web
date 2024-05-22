import format from 'date-fns/format'
import isThisYear from 'date-fns/isThisYear'
import parseISO from 'date-fns/parseISO'

const FORMATS = {
  zh_hant: {
    absoluteThisYear: 'M 月 d 日',
    absoluteFull: 'yyyy 年 M 月 d 日',
  },
  zh_hans: {
    absoluteThisYear: 'M 月 d 日',
    absoluteFull: 'yyyy 年 M 月 d 日',
  },
  en: {
    absoluteThisYear: 'LLL d',
    absoluteFull: 'LLL d, yyyy',
  },
} as const

const TRUNC_FORMATS = {
  absoluteTruncatedThisYear: 'MM-dd',
  absoluteTruncatedFull: 'yyyy-MM-dd',
} as const

const absolute = (
  date: Date | string | number,
  lang: Language = 'zh_hant',
  isTruncated: boolean = false
) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  if (isThisYear(date)) {
    return format(
      date,
      isTruncated
        ? TRUNC_FORMATS.absoluteTruncatedThisYear
        : FORMATS[lang].absoluteThisYear
    )
  }

  return format(
    date,
    isTruncated
      ? TRUNC_FORMATS.absoluteTruncatedFull
      : FORMATS[lang].absoluteFull
  )
}

export default absolute
