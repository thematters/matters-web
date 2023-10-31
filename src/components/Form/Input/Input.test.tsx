import { describe, expect, it, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

describe('<Form.Input>', () => {
  it('should render an Input', () => {
    const name = 'userName'
    const placeholder = 'Username'
    const fieldId = `field-${name}`
    const fieldMsgId = `field-msg-${name}`

    const handleOnChange = vi.fn()
    const handleOnBlur = vi.fn()

    render(
      <Form.Input
        type="text"
        name={name}
        label={name}
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

    // focusing
    $input.focus()
    expect(handleOnBlur).not.toBeCalled()

    // typing
    const value = 'test'
    fireEvent.change($input, { target: { value } })
    expect(handleOnChange).toBeCalled()
    expect($input).toHaveValue(value)
  })

  it('should render an Input with hint & error', () => {
    const name = 'userName'
    const placeholder = 'Username'
    const error = 'error message'
    const hint = 'hint message'

    // render error only
    render(
      <Form.Input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        error={error}
        hint={hint}
      />
    )
    expect(screen.queryByText(hint)).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(error)

    cleanup()
    render(
      <Form.Input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        error={error}
      />
    )
    expect(screen.queryByText(hint)).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(error)

    // render hint only
    cleanup()
    render(
      <Form.Input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        hint={hint}
      />
    )
    expect(screen.getByText(hint)).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
