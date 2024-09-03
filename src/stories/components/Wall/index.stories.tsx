import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import Wall from '~/views/ArticleDetail/Wall/Visitor'

export default {
  title: 'Components/Wall',
  component: Wall,
} as ComponentMeta<typeof Wall>

const Template: ComponentStory<typeof Wall> = () => (
  <MockedProvider>
    <Wall show />
  </MockedProvider>
)

export const Default = Template.bind({})
