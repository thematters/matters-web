import { createRef, useEffect, useState } from 'react'

import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'

import Field, { FieldProps } from '../Field'
import Item from './Item'
import styles from './styles.module.css'

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

export type PinInputProps = {
  length?: number
  onChange: (val: string) => void
  onComplete?: (val: string) => void
  name: string
  value: string
} & Omit<FieldProps, 'fieldMsgId'>

const PinInput: React.FC<PinInputProps> = ({
  length = PAYMENT_PASSSWORD_LENGTH,
  onChange,
  onComplete,

  name,
  value,
  label,
  extraButton,
  hasLabel,

  hint,
  error,
  hintAlign,

  spacingTop,
  spacingBottom,
}) => {
  const values = [...value.split(''), ...Array(length).fill('')].slice(
    0,
    length
  )
  const [itemRefs, setItemRefs] = useState<React.RefObject<HTMLInputElement>[]>(
    []
  )
  const fieldMsgId = `field-msg-${name}`

  useEffect(() => {
    setItemRefs((refs: React.RefObject<HTMLInputElement>[]) =>
      Array(length)
        .fill('')
        .map((_, i) => refs[i] || createRef<HTMLInputElement>())
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
    <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
      <Field.Header
        htmlFor={`field-${name}-0`}
        label={label}
        extraButton={extraButton}
        hasLabel={hasLabel}
      />

      <Field.Content>
        <section className={styles.pinInput}>
          {values.map((val, index) => (
            <Item
              name={`${name}-${index}`}
              key={index}
              value={val}
              id={`field-${name}-${index}`}
              ref={itemRefs[index]}
              error={!!error}
              onChange={(v: string) => onItemChange(v, index)}
              onPaste={(event: React.ClipboardEvent<HTMLInputElement>) =>
                onItemPaste(event, index)
              }
              onBackspace={() => onBackspace(index)}
              aria-describedby={fieldMsgId}
            />
          ))}
        </section>
      </Field.Content>

      <Field.Footer
        fieldMsgId={fieldMsgId}
        hint={hint}
        error={error}
        hintAlign={hintAlign}
      />
    </Field>
  )
}

export default PinInput
