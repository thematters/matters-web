import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import isThisHour from 'date-fns/isThisHour'
import isToday from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'

import absolute from './absolute'

const DIFFS = {
  zh_hant: {
    justNow: '剛剛',
    minutesAgo: ' 分鐘前',
    hourAgo: ' 小時前',
    hoursAgo: ' 小時前',
  },
  zh_hans: {
    justNow: '刚刚',
    minutesAgo: ' 分钟前',
    hourAgo: ' 小时前',
    hoursAgo: ' 小时前',
  },
  en: {
    justNow: 'Now',
    minutesAgo: ' minutes ago',
    hourAgo: ' hour ago',
    hoursAgo: ' hours ago',
  },
} as const

/**
 * Platform-wise date time format
 *
 * @param {Date|string|number} date - input date
 * @param {Language} lang - switch format based on language
 * @param {boolean} isTruncated - `Feed needs truncated datetime
 * @returns {string}
 */
const relative = (
  date: Date | string | number,
  lang: Language = 'zh_hant',
  isTruncated: boolean = false
): string => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  // if it is within 2 minutes
  if (differenceInMinutes(date, new Date()) < 2) {
    return DIFFS[lang].justNow
  }

  if (isThisHour(date)) {
    const diffMins = differenceInMinutes(new Date(), date)
    return diffMins + (isTruncated ? 'm' : DIFFS[lang]['minutesAgo'])
  }

  if (isToday(date)) {
    const diffHrs = differenceInHours(new Date(), date) || 1
    return (
      diffHrs +
      (isTruncated ? 'h' : DIFFS[lang][diffHrs === 1 ? 'hourAgo' : 'hoursAgo'])
    )
  }

  return absolute(date, lang, isTruncated)
}

export default relative
