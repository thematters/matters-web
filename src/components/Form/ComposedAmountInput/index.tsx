import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount, translate } from '~/common/utils'

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
  customAmount: {
    error?: string
    hint?: React.ReactNode
  } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

type AmountOptionProps = {
  amount: number
} & BaseOptionProps &
  FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

type ComposedAmountInputProps = {
  amounts: { [key in CURRENCY]: number[] }
  lang: Language
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
    [styles.radioInputItem]: true,
    [styles.active]: isActive,
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
  } = customAmount

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
            <input
              className={
                customAmountError ? `error ${styles.input}` : styles.input
              }
              type="number"
              name="customAmount"
              placeholder={translate({ id: 'enterCustomAmount', lang })}
              value={undefined}
              autoComplete="nope"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              {...customAmountInputProps}
            />

            {customAmountHint && (
              <div className={styles.hint}>{customAmountHint}</div>
            )}
          </section>
        )}

        <Field.Footer
          fieldMsgId={fieldMsgId}
          hint={hint}
          error={error}
          hintAlign={hintAlign}
        />
      </Field>
    </section>
  )
}

export default ComposedAmountInput
