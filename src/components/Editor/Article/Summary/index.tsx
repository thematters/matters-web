import { Editor } from '@matters/matters-editor'
import autosize from 'autosize'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  FOCUS_EDITOR_SUMMARY,
  FOCUS_EDITOR_TITLE,
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_ARTICE_SUMMARY_LENGTH,
} from '~/common/enums'
import { useEventListener } from '~/components'

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
  editor?: Editor | null
}

const EditorSummary: React.FC<Props> = ({
  defaultValue = '',
  enable,
  update,
  editor,
}) => {
  const intl = useIntl()
  const inputRef = useRef<HTMLTextAreaElement>(null)
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
    const target = event.target as HTMLTextAreaElement

    if (
      event.key.toLowerCase() === KEYVALUE.enter &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()

      if (target.selectionStart === target.value.length) {
        editor?.commands.focus('start')
      }
    }

    if (
      event.key.toLowerCase() === KEYVALUE.backSpace &&
      target.selectionStart === 0
    ) {
      event.preventDefault()
      window.dispatchEvent(new CustomEvent(FOCUS_EDITOR_TITLE))
    }
  }

  const handlePaste = () => {
    // FIXME: triggers the height adjustment on paste
    setTimeout(() => {
      autosize.update(inputRef.current!)
    })
  }

  useEffect(() => {
    if (enable && inputRef.current) {
      autosize(inputRef.current)
    }
  }, [])

  useEventListener(FOCUS_EDITOR_SUMMARY, () => {
    if (!inputRef.current) return

    inputRef.current.focus()

    // Set cursor to the end of the text
    const pos = inputRef.current.value.length
    inputRef.current.setSelectionRange(pos, pos)
  })

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
        ref={inputRef}
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
