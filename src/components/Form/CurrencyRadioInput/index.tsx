import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { Translate } from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'

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
  inactive: boolean
  isLike: boolean
  name: string
  optionName: React.ReactNode
  optionValue: PAYMENT_CURRENCY
  optionType: 'hkd' | 'like'
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
  inactive,
  isLike,
  name,
  optionName,
  optionValue,
  optionType,

  fieldMsgId,
  value,

  ...inputProps
}) => {
  const fieldId = `field-${name}-${optionType}`
  const classes = classNames({
    currency: true,
    [isLike ? 'like' : 'hkd']: true,
    inactive,
  })
  return (
    <section className={classes}>
      <label htmlFor={fieldId}>
        {optionName}
        <VisuallyHidden>
          <input
            {...inputProps}
            aria-describedby={fieldMsgId}
            id={fieldId}
            name={name}
            value={optionValue}
          />
        </VisuallyHidden>
      </label>
      <style jsx>{styles}</style>
    </section>
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
    type: 'radio',
  }

  return (
    <Field>
      <CurrencyOption
        {...baseInputProps}
        inactive={isLike}
        optionName={<Translate id="hkd" />}
        optionType="hkd"
        optionValue={PAYMENT_CURRENCY.HKD}
      />
      <CurrencyOption
        {...baseInputProps}
        inactive={!isLike}
        optionName="LikeCoin"
        optionType="like"
        optionValue={PAYMENT_CURRENCY.LIKE}
      />

      <Field.Footer fieldMsgId={fieldMsgId} hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default CurrencyRadioInput
