import format from 'date-fns/format'
import isThisYear from 'date-fns/isThisYear'
import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import parseISO from 'date-fns/parseISO'

const FORMATS = {
  zh_hant: {
    absoluteToday: '今天 H:mm',
    absoluteYesterday: '昨天 H:mm',
    absoluteThisYear: 'M 月 d 日',
    absoluteFull: 'yyyy 年 M 月 d 日'
  },
  zh_hans: {
    absoluteToday: '今天 H:mm',
    absoluteYesterday: '昨天 H:mm',
    absoluteThisYear: 'M 月 d 日',
    absoluteFull: 'yyyy 年 M 月 d 日'
  },
  en: {
    absoluteToday: 'HH:mm',
    absoluteYesterday: 'MM-dd',
    absoluteThisYear: 'MM-dd',
    absoluteFull: 'yyyy-MM-dd'
  }
}

const absolute = (date: Date | string | number, lang: Language = 'zh_hant') => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  if (isToday(date)) {
    return format(date, FORMATS[lang].absoluteToday)
  }

  if (isYesterday(date)) {
    return format(date, FORMATS[lang].absoluteYesterday)
  }

  if (isThisYear(date)) {
    return format(date, FORMATS[lang].absoluteThisYear)
  }

  return format(date, FORMATS[lang].absoluteFull)
}

export default absolute
