import gql from 'graphql-tag'

import { Translate } from '~/components'

import Label from './Label'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { LimitedFreeArticle } from './__generated__/LimitedFreeArticle'

type LimitedFreeProps = {
  article: LimitedFreeArticle
}

const fragments = {
  article: gql`
    fragment LimitedFreeArticle on Article {
      id
      access {
        type
      }
    }
  `,
}

const LimitedFree = ({ article }: LimitedFreeProps) => {
  if (article.access.type !== ArticleAccessType.limitedFree) {
    return null
  }

  return (
    <Label>
      <Translate id="limitedFree" />
    </Label>
  )
}

LimitedFree.fragments = fragments

export default LimitedFree
