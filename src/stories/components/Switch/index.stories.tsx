import { MockedProvider } from '@apollo/client/testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'

import { Switch } from '~/components'

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta

const Template: Story = () => {
  const [checked, setChecked] = useState(false)

  return (
    <MockedProvider>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
    </MockedProvider>
  )
}

export const Default = Template.bind({})
