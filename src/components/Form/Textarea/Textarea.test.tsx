import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const setup = () => {
  const name = 'userName'
  const placeholder = 'Username'
  const hint = 'This is a hint'
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg`

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

  const $textarea = screen.getByLabelText(name)
  expect($textarea).toBeInTheDocument()

  return {
    $textarea,
    name,
    placeholder,
    hint,
    fieldId,
    fieldMsgId,
    handleOnChange,
    handleOnBlur,
  }
}

// almost indentical to src/components/Form/Input/Input.test.tsx
describe('<Form.Textarea>', () => {
  it('should render a Textarea', () => {
    const {
      $textarea,
      name,
      fieldId,
      fieldMsgId,
      placeholder,
      hint,
      handleOnBlur,
    } = setup()

    expect($textarea).toHaveAttribute('name', name)
    expect($textarea).toBeRequired()
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
  })

  it('should allow any characters to be inpuuted', () => {
    const { $textarea, handleOnChange } = setup()

    //   short text
    const shortText = 'this is a text'
    fireEvent.change($textarea, { target: { value: shortText } })
    expect(handleOnChange).toBeCalledTimes(1)
    expect($textarea).toHaveValue(shortText)

    // long text
    const longText = Array.from({ length: 1000 }, () =>
      Math.random().toString(36).substring(2, 15)
    ).join(' ')
    fireEvent.change($textarea, { target: { value: longText } })
    expect(handleOnChange).toBeCalledTimes(2)
    expect($textarea).toHaveValue(longText)
  })
})
