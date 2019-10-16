import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const standard = (date: Date | string | number) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }

  return format(date, 'yyyy.MM.dd')
}

export default standard
