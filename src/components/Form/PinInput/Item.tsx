/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { forwardRef } from 'react'

import { KEYVALUE } from '~/common/enums'

import styles from './styles.module.css'

type ItemProps = {
  name: string
  error: boolean
  onChange: (value: string) => void
  onBackspace: () => void
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void
} & Pick<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'id' | 'value'
>

const Item = forwardRef(
  (
    { error, onPaste, onChange, onBackspace, ...inputProps }: ItemProps,
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      onChange(event.target.value.slice(-1))
    }

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key.toLowerCase() !== KEYVALUE.backSpace) {
        return
      }

      const val = (ref as React.RefObject<HTMLInputElement>)?.current?.value

      if (!val || !val.length) {
        onBackspace()
      }
    }

    const value = ((inputProps.value as string) || '').slice(-1)
    const pinItemClasses = classNames({
      [styles.pinInputItem]: true,
      [styles.error]: !!error,
    })

    return (
      <>
        <input
          maxLength={1}
          className={pinItemClasses}
          autoComplete="off"
          pattern="[0-9]*"
          type="password"
          inputMode="numeric"
          onChange={handleChange}
          onKeyDown={handleKeydown}
          onPaste={onPaste}
          ref={ref as React.RefObject<HTMLInputElement> | null}
          required
          {...inputProps}
          value={value}
        />
      </>
    )
  }
)

Item.displayName = 'PinInput.Item'

export default Item
