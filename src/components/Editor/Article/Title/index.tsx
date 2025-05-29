import autosize from 'autosize'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import {
  FOCUS_EDITOR_SUMMARY,
  FOCUS_EDITOR_TITLE,
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_ARTICE_TITLE_LENGTH,
} from '~/common/enums'
import { useEventListener } from '~/components'

interface Props {
  defaultValue?: string
  update: (params: { title: string }) => void
}

const EditorTitle: React.FC<Props> = ({ defaultValue = '', update }) => {
  const intl = useIntl()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState(defaultValue)
  const debouncedUpdate = useDebouncedCallback(() => {
    update({ title: value })
  }, INPUT_DEBOUNCE)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = event.target.value
      .replace(/\r\n|\r|\n/g, '')
      .slice(0, MAX_ARTICE_TITLE_LENGTH)
    setValue(title)
    debouncedUpdate()
  }

  const handleBlur = () => update({ title: value })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement

    if (
      event.key.toLowerCase() === KEYVALUE.enter &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()

      if (target.selectionStart === target.value.length) {
        window.dispatchEvent(new CustomEvent(FOCUS_EDITOR_SUMMARY))
      }
    }
  }

  const handlePaste = () => {
    // FIXME: triggers the height adjustment on paste
    setTimeout(() => {
      autosize.update(inputRef.current!)
    })
  }

  useEffect(() => {
    if (inputRef.current) {
      autosize(inputRef.current)
    }
  }, [])

  useEventListener(FOCUS_EDITOR_TITLE, () => {
    if (!inputRef.current) return

    inputRef.current.focus()

    // Set cursor to the end of the text
    const pos = inputRef.current.value.length
    inputRef.current.setSelectionRange(pos, pos)
  })

  return (
    <header className="editor-title">
      <textarea
        ref={inputRef}
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
        onPaste={handlePaste}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default EditorTitle
