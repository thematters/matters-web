import { forwardRef } from 'react'

import { KEYCODES } from '~/common/enums'

import styles from './styles.css'

type ItemProps = {
  onChange: (value: string) => void
  onBackspace: () => void
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void
} & Pick<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'id' | 'value' | 'autoFocus'
>

const Item = forwardRef(
  ({ onPaste, onChange, onBackspace, ...inputProps }: ItemProps, ref: any) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      onChange(event.target.value.slice(-1))
    }

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode !== KEYCODES.backSpace) {
        return
      }

      const val = ref?.current?.value

      if (!val || !val.length) {
        onBackspace()
      }
    }

    return (
      <>
        <input
          maxLength={1}
          className="pin-input-item"
          autoComplete="off"
          pattern="[0-9]*"
          type="password"
          inputMode="numeric"
          onChange={handleChange}
          onKeyDown={handleKeydown}
          onPaste={onPaste}
          ref={ref}
          {...inputProps}
        />

        <style jsx>{styles}</style>
      </>
    )
  }
)

export default Item
