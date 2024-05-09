import classNames from 'classnames'
import React from 'react'
import { useIntl } from 'react-intl'

import { MAX_ARTICE_TITLE_LENGTH } from '~/common/enums'

import styles from './styles.module.css'

interface Props {
  defaultValue?: string
  update: (params: { title: any }) => void
}

const EditorTitle: React.FC<Props> = ({ defaultValue = '', update }) => {
  const intl = useIntl()
  const classes = classNames([styles.editorTitle])

  const [value, setValue] = React.useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) =>
    update({ title: value })

  React.useEffect(() => setValue(defaultValue), [defaultValue])

  const title = value.slice(0, MAX_ARTICE_TITLE_LENGTH)

  return (
    <header className={classes}>
      <input
        type="text"
        aria-label={intl.formatMessage({
          defaultMessage: 'Enter title ...',
          id: '//QMqf',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter title ...',
          id: '//QMqf',
        })}
        onChange={handleChange}
        onBlur={handleBlur}
        value={title}
      />
    </header>
  )
}

export default EditorTitle
