import { Icon } from '~/components'

import { toPath } from '~/common/utils'

import { DropdownDigestArticle } from './__generated__/DropdownDigestArticle'

const OpenExternalLink = ({ article }: { article: DropdownDigestArticle }) => {
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <a href={path.as} target="_blank" onClick={e => e.stopPropagation()}>
      <Icon.External />
    </a>
  )
}

export default OpenExternalLink
