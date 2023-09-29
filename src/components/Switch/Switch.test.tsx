import { render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'

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
    expect(screen.getByRole('checkbox', { checked: false })).toBeDefined()

    // ACT
    const toggle = screen.getByRole('checkbox')
    toggle.click()

    // ASSERT
    expect(screen.getByRole('checkbox', { checked: true })).toBeDefined()
  })

  it('should allow to be disabled', async () => {
    render(<AnySwitch checked={false} disabled />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('disabled')
  })

  it('should allow to be in loading state', async () => {
    render(<AnySwitch checked={false} loading />)
    expect(screen.getByTestId(TEST_ID.ICON_SPINNER)).toBeInTheDocument()
  })
})
