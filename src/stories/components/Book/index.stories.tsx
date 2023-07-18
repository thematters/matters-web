import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Book } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Book',
  component: Book,
} as ComponentMeta<typeof Book>

const Template: ComponentStory<typeof Book> = (args) => {
  return (
    <MockedProvider>
      <Book {...args} />
    </MockedProvider>
  )
}

export const TitleOnly = Template.bind({})
TitleOnly.args = {
  title: MOCK_ARTILCE.title,
}

export const TitleAndCount = Template.bind({})
TitleAndCount.args = {
  title: MOCK_ARTILCE.title,
  articleCount: 10,
}

export const TitleMdOnly = Template.bind({})
TitleMdOnly.args = {
  title: 'Qui amet anim',
}

export const TitleMdAndCountOnly = Template.bind({})
TitleMdAndCountOnly.args = {
  title: 'Qui amet anim',
  articleCount: 0,
}

export const TitleLgOnly = Template.bind({})
TitleLgOnly.args = {
  title: 'Short',
}

export const TitleLgAndCountOnly = Template.bind({})
TitleLgAndCountOnly.args = {
  title: 'Short',
  articleCount: 0,
}

export const Cover = Template.bind({})
Cover.args = {
  title: MOCK_ARTILCE.title,
  cover: MOCK_ARTILCE.cover,
  articleCount: 0,
}

export const Flat = Template.bind({})
Flat.args = {
  title: MOCK_ARTILCE.title,
  articleCount: 0,
  variant: 'flat',
}
