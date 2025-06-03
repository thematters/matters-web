import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const setup = () => {
  const currency = 'HKD'
  const name = 'total-amount'
  const placeholder = '0.00'
  const hint = 'This is a hint'
  const min = 0
  const max = 100
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg`

  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  render(
    <Form.AmountInput
      currency={currency}
      name={name}
      label={name}
      hint={hint}
      min={min}
      max={max}
      required
      placeholder={placeholder}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  )

  const $input = screen.getByLabelText(name)
  expect($input).toBeInTheDocument()

  return {
    $input,
    name,
    currency,
    placeholder,
    hint,
    min,
    max,
    fieldId,
    fieldMsgId,
    handleOnChange,
    handleOnBlur,
  }
}

// almost indentical to src/components/Form/Input/Input.test.tsx
describe('<Form.AmountInput>', () => {
  it('should render an AmountInput', () => {
    const {
      $input,
      name,
      fieldId,
      fieldMsgId,
      placeholder,
      currency,
      hint,
      handleOnBlur,
    } = setup()

    // textarea
    expect($input).toHaveAttribute('name', name)
    expect($input).toBeRequired()
    expect($input).toHaveAttribute('id', fieldId)
    expect($input).toHaveAttribute('type', 'number') // fixed to number
    expect($input).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()

    // currency
    const $currency = screen.getByText(currency)
    expect($currency).toBeInTheDocument()

    // hint
    const $hint = screen.getByText(hint)
    expect($hint).toBeInTheDocument()

    // focusing
    $input.focus()
    $input.blur()
    expect(handleOnBlur).toBeCalled()
  })

  it('should allow numbers to be inputted', () => {
    const { $input, handleOnChange } = setup()

    // numbers
    const numbers = '12'
    fireEvent.change($input, { target: { value: numbers } })
    expect(handleOnChange).toBeCalled()
    expect(screen.getByDisplayValue(numbers)).toBeInTheDocument()

    // decimals
    const decimals = '12.34'
    fireEvent.change($input, { target: { value: decimals } })
    expect(screen.getByDisplayValue(decimals)).toBeInTheDocument()
  })

  it('should not allow non-numbers to be inputted', () => {
    const { $input } = setup()

    // alphabets
    const alphabets = 'abcd'
    fireEvent.change($input, { target: { value: alphabets } })
    expect(screen.queryByDisplayValue(alphabets)).not.toBeInTheDocument()

    // symbols
    const symbols = '!@#$%^&*()'
    fireEvent.change($input, { target: { value: symbols } })
    expect(screen.queryByDisplayValue(symbols)).not.toBeInTheDocument()
  })

  // FIXME: not supported yet
  // it('should not allow numbers out of range to be inputted', () => {
  //   const { $input, min, max } = setup()

  //   // less than min
  //   const lessThanMin = `${min - 1}`
  //   fireEvent.change($input, { target: { value: lessThanMin } })
  //   expect(screen.queryByDisplayValue(lessThanMin)).not.toBeInTheDocument()

  //   // more than max
  //   const moreThanMax = `${max + 1}`
  //   fireEvent.change($input, { target: { value: moreThanMax } })
  //   expect(screen.queryByDisplayValue(moreThanMax)).not.toBeInTheDocument()
  // })
})
