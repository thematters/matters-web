import { gql } from '@apollo/client'

import {
  IconLimitedFree16,
  IconPaywall16,
  TextIcon,
  Translate,
} from '~/components'

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
  const isLimitedFree = article.access.type === ArticleAccessType.limitedFree
  const isPaywalled = article.access.type === ArticleAccessType.paywall

  if (isPublic) {
    return null
  }

  return (
    <Label>
      <TextIcon
        icon={
          isLimitedFree ? (
            <IconLimitedFree16 size="sm" />
          ) : (
            <IconPaywall16 size="sm" />
          )
        }
        size="xs"
      >
        {isLimitedFree && (
          <Translate zh_hant="限免" zh_hans="限免" en="Limited Free" />
        )}
        {isPaywalled && (
          <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
        )}
      </TextIcon>
    </Label>
  )
}

AccessLabel.fragments = fragments

export default AccessLabel
