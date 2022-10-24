import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.AmountRadioInput
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

interface BaseOptionProps {
  currency: CURRENCY
  balance?: number | string
  name: string
}

type AmountOptionProps = {
  amount: number
} & BaseOptionProps &
  FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type AmountRadioInputProps = {
  amounts: { [key in CURRENCY]: number[] }
} & BaseOptionProps &
  Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const AmountOption: React.FC<AmountOptionProps> = ({
  amount,
  currency,
  balance,
  name,

  fieldMsgId,
  value,

  disabled,
  ...inputProps
}) => {
  const inputRef: React.RefObject<any> = useRef(null)

  const fieldId = `field-${name}-${amount}`

  const isBalanceInsufficient =
    typeof balance === 'number' ? balance < amount : false
  const isActive = value === amount

  const amountClasses = classNames({
    amount: true,
    active: isActive,
    'u-area-disable': disabled || isBalanceInsufficient,
  })

  const decimals = currency === CURRENCY.USDT ? 2 : 0

  useEffect(() => {
    if (!isActive && inputRef.current) {
      inputRef.current.blur()
      inputRef.current.checked = false
    }
  }, [isActive])

  return (
    <li className={amountClasses}>
      <label htmlFor={fieldId}>
        {formatAmount(amount, decimals)}

        <VisuallyHidden>
          <input
            {...inputProps}
            aria-describedby={fieldMsgId}
            disabled={disabled}
            id={fieldId}
            name={name}
            value={amount}
            type="radio"
            ref={inputRef}
          />
        </VisuallyHidden>
      </label>

      <style jsx>{styles}</style>
    </li>
  )
}

const AmountRadioInput: React.FC<AmountRadioInputProps> = ({
  currency,
  balance,
  amounts,
  name,

  hint,
  error,

  ...inputProps
}) => {
  const fieldMsgId = `field-msg-${name}`

  const options = amounts[currency]

  const baseInputProps = {
    ...inputProps,
    currency,
    balance,
    fieldMsgId,
    name,
  }

  return (
    <Field>
      <ul className="amount-options">
        {options.map((option) => (
          <AmountOption {...baseInputProps} key={option} amount={option} />
        ))}
      </ul>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default AmountRadioInput
