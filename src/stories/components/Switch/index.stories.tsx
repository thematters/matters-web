import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'

import { Switch } from '~/components'

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = () => {
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
}

export const Default = Template.bind({})
