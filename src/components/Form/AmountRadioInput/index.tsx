import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

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
  balance?: number
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
  const fieldId = `field-${name}-${amount}`

  const isBalanceInsufficient =
    typeof balance === 'number' ? balance < amount : false

  const amountClasses = classNames({
    amount: true,
    [currency === CURRENCY.LIKE ? 'like' : 'hkd']: true,
    active: value === amount,
    disabled: disabled || isBalanceInsufficient,
  })

  return (
    <li className={amountClasses}>
      <label htmlFor={fieldId}>
        {amount}

        <VisuallyHidden>
          <input
            {...inputProps}
            aria-describedby={fieldMsgId}
            disabled={disabled}
            id={fieldId}
            name={name}
            value={amount}
            type="radio"
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
