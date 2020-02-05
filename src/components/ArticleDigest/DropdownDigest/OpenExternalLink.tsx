import { Icon } from '~/components'

import { toPath } from '~/common/utils'

import { DropdownDigestArticle } from './__generated__/DropdownDigestArticle'

const OpenExternalLink = ({ article }: { article: DropdownDigestArticle }) => {
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <a href={path.as} target="_blank">
      <Icon.External color="green" />
    </a>
  )
}

export default OpenExternalLink
