import { MockedProvider } from '@apollo/client/testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Book/Flat',
  component: Book.Flat,
} as ComponentMeta<typeof Book.Flat>

const Template: ComponentStory<typeof Book.Flat> = (args) => {
  return (
    <MockedProvider>
      <Book.Flat {...args} />
    </MockedProvider>
  )
}

export const Collection = Template.bind({})
Collection.args = {
  title: MOCK_ARTILCE.title,
  type: 'collection',
}

export const CollectionTitleMd = Template.bind({})
CollectionTitleMd.args = {
  title: 'Qui amet anim',
  type: 'collection',
}

export const CollectionTitleShort = Template.bind({})
CollectionTitleShort.args = {
  title: 'Short',
  type: 'collection',
}

export const Article = Template.bind({})
Article.args = {
  title: MOCK_ARTILCE.title,
  type: 'article',
}

export const ArticleTitleMd = Template.bind({})
ArticleTitleMd.args = {
  title: 'Qui amet anim',
  type: 'article',
}

export const ArticleTitleShort = Template.bind({})
ArticleTitleShort.args = {
  title: 'Short',
  type: 'article',
}
