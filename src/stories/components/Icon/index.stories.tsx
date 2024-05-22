import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import IconTable from './IconTable'

export default {
  title: 'Components/Icons',
  component: IconTable,
} as ComponentMeta<typeof IconTable>

const Template: ComponentStory<typeof IconTable> = (args) => (
  <IconTable {...args} />
)

export const All = Template.bind({})
All.args = {
  size: 32,
  color: 'black',
}
