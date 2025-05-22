import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import classNames from 'classnames'
import { useEffect, useId, useRef } from 'react'
import { useIntl } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import Field, { FieldProps } from '../Field'
import styles from './styles.module.css'

/**
 *
 * Usage:
 *
 * ```jsx
 *   <Form.ComposedAmountInput
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

type CustomAmountProps = {
  customAmount?: {
    error?: string
    hint?: React.ReactNode
  } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

type AmountOptionProps = {
  amount: number
  currentAmount: number
  defaultAmount?: number
} & BaseOptionProps &
  FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type ComposedAmountInputProps = {
  amounts: { [key in CURRENCY]: number[] }
  currentAmount: number
  defaultAmount?: number
} & BaseOptionProps &
  Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
  CustomAmountProps

const AmountOption: React.FC<AmountOptionProps> = ({
  amount,
  currency,
  balance,
  name,

  fieldMsgId,
  currentAmount,
  defaultAmount,

  disabled,
  ...inputProps
}) => {
  const inputRef: React.RefObject<any> = useRef(null)

  const fieldId = useId()

  const isActive = currentAmount === amount

  const amountClasses = classNames({
    [styles.radioInputItem]: true,
    [styles.active]: isActive,
    'u-area-disable': disabled,
  })

  const decimals = 0

  useEffect(() => {
    if (!isActive && inputRef.current) {
      inputRef.current.blur()
      inputRef.current.checked = false
    }
  }, [isActive])

  return (
    <li className={amountClasses}>
      <label htmlFor={fieldId}>
        <span className={styles.currency}>{currency}</span>
        <span className={styles.amount}>{formatAmount(amount, decimals)}</span>

        <VisuallyHidden>
          <input
            {...inputProps}
            aria-describedby={fieldMsgId}
            disabled={disabled}
            id={fieldId}
            name={name} // share the same name for single selection
            value={amount}
            defaultChecked={defaultAmount === amount}
            type="radio"
            ref={inputRef}
          />
        </VisuallyHidden>
      </label>
    </li>
  )
}

const ComposedAmountInput: React.FC<ComposedAmountInputProps> = ({
  currency,
  balance,
  amounts,
  name,

  hint,
  error,
  hintAlign,

  lang,
  customAmount,

  spacingTop,
  spacingBottom,

  ...inputProps
}) => {
  const intl = useIntl()
  const fieldMsgId = `field-msg-${name}`

  const options = amounts[currency]

  const baseInputProps = {
    ...inputProps,
    currency,
    balance,
    fieldMsgId,
    name,
  }

  const {
    error: customAmountError,
    hint: customAmountHint,
    ...customAmountInputProps
  } = customAmount || {}

  return (
    <section className={styles.amountInput}>
      <Field spacingTop={spacingTop} spacingBottom={spacingBottom}>
        <ul className={styles.radioInputOptions}>
          {options.map((option) => (
            <AmountOption {...baseInputProps} key={option} amount={option} />
          ))}
        </ul>

        {customAmount && (
          <section className={styles.customInput}>
            <section className={styles.inputWrapper}>
              <span className={styles.unit}>{currency}</span>
              <input
                className={
                  customAmountError ? `error ${styles.input}` : styles.input
                }
                type="number"
                name="customAmount"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Enter the amount',
                  id: 'eZ0m39',
                })}
                value={undefined}
                autoComplete="nope"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                {...customAmountInputProps}
              />
            </section>

            {customAmountHint && (
              <div className={styles.hint}>{customAmountHint}</div>
            )}
          </section>
        )}

        <Field.Footer
          fieldMsgId={fieldMsgId}
          error={error}
          hint={hint}
          hintAlign={hintAlign}
        />
      </Field>
    </section>
  )
}

export default ComposedAmountInput
