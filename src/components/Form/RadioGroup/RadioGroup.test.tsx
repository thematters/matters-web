import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { Form } from '~/components'

const options = [
  { label: 'option 1', value: '1' },
  { label: 'option 2', value: '2' },
]

const defaultAmount = options[0].value

const setup = ({ disabled }: { disabled: boolean }) => {
  const name = 'amount'
  const step = 1
  const hint = 'This is a hint'
  const fieldId = `__use_id__`
  const fieldMsgId = `__use_id__-msg`

  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  render(
    <Form.RadioGroup
      options={options}
      currentValue={defaultAmount}
      name={name}
      hint={hint}
      disabled={disabled}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  )

  const $radios = screen.getAllByRole('radio') as HTMLInputElement[]
  expect($radios).toHaveLength(options.length)

  return {
    $radios,
    name,
    hint,
    step,
    fieldId,
    fieldMsgId,
    handleOnChange,
  }
}

describe('<RadioGroup>', () => {
  it('should render a RadioGroup', async () => {
    const { $radios, name, hint } = setup({
      disabled: false,
    })

    for (const $radio of $radios) {
      expect($radio).toHaveAttribute('name', name)
      expect($radio).toHaveAttribute('type', 'radio')
    }

    // hint for radio inputs
    expect(screen.getByText(hint)).toBeInTheDocument()

    // check and switch
    $radios[0].click()
    expect($radios[0]).toBeChecked()
    $radios[1].click()
    expect($radios[1]).toBeChecked()
    expect($radios[0]).not.toBeChecked()
  })
})
