import { differenceInHours, differenceInMinutes, parseISO } from 'date-fns'

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
 * @returns {string}
 */
const relative = (
  date: Date | string | number,
  lang: Language = 'zh_hant'
): string => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  const diffMins = differenceInMinutes(new Date(), date)

  // if it is within 2 minutes
  if (diffMins < 2) {
    return DIFFS[lang].justNow
  }

  if (diffMins < 60) {
    return diffMins + DIFFS[lang]['minutesAgo']
  }

  const diffHrs = differenceInHours(new Date(), date)
  if (diffHrs < 24) {
    return diffHrs + DIFFS[lang][diffHrs === 1 ? 'hourAgo' : 'hoursAgo']
  }

  return absolute({ date, lang })
}

export default relative
