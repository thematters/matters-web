import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

// almost indentical to src/components/Form/Input/Input.test.tsx
describe('<Form.AmountInput>', () => {
  it('should render an AmountInput', () => {
    const currency = 'HKD'
    const name = 'total-amount'
    const placeholder = '0.00'
    const hint = 'This is a hint'
    const min = 0
    const max = 100
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

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

    // textarea
    const $input = screen.getByLabelText(name)
    expect($input).toBeInTheDocument()
    expect($input).toHaveAttribute('name', name)
    expect($input).toHaveAttribute('required')
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

    // type numbers
    const numbers = '12'
    fireEvent.change($input, { target: { value: numbers } })
    expect(handleOnChange).toBeCalled()
    expect(screen.getByDisplayValue(numbers)).toBeInTheDocument()

    // TODO: type numbers (min)
    // fireEvent.change($input, { target: { value: min - 1 } })
    // expect(screen.queryByDisplayValue(min - 1)).not.toBeInTheDocument()
    // TODO: type numbers (max)

    // type alphabets
    const alphabets = 'abcd'
    fireEvent.change($input, { target: { value: alphabets } })
    expect(screen.queryByDisplayValue(alphabets)).not.toBeInTheDocument()

    // type numbers + alphabets
    fireEvent.change($input, { target: { value: alphabets + numbers } })
    expect(screen.queryByDisplayValue(numbers)).not.toBeInTheDocument()
  })
})
