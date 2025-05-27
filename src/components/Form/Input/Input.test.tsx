import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const setup = () => {
  const name = 'userName'
  const type = 'text'
  const placeholder = 'Username'
  const hint = 'This is a hint'
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg`

  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  render(
    <Form.Input
      type={type}
      name={name}
      label={name}
      hint={hint}
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
    type,
    placeholder,
    hint,
    fieldId,
    fieldMsgId,
    handleOnChange,
    handleOnBlur,
  }
}

describe('<Form.Input>', () => {
  it('should render an Input', () => {
    const {
      $input,
      type,
      name,
      fieldId,
      fieldMsgId,
      placeholder,
      hint,
      handleOnBlur,
    } = setup()

    expect($input).toBeRequired()
    expect($input).toHaveAttribute('name', name)
    expect($input).toHaveAttribute('type', type)
    expect($input).toHaveAttribute('id', fieldId)
    expect($input).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()

    // hint
    const $hint = screen.getByText(hint)
    expect($hint).toBeInTheDocument()

    // focus & blur
    $input.focus()
    expect($input).toHaveFocus()
    $input.blur()
    expect($input).not.toHaveFocus()
    expect(handleOnBlur).toBeCalled()
  })

  it('should allow any characters to be inputted', () => {
    const { $input, handleOnChange } = setup()

    //  alphabets
    const value = 'test'
    fireEvent.change($input, { target: { value } })
    expect(handleOnChange).toBeCalledTimes(1)
    expect($input).toHaveValue(value)

    //  numbers
    const numbers = '1234'
    fireEvent.change($input, { target: { value: numbers } })
    expect(handleOnChange).toBeCalledTimes(2)
    expect($input).toHaveValue(numbers)

    // symbols
    const symbols = '!@#$%^&*()'
    fireEvent.change($input, { target: { value: symbols } })
    expect(handleOnChange).toBeCalledTimes(3)
    expect($input).toHaveValue(symbols)

    // mixed
    const mixed = 'a1!@'
    fireEvent.change($input, { target: { value: mixed } })
    expect(handleOnChange).toBeCalledTimes(4)
    expect($input).toHaveValue(mixed)
  })
})
