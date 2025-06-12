import { describe, expect, it, vi } from 'vitest'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const AMOUNT_OPTIONS = {
  [CURRENCY.USDT]: [1.0, 3.0, 5.0, 10.0, 20.0, 35.0],
  [CURRENCY.HKD]: [5, 10, 30, 50, 100, 300],
  [CURRENCY.LIKE]: [50, 100, 150, 500, 1000, 1500],
}

const setup = ({
  currency,
  defaultAmount,
  disabled,
  customAmount,
}: {
  currency: CURRENCY
  defaultAmount: number
  disabled: boolean
  customAmount: boolean
}) => {
  const name = 'amount'
  const min = 0
  const max = 10000
  const step = 1
  const hint = 'This is a hint'
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg`

  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  const handleCustomInputChange = vi.fn()
  const handleCustomInputBlur = vi.fn()
  const customInputHint = 'This is a custom input hint'

  render(
    <Form.ComposedAmountInput
      // radio inputs
      currency={currency}
      defaultAmount={defaultAmount}
      currentAmount={defaultAmount}
      amounts={AMOUNT_OPTIONS}
      name={name}
      hint={hint}
      disabled={disabled}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      // custom input
      customAmount={
        customAmount
          ? {
              disabled,
              min,
              max,
              step,
              onBlur: handleCustomInputBlur,
              onChange: handleCustomInputChange,
              hint: customInputHint,
            }
          : undefined
      }
    />
  )

  const $radios = screen.getAllByRole('radio') as HTMLInputElement[]
  expect($radios).toHaveLength(AMOUNT_OPTIONS[currency].length)

  return {
    $radios,
    name,
    hint,
    min,
    max,
    step,
    customInputHint,
    fieldId,
    fieldMsgId,
    handleOnChange,
  }
}

describe('<ComposedAmountInput>', () => {
  it('should render a ComposedAmountInput without customAmount', async () => {
    const defaultAmount = AMOUNT_OPTIONS[CURRENCY.USDT][0]
    const { $radios, name, hint, customInputHint } = setup({
      currency: CURRENCY.USDT,
      defaultAmount,
      disabled: false,
      customAmount: false,
    })

    for (const $radio of $radios) {
      expect($radio).toHaveAttribute('name', name)
      expect($radio).toHaveAttribute('type', 'radio')

      if ($radio.value === defaultAmount.toString()) {
        expect($radio).toBeChecked()
      } else {
        expect($radio).not.toBeChecked()
      }
    }

    // hint for radio inputs
    expect(screen.getByText(hint)).toBeInTheDocument()
    expect(screen.queryByText(customInputHint)).not.toBeInTheDocument()

    // check and switch
    fireEvent.click($radios[0])
    expect($radios[0]).toBeChecked()
    fireEvent.click($radios[1])
    expect($radios[1]).toBeChecked()
    expect($radios[0]).not.toBeChecked()
  })

  it('should render a ComposedAmountInput with customAmount', async () => {
    const defaultAmount = AMOUNT_OPTIONS[CURRENCY.HKD][0]
    const { min, max, step, hint, customInputHint } = setup({
      currency: CURRENCY.HKD,
      defaultAmount,
      disabled: false,
      customAmount: true,
    })

    // hints for both radio inputs and custom input
    expect(screen.getByText(hint)).toBeInTheDocument()
    expect(screen.getByText(customInputHint)).toBeInTheDocument()

    // custom input
    const $customInput = screen.getByPlaceholderText('Enter the amount')
    expect($customInput).toHaveAttribute('name', 'customAmount')
    expect($customInput).toHaveAttribute('type', 'number')
    expect($customInput).toHaveAttribute('min', String(min))
    expect($customInput).toHaveAttribute('max', String(max))
    expect($customInput).toHaveAttribute('step', String(step))

    // int
    const customAmount = 123
    fireEvent.change($customInput, { target: { value: customAmount } })
    expect($customInput).toHaveValue(customAmount)

    // decimal
    const customAmountDecimal = 123.456
    fireEvent.change($customInput, { target: { value: customAmountDecimal } })
    expect($customInput).toHaveValue(customAmountDecimal)

    // FIXME: not supported yet
    // min & max
    // const minAmount = min - 1
    // const maxAmount = max + 1
    // fireEvent.change($customInput, { target: { value: minAmount } })
    // expect($customInput).toHaveValue(min)
    // fireEvent.change($customInput, { target: { value: maxAmount } })
    // expect($customInput).toHaveValue(max)
  })
})
