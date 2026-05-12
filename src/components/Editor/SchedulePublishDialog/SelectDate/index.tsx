import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { datetimeFormat } from '~/common/utils'
import { Form, LanguageContext } from '~/components'

import styles from './styles.module.css'

export interface SelectDateProps {
  onSelect: (date: Date) => void
}

const SelectDate = ({ onSelect }: SelectDateProps) => {
  const { lang } = useContext(LanguageContext)
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  )

  // Generate day options (today + next 3 days)
  const generateDayOptions = () => {
    const options = []
    const today = new Date()

    for (let i = 0; i < 4; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const dd = String(date.getDate()).padStart(2, '0')
      const value = `${yyyy}-${mm}-${dd}`

      const name = datetimeFormat.absolute.monthDay(date.toISOString(), lang)

      options.push({
        name,
        value,
        selected: selectedDay === value,
      })
    }

    return options
  }

  // Generate time options (30-minute intervals)
  const generateTimeOptions = () => {
    const options = []
    const now = new Date()
    const todayValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const isToday = selectedDay === todayValue

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

        // Skip times that are less than 5 minutes from now for today
        if (isToday) {
          const timeDate = new Date()
          timeDate.setHours(hour, minute, 0, 0)
          const minimumTime = new Date(now.getTime() + 5 * 60 * 1000) // 5 minutes from now
          if (timeDate <= minimumTime) {
            continue
          }
        }

        options.push({
          name: timeValue,
          value: timeValue,
          selected: selectedTime === timeValue,
        })
      }
    }

    return options
  }

  const handleDayChange = (option: { value: string | undefined }) => {
    setSelectedDay(option.value)
    setSelectedTime(undefined) // Reset time selection when day changes
  }

  const handleTimeChange = (option: { value: string | undefined }) => {
    if (!selectedDay || !option.value) return

    setSelectedTime(option.value)

    // Create Date object and call onSelect
    const [hours, minutes] = option.value.split(':').map(Number)
    const [year, month, day] = selectedDay.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day, hours, minutes, 0, 0)

    onSelect(selectedDate)
  }

  const RESET_DAY_OPTION = {
    name: <FormattedMessage defaultMessage="Select Date" id="ftg7GK" />,
    value: undefined,
    selected: !selectedDay,
  }

  const RESET_TIME_OPTION = {
    name: <FormattedMessage defaultMessage="Select Time" id="IW6zQv" />,
    value: undefined,
    selected: !selectedTime,
  }

  const dayOptions = [RESET_DAY_OPTION, ...generateDayOptions()]
  const timeOptions = selectedDay
    ? [RESET_TIME_OPTION, ...generateTimeOptions()]
    : [RESET_TIME_OPTION]

  return (
    <section className={styles.select}>
      <Form.Select<string | undefined>
        onChange={handleDayChange}
        options={dayOptions}
        theme="editorDatePicker"
      />

      <Form.Select<string | undefined>
        onChange={selectedDay ? handleTimeChange : () => {}}
        options={timeOptions}
        theme="editorDatePicker"
      />
    </section>
  )
}

export default SelectDate
