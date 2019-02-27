import differenceInDays from 'date-fns/difference_in_days'
import differenceInHours from 'date-fns/difference_in_hours'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import isThisHour from 'date-fns/is_this_hour'
import isThisMinute from 'date-fns/is_this_minute'
import isThisWeek from 'date-fns/is_this_week'
import isToday from 'date-fns/is_today'

import absolute from './absolute'

const DIFFS = {
  zh_hant: {
    justNow: '剛刚',
    minuteAgo: ' 分钟前',
    minutesAgo: ' 分钟前',
    hourAgo: ' 小时前',
    hoursAgo: ' 小时前',
    dayAgo: ' 天前',
    daysAgo: ' 天前'
  },
  zh_hans: {
    justNow: '刚刚',
    minuteAgo: ' 分钟前',
    minutesAgo: ' 分钟前',
    hourAgo: ' 小时前',
    hoursAgo: ' 小时前',
    dayAgo: ' 天前',
    daysAgo: ' 天前'
  },
  en: {
    justNow: 'just now',
    minuteAgo: ' minute ago',
    minutesAgo: ' minutes ago',
    hourAgo: ' hour ago',
    hoursAgo: ' hours ago',
    dayAgo: ' day ago',
    daysAgo: ' days ago'
  }
}

const relative = (date: Date | string | number, lang: Language = 'zh_hant') => {
  if (isThisMinute(date)) {
    return DIFFS[lang].justNow
  }

  if (isThisHour(date)) {
    const diffMins = differenceInMinutes(new Date(), date) || 1
    return diffMins + DIFFS[lang][diffMins === 1 ? 'minuteAgo' : 'minuteAgo']
  }

  if (isToday(date)) {
    const diffHrs = differenceInHours(new Date(), date) || 1
    return diffHrs + DIFFS[lang][diffHrs === 1 ? 'hourAgo' : 'hoursAgo']
  }

  if (isThisWeek(date)) {
    const diffDays = differenceInDays(new Date(), date) || 1
    return diffDays + DIFFS[lang][diffDays === 1 ? 'dayAgo' : 'daysAgo']
  }

  return absolute(date, lang)
}

export default relative
