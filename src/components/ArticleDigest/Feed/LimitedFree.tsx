import gql from 'graphql-tag'

import { Translate } from '~/components'

import Label from './Label'

import { LimitedFreeArticle } from './__generated__/LimitedFreeArticle'

type LimitedFreeProps = {
  article: LimitedFreeArticle
}

const fragments = {
  article: gql`
    fragment LimitedFreeArticle on Article {
      id
      limitedFree
    }
  `,
}

const LimitedFree = ({ article }: LimitedFreeProps) => {
  if (!article.limitedFree) {
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
