import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

describe('<Form.Input>', () => {
  it('should render an Input', () => {
    const name = 'userName'
    const placeholder = 'Username'
    const hint = 'This is a hint'
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

    const handleOnChange = vi.fn()
    const handleOnBlur = vi.fn()

    render(
      <Form.Input
        type="text"
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
    expect($input).toHaveAttribute('name', name)
    expect($input).toHaveAttribute('required')
    expect($input).toHaveAttribute('type', 'text')
    expect($input).toHaveAttribute('id', fieldId)
    expect($input).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()

    // hint
    const $hint = screen.getByText(hint)
    expect($hint).toBeInTheDocument()

    // focusing
    $input.focus()
    $input.blur()
    expect(handleOnBlur).toBeCalled()

    // typing
    const value = 'test'
    fireEvent.change($input, { target: { value } })
    expect(handleOnChange).toBeCalled()
    expect($input).toHaveValue(value)
  })
})
