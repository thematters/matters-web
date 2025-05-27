import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

describe('<Form.SquareCheckBox>', () => {
  it('should render a SquareCheckBox', () => {
    const name = 'name-test'
    const placeholder = 'placeholder-test'
    const hint = 'hint-test'
    const value = 'value-test'
    const contents = 'content-test'
    const fieldId = `__use_id__`
    const fieldMsgId = `__use_id__-msg`

    const handleOnBlur = vi.fn()
    const handleOnChange = vi.fn()

    const props = {
      name,
      value,
      required: true,
      placeholder,
      hint,
      contents,
      onBlur: handleOnBlur,
      onChange: handleOnChange,
    }

    const { rerender } = render(
      <Form.SquareCheckBox {...props} checked={false} />
    )

    const $checkbox = screen.getByRole('checkbox')
    expect($checkbox).toBeInTheDocument()

    expect($checkbox).toBeRequired()
    expect($checkbox).not.toBeChecked()
    expect($checkbox).toHaveAttribute('name', name)
    expect($checkbox).toHaveAttribute('required')
    expect($checkbox).toHaveAttribute('type', 'checkbox') // force to be checkbox
    expect($checkbox).toHaveAttribute('id', fieldId)
    expect($checkbox).toHaveAttribute('aria-describedby', fieldMsgId)
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()

    // contents
    expect(screen.getByText(contents)).toBeInTheDocument()

    // checked
    rerender(<Form.SquareCheckBox {...props} checked={true} />)
    expect($checkbox).toBeChecked()

    //  disabled
    rerender(<Form.SquareCheckBox {...props} checked={true} disabled={true} />)
    expect($checkbox).toBeDisabled()

    // custom icon
    rerender(
      <Form.SquareCheckBox
        {...props}
        checked={true}
        icon={<span>icon-test</span>}
      />
    )
    expect(screen.getByText('icon-test')).toBeInTheDocument()

    // onChange has never been called
    expect(handleOnChange).toHaveBeenCalledTimes(0)

    // onChange has been called
    fireEvent.click($checkbox)
    expect($checkbox).toBeChecked()
    expect(handleOnChange).toHaveBeenCalledTimes(1)
  })
})
