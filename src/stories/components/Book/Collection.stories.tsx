import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Book/Collection',
  component: Book.Collection,
} as ComponentMeta<typeof Book.Collection>

const Template: ComponentStory<typeof Book.Collection> = (args) => {
  return (
    <MockedProvider>
      <Book.Collection {...args} />
    </MockedProvider>
  )
}

export const TitleOnly = Template.bind({})
TitleOnly.args = {
  title: MOCK_ARTILCE.title,
}

export const TitleMdOnly = Template.bind({})
TitleMdOnly.args = {
  title: 'Qui amet anim',
}

export const TitleLgOnly = Template.bind({})
TitleLgOnly.args = {
  title: 'Short',
}

export const Cover = Template.bind({})
Cover.args = {
  title: MOCK_ARTILCE.title,
  cover: MOCK_ARTILCE.cover,
}
