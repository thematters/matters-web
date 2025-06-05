import type { Meta, StoryObj } from '@storybook/react'

import FooterActions from '~/components/ArticleDigest/Feed/FooterActions'

import { MOCK_ARTILCE } from '../../mocks'

const meta = {
  title: 'Components/Dropdowns/ArticleDigestActions',
  component: FooterActions,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FooterActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    article: MOCK_ARTILCE,
    inUserArticles: true,
    hasExtend: true,
    hasEdit: true,
    hasShare: true,
    hasArchive: true,
    hasBookmark: false,
  },
}
