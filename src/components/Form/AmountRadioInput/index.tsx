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

type AmountOptionProps = {
  amount: number
  currency: CURRENCY
  name: string
} & FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type AmountRadioInputProps = {
  currency: CURRENCY
  name: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const amountOptions = {
  [CURRENCY.HKD]: [5, 10, 50, 80, 100, 200],
  [CURRENCY.LIKE]: [160, 660, 1660],
}

const AmountOption: React.FC<AmountOptionProps> = ({
  amount,
  currency,
  name,

  fieldMsgId,
  value,

  disabled,
  ...inputProps
}) => {
  const fieldId = `field-${name}-${amount}`

  const classes = classNames({
    amount: true,
    [currency === CURRENCY.LIKE ? 'like' : 'hkd']: true,
    active: value === amount,
    disabled,
  })
  return (
    <li className={classes}>
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
          />
        </VisuallyHidden>
      </label>
      <style jsx>{styles}</style>
    </li>
  )
}

const AmountRadioInput: React.FC<AmountRadioInputProps> = ({
  currency,
  name,

  hint,
  error,

  ...inputProps
}) => {
  const fieldMsgId = `field-msg-${name}`
  const options = amountOptions[currency]

  const baseInputProps = {
    ...inputProps,
    currency,
    fieldMsgId,
    name,
    type: 'radio',
  }

  return (
    <Field>
      <ul className="amount-options">
        {options.map((option) => (
          <AmountOption
            {...baseInputProps}
            key={option}
            amount={option}
            currency={currency}
          />
        ))}
      </ul>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default AmountRadioInput
