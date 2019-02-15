import format from 'date-fns/format'
import isThisYear from 'date-fns/is_this_year'
import isToday from 'date-fns/is_today'
import isYesterday from 'date-fns/is_yesterday'

const FORMATS = {
  zh_hant: {
    absoluteToday: '今天 H:mm',
    absoluteYesterday: '昨天 H:mm',
    absoluteThisYear: 'M 月 D 日',
    absoluteFull: 'YYYY 年 M 月 D 日'
  },
  zh_hans: {
    absoluteToday: '今天 H:mm',
    absoluteYesterday: '昨天 H:mm',
    absoluteThisYear: 'M 月 D 日',
    absoluteFull: 'YYYY 年 M 月 D 日'
  },
  en: {
    absoluteToday: 'HH:mm',
    absoluteYesterday: 'MM-DD',
    absoluteThisYear: 'MM-DD',
    absoluteFull: 'YYYY-MM-DD'
  }
}

const absolute = (date: Date | string | number, lang: Language = 'zh_hant') => {
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
