import { MockedProvider } from '@apollo/react-testing'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArticleTopicDigest } from '~/components'
import { ArticleTopicDigestProps } from '~/components/ArticleTopicDigest'

import { MOCK_ARTILCE, MOCK_USER } from '../../mocks'

export default {
  title: 'Components/ArticleTopicDigest',
  component: ArticleTopicDigest,
} as Meta

const Template: Story<ArticleTopicDigestProps> = (args) => (
  <MockedProvider>
    <ArticleTopicDigest {...args} />
  </MockedProvider>
)

export const Default = Template.bind({})
Default.args = {
  topic: {
    __typename: 'Topic',
    id: '1',
    title: '車如其人',
    description:
      '擁有車這件事，有時候是為了代步、為了去更遠的地方、為了圓一個夢想，又或者在駕駛過程中，修正自己的想法，把糾結的情緒逐一解開，對紅林望著高架橋上奔馳的車潮，攝影師李廣 Ricor 的新住所，視野特別遼闊。這裡像是個佈置得宜的攝影棚，同時也是他的家、他的工作室。位在環河南。',
    cover: 'https://source.unsplash.com/512x512?topic',
    author: MOCK_USER,
    chapterCount: 6,
    articleCount: 3,
    latestArticle: MOCK_ARTILCE,
  },
}
