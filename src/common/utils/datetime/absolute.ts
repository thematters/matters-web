import { format, isThisYear, parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

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

const absolute = ({
  date,
  lang = 'zh_hant',
  optionalYear = true,
  utc8,
}: {
  date: Date | string | number
  lang: Language
  optionalYear?: boolean
  utc8?: boolean
}) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  const pattern =
    optionalYear && isThisYear(date)
      ? FORMATS[lang].absoluteThisYear
      : FORMATS[lang].absoluteFull

  if (utc8) {
    return formatInTimeZone(date, 'Asia/Hong_Kong', pattern)
  }

  return format(date, pattern)
}

absolute.dateISO = (date: Date | string | number) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  return format(date, 'yyyy-MM-dd')
}

absolute.timeISO = (date: Date | string | number) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  return format(date, 'HH:mm')
}

absolute.monthDay = (dateString?: string, lang: Language = 'zh_hant') => {
  if (!dateString) return null
  const date =
    typeof dateString === 'string' ? parseISO(dateString) : dateString

  if (lang === 'en') {
    return format(date, 'LLLL d')
  } else {
    return format(date, 'M 月 d 日')
  }
}

absolute.minimalDate = (date: Date | string | number) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  const dateObj = new Date(date)

  if (isThisYear(dateObj)) {
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    return `${month}-${day}`
  }

  return absolute.dateISO(date)
}

export default absolute
