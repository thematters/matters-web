import { createRef, useEffect, useState } from 'react'

import Field, { FieldProps } from '../Field'
import Item from './Item'
import styles from './styles.css'

/**
 * PIN Input Component
 *
 * @see {@url https://github.com/arunghosh/react-pin-input}
 *
 * Usage:
 *
 * ```jsx
 *   <Form.PinInput
 *     error="xxx"
 *     hint="xxx"
 *   />
 * ```
 *
 */

type InputProps = {
  length?: number
  onChange: (val: string) => void
  onComplete?: (val: string) => void
  name: string
  value: string
  autoFocus?: boolean
} & Omit<FieldProps, 'fieldMsgId'>

const Input: React.FC<InputProps> = ({
  length = 6,
  onChange,
  onComplete,

  name,
  value,
  label,
  autoFocus = true,
  extraButton,

  hint,
  error,
}) => {
  const values = [...value.split(''), ...Array(length).fill('')].slice(
    0,
    length
  )
  const [itemRefs, setItemRefs] = useState<any>([])

  useEffect(() => {
    setItemRefs((refs: any) =>
      Array(length)
        .fill('')
        .map((_, i) => refs[i] || createRef<any>())
    )
  }, [])

  useEffect(() => {
    if (value) {
      return
    }

    itemRefs[0]?.current?.focus()
  })

  const onItemChange = (val: string, index: number) => {
    const newValues = [
      ...values.slice(0, index),
      val,
      ...values.slice(index + 1),
    ]

    // Set focus on next
    let currentIndex = index
    if (val.length === 1 && index < length - 1) {
      currentIndex += 1
      itemRefs[currentIndex]?.current?.focus()
    }

    // Notify the parent
    const pin = newValues.join('')
    onChange(pin)

    if (pin.length === length && onComplete) {
      onComplete(pin)
    }
  }

  const onItemPaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain').split('')
    const newValues = [...values.slice(0, index), ...text, ...values].slice(
      0,
      length
    )

    // Notify the parent
    const pin = newValues.join('')
    onChange(pin)

    // Set focus
    itemRefs[Math.min(index + text.length, length - 1)]?.current?.focus()
  }

  const onBackspace = (index: number) => {
    if (index > 0) {
      itemRefs[index - 1].current?.focus()
    }
  }

  return (
    <Field>
      <Field.Header
        htmlFor={`field-${name}-1`}
        label={label}
        extraButton={extraButton}
      />

      <Field.Content>
        <section className="pin-input">
          {values.map((val, index) => (
            <Item
              key={index}
              value={val}
              id={`field-${name}-${index + 1}`}
              ref={itemRefs[index]}
              onChange={(v: string) => onItemChange(v, index)}
              onPaste={(event: React.ClipboardEvent<HTMLInputElement>) =>
                onItemPaste(event, index)
              }
              onBackspace={() => onBackspace(index)}
              autoFocus={autoFocus ? index === 0 : false}
            />
          ))}
        </section>
      </Field.Content>

      <Field.Footer
        fieldMsgId={`field-msg-${name}`}
        hint={hint}
        error={error}
      />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default Input
