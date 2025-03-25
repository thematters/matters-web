import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Book/Article',
  component: Book.Article,
} as ComponentMeta<typeof Book.Article>

const Template: ComponentStory<typeof Book.Article> = (args) => {
  return (
    <MockedProvider>
      <Book.Article {...args} />
    </MockedProvider>
  )
}

export const TitleOnly = Template.bind({})
TitleOnly.args = {
  title: MOCK_ARTILCE.title,
}

export const TitleMdOnly = Template.bind({})
TitleMdOnly.args = {
  title: 'Qui amet anima',
}

export const TitleShortOnly = Template.bind({})
TitleShortOnly.args = {
  title: 'Short',
}

export const TitleAndCover = Template.bind({})
TitleAndCover.args = {
  title: MOCK_ARTILCE.title,
  cover: MOCK_ARTILCE.cover,
}

export const TitleMdAndCover = Template.bind({})
TitleMdAndCover.args = {
  title: 'Qui amet anima',
  cover: MOCK_ARTILCE.cover,
}

export const TitleShortAndCover = Template.bind({})
TitleShortAndCover.args = {
  title: 'Short',
  cover: MOCK_ARTILCE.cover,
}

export const TitleAndDescription = Template.bind({})
TitleAndDescription.args = {
  title: MOCK_ARTILCE.title,
  description: MOCK_ARTILCE.summary,
}

export const TitleMdAndDescription = Template.bind({})
TitleMdAndDescription.args = {
  title: 'Qui amet anima',
  description: MOCK_ARTILCE.summary,
}

export const TitleShortAndDescription = Template.bind({})
TitleShortAndDescription.args = {
  title: 'Short',
  description: MOCK_ARTILCE.summary,
}
