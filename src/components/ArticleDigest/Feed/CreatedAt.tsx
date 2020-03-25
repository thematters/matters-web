import gql from 'graphql-tag'

import { DateTime } from '~/components'

import { CreatedAtArticle } from './__generated__/CreatedAtArticle'

export interface CreatedAtProps {
  article: CreatedAtArticle
}

const fragments = {
  article: gql`
    fragment CreatedAtArticle on Article {
      id
      createdAt
    }
  `,
}

const CreatedAt = ({ article }: CreatedAtProps) => {
  return <DateTime date={article.createdAt} />
}

CreatedAt.fragments = fragments

export default CreatedAt
