import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

import { PinInputProps } from '.'

const PinInputWrap = (props: PinInputProps) => {
  const [value, setValue] = useState(props.value)

  const handleOnChange = (newValue: string) => {
    setValue(newValue)
    props.onChange(newValue)
  }

  return <Form.PinInput {...props} value={value} onChange={handleOnChange} />
}

const setup = () => {
  const length = 6
  const name = 'name-test'
  const value = '123456'
  const placeholder = 'placeholder-test'
  const hint = 'hint-test'
  const fieldMsgId = `field-msg-${name}`

  const handleOnBlur = vi.fn()
  const handleOnChange = vi.fn()

  const props = {
    name,
    value,
    length,
    required: true,
    placeholder,
    hint,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
  }

  render(<PinInputWrap {...props} />)

  const $inputs = []
  for (let i = 0; i < length; i++) {
    $inputs.push(screen.getByDisplayValue(value[i]))
  }
  expect($inputs).toHaveLength(length)

  return {
    $inputs,
    length,
    name,
    placeholder,
    hint,
    value,
    fieldMsgId,
    handleOnBlur,
    handleOnChange,
  }
}

describe('<Form.PinInput>', () => {
  it('should render a PinInput', async () => {
    const { $inputs, name, value, fieldMsgId, handleOnChange } = setup()

    for (let i = 0; i < $inputs.length; i++) {
      const $input = $inputs[i]
      expect($input).toHaveValue(value[i])
      expect($input).toHaveAttribute('name', `${name}-${i}`)
      expect($input).toHaveAttribute('type', 'password') // force to be password
      expect($input).toHaveAttribute('id', `field-${name}-${i}`)
      expect($input).toHaveAttribute('aria-describedby', fieldMsgId)
    }

    const newValue = '654321'
    for (let i = 0; i < $inputs.length; i++) {
      const $input = $inputs[i]
      fireEvent.change($input, { target: { value: newValue[i] } })
      expect($input).toHaveValue(newValue[i])
      expect(handleOnChange).toHaveBeenCalledTimes(i + 1)
    }
  })

  // FIXME: ref is not working
  // test focus
  // test paste
  // test backspace
})
