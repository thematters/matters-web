import format from 'date-fns/format'

const standard = (date: Date | string | number) => {
  return format(date, 'YYYY.MM.DD')
}

export default standard
