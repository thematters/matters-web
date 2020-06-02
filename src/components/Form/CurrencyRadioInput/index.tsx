import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.CurrencyRadioInput
 *     error="xxx"
 *     hint="xxx"
 *     ...other <input> props...
 *   />
 * ```
 *
 */

type CurrencyOptionProps = {
  currency: CURRENCY
  inactive: boolean
  isLike: boolean
  name: string
  text: React.ReactNode
} & FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type CurrencyRadioInputProps = {
  name: string
  isLike: boolean
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const CurrencyOption: React.FC<CurrencyOptionProps> = ({
  currency,
  inactive,
  isLike,
  name,
  text,

  fieldMsgId,

  disabled,
  ...inputProps
}) => {
  const fieldId = `field-${name}-${currency}`
  const classes = classNames({
    currency: true,
    [isLike ? 'like' : 'hkd']: true,
    inactive,
    disabled,
  })
  return (
    <li className={classes}>
      <label htmlFor={fieldId}>
        {text}
        <VisuallyHidden>
          <input
            {...inputProps}
            aria-describedby={fieldMsgId}
            disabled={disabled}
            id={fieldId}
            name={name}
            type="radio"
            value={currency}
          />
        </VisuallyHidden>
      </label>
      <style jsx>{styles}</style>
    </li>
  )
}

const CurrencyRadioInput: React.FC<CurrencyRadioInputProps> = ({
  isLike,

  hint,
  error,

  ...inputProps
}) => {
  const fieldMsgId = `field-msg-${name}`
  const baseInputProps = {
    ...inputProps,
    fieldMsgId,
    isLike,
  }

  return (
    <Field>
      <ul>
        <CurrencyOption
          {...baseInputProps}
          currency={CURRENCY.HKD}
          inactive={isLike}
          text={<Translate id="hkd" />}
        />
        <CurrencyOption
          {...baseInputProps}
          currency={CURRENCY.LIKE}
          inactive={!isLike}
          text="LikeCoin"
        />
      </ul>

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default CurrencyRadioInput
