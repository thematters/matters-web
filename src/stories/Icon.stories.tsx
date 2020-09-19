import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import IconTable from '~/stories/IconTable'

import { IconProps } from '~/components'

export default {
  title: 'Components/Icons',
  component: IconTable,
  parameters: {
    backgrounds: {
      values: [
        { name: 'grey', value: '#ddd' },
        { name: 'black', value: '#000' },
      ],
    },
  },
} as Meta

const Template: Story<IconProps> = (args) => <IconTable {...args} />

export const All = Template.bind({})
All.args = {
  size: 'lg',
  color: 'black',
}
