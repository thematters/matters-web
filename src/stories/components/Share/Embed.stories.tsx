import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { EmbedShare, Translate } from '~/components'

export default {
  title: 'Components/Share',
  component: EmbedShare,
} as ComponentMeta<typeof EmbedShare>

const Template: ComponentStory<typeof EmbedShare> = (args) => (
  <EmbedShare {...args} />
)

const HeaderTitle = (
  <Translate
    zh_hant="邀請更多好友加入星際旅行"
    zh_hans="邀请更多好友加入星际旅行"
    en="Invite more friends to the galaxy journey"
  />
)

export const Embed = Template.bind({})
Embed.args = {
  headerTitle: HeaderTitle,
}
