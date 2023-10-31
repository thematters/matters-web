import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

describe('<Form.Input>', () => {
  it('should render an Input', () => {
    const name = 'userName'
    const type = 'text'
    const placeholder = 'Username'
    const hint = 'This is a hint'
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

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

    // input
    const $input = screen.getByLabelText(name)
    expect($input).toBeInTheDocument()
    expect($input).toBeRequired()
    expect($input).toHaveAttribute('name', name)
    expect($input).toHaveAttribute('required')
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

    // type alphabets
    const value = 'test'
    fireEvent.change($input, { target: { value } })
    expect(handleOnChange).toBeCalledTimes(1)
    expect($input).toHaveValue(value)

    // type numbers
    const numbers = '1234'
    fireEvent.change($input, { target: { value: numbers } })
    expect(handleOnChange).toBeCalledTimes(2)
    expect($input).toHaveValue(numbers)
  })
})
