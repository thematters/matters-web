import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const setup = () => {
  const name = 'userName'
  const type = 'text'
  const placeholder = 'Username'
  const hint = 'This is a hint'
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg-${name}`

  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  render(
    <Form.CheckBox
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

  const $checkbox = screen.getByLabelText(hint)
  expect($checkbox).toBeInTheDocument()

  return {
    $checkbox,
    name,
    type,
    placeholder,
    hint,
    fieldId,
    fieldMsgId,
    handleOnChange,
  }
}

describe('<Form.CheckBox>', () => {
  it('should render a CheckBox', () => {
    const { $checkbox, name, fieldId, fieldMsgId, placeholder } = setup()

    expect($checkbox).toBeRequired()
    expect($checkbox).toHaveAttribute('name', name)
    expect($checkbox).toBeRequired()
    expect($checkbox).toHaveAttribute('type', 'checkbox') // force to be checkbox
    expect($checkbox).toHaveAttribute('id', fieldId)
    expect($checkbox).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('should allow to be toggled', () => {
    const { $checkbox, handleOnChange } = setup()

    // init
    expect($checkbox).not.toBeChecked()

    // first click
    fireEvent.click($checkbox)
    expect(handleOnChange).toBeCalledTimes(1)
    expect($checkbox).toBeChecked()

    // second click
    fireEvent.click($checkbox)
    expect(handleOnChange).toBeCalledTimes(2)
    expect($checkbox).not.toBeChecked()
  })
})
