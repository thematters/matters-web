import gql from 'graphql-tag'

import { IconPaywall16, TextIcon, Translate } from '~/components'

import Label from './Label'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { AccessLabelArticle } from './__generated__/AccessLabelArticle'

type AccessLabelProps = {
  article: AccessLabelArticle
}

const fragments = {
  article: gql`
    fragment AccessLabelArticle on Article {
      id
      access {
        type
      }
    }
  `,
}

const AccessLabel = ({ article }: AccessLabelProps) => {
  const isPublic = article.access.type === ArticleAccessType.public
  const isPaywalled = article.access.type === ArticleAccessType.paywall

  if (isPublic) {
    return null
  }

  return (
    <Label>
      <TextIcon icon={<IconPaywall16 size="sm" />} size="xs">
        {isPaywalled && (
          <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
        )}
      </TextIcon>
    </Label>
  )
}

AccessLabel.fragments = fragments

export default AccessLabel
