import { MockedProvider } from '@apollo/client/testing'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Switch } from '~/components'

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'any',
    label: 'any',
    checked: false,
    onChange: () => {},
  },
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <MockedProvider>
        <Switch
          name="any"
          label="any"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </MockedProvider>
    )
  },
}
