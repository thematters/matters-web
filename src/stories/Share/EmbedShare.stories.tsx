import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { EmbedShare, EmbedShareProps, Translate } from '~/components'

export default {
  title: 'Components/Share/EmbedShare',
  component: EmbedShare,
} as Meta

const Template: Story<EmbedShareProps> = (args) => <EmbedShare {...args} />

const HeaderTitle = (
  <Translate
    zh_hant="邀請更多好友加入星際旅行"
    zh_hans="邀请更多好友加入星际旅行"
    en="Invite more friends to the galaxy journey"
  />
)

export const Default = Template.bind({})
Default.args = {
  headerTitle: HeaderTitle,
}

export const Wrap = Template.bind({})
Wrap.args = {
  wrap: true,
  headerTitle: HeaderTitle,
}
