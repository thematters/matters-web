import autosize from 'autosize'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_ARTICE_SUMMARY_LENGTH,
} from '~/common/enums'

/**
 * This is an optional component for user to add summary.
 *
 * Usage:
 *   <EditorSummary
 *      devalutValue="Default summary"
 *      enable={true}
 *      texts={{}}
 *      update={() => func({ summary: '' })}
 *   />
 */

interface Props {
  defaultValue?: string
  enable?: boolean
  update: (params: { summary: any }) => void
}

const EditorSummary: React.FC<Props> = ({
  defaultValue = '',
  enable,
  update,
}) => {
  const intl = useIntl()
  const instance: React.RefObject<any> | null = useRef(null)
  const [value, setValue] = useState(defaultValue)
  const debouncedUpdate = useDebouncedCallback(() => {
    update({ summary: value })
  }, INPUT_DEBOUNCE)

  const length = (value && value.length) || 0

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = (event.target.value || '').replace(/\r\n|\r|\n/g, '')
    setValue(text)
    debouncedUpdate()
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) =>
    update({ summary: value })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key.toLowerCase() === KEYVALUE.enter) {
      event.preventDefault()
    }
  }

  const handlePaste = () => {
    // FIXME: triggers the height adjustment on paste
    setTimeout(() => {
      autosize.update(instance.current)
    })
  }

  React.useEffect(() => {
    if (enable && instance) {
      autosize(instance.current)
    }
  }, [])

  if (!enable) {
    return null
  }

  const counterClasses = classNames({
    counter: true,
    error: length > MAX_ARTICE_SUMMARY_LENGTH,
  })

  return (
    <section className="editor-summary">
      <textarea
        ref={instance}
        rows={1}
        aria-label={intl.formatMessage({
          defaultMessage: 'Enter summary…',
          id: '16zJ3o',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter summary…',
          id: '16zJ3o',
        })}
        value={value}
        onPaste={handlePaste}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <section className={counterClasses}>
        ({length}/{MAX_ARTICE_SUMMARY_LENGTH})
      </section>
    </section>
  )
}

export default EditorSummary
