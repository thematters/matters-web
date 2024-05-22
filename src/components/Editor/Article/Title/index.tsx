import autosize from 'autosize'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_ARTICE_TITLE_LENGTH,
} from '~/common/enums'

interface Props {
  defaultValue?: string
  update: (params: { title: any }) => void
}

const EditorTitle: React.FC<Props> = ({ defaultValue = '', update }) => {
  const intl = useIntl()
  const instance: React.RefObject<any> | null = useRef(null)
  const [value, setValue] = useState(defaultValue)
  const debouncedUpdate = useDebouncedCallback(() => {
    update({ title: value })
  }, INPUT_DEBOUNCE)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = event.target.value.slice(0, MAX_ARTICE_TITLE_LENGTH)
    setValue(title)
    debouncedUpdate()
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) =>
    update({ title: value })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key.toLowerCase() === KEYVALUE.enter) {
      event.preventDefault()
    }
  }

  React.useEffect(() => {
    if (instance) {
      autosize(instance.current)
    }
  }, [])

  return (
    <header className="editor-title">
      <textarea
        ref={instance}
        rows={1}
        aria-label={intl.formatMessage({
          defaultMessage: 'Enter title ...',
          id: '//QMqf',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter title ...',
          id: '//QMqf',
        })}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default EditorTitle
