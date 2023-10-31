import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

// almost indentical to src/components/Form/Input/Input.test.tsx
describe('<Form.Textarea>', () => {
  it('should render an Textarea', () => {
    const name = 'userName'
    const placeholder = 'Username'
    const hint = 'This is a hint'
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

    const handleOnChange = vi.fn()
    const handleOnBlur = vi.fn()

    render(
      <Form.Textarea
        name={name}
        label={name}
        hint={hint}
        required
        placeholder={placeholder}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    )

    // textarea
    const $textarea = screen.getByLabelText(name)
    expect($textarea).toBeInTheDocument()
    expect($textarea).toHaveAttribute('name', name)
    expect($textarea).toHaveAttribute('required')
    expect($textarea).toHaveAttribute('id', fieldId)
    expect($textarea).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()

    // hint
    const $hint = screen.getByText(hint)
    expect($hint).toBeInTheDocument()

    // focusing
    $textarea.focus()
    $textarea.blur()
    expect(handleOnBlur).toBeCalled()

    // typing
    const value = 'test'
    fireEvent.change($textarea, { target: { value } })
    expect(handleOnChange).toBeCalled()
    expect($textarea).toHaveValue(value)
  })
})
