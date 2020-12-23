import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { IconProps } from '~/components'

import IconTable from './IconTable'

export default {
  title: 'Components/Icons',
  component: IconTable,
} as Meta

const Template: Story<IconProps> = (args) => <IconTable {...args} />

export const All = Template.bind({})
All.args = {
  size: 'lg',
  color: 'black',
}
