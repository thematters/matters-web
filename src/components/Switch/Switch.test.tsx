/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import { Switch, SwitchProps } from './'

const AnySwitch = ({
  checked: initChecked,
  disabled,
  loading,
}: Pick<SwitchProps, 'checked' | 'disabled' | 'loading'>) => {
  const [checked, setChecked] = useState(initChecked)

  return (
    <Switch
      name="any"
      label="any"
      checked={checked}
      onChange={() => setChecked(!checked)}
      disabled={disabled}
      loading={loading}
    />
  )
}

describe('Switch', () => {
  it('should allow to be toggled', async () => {
    // ARRANGE
    render(<AnySwitch checked={false} />)
    const toggle = screen.getByLabelText('any')
    expect(toggle).not.toBeChecked()

    // ACT
    toggle.click()

    // ASSERT
    expect(toggle).toBeChecked()
  })
})
