import gql from 'graphql-tag'

import styles from './styles.css'

import { ResponseCountArticle } from './__generated__/ResponseCountArticle'

const fragments = {
  article: gql`
    fragment ResponseCountArticle on Article {
      id
      responseCount
    }
  `,
}

const ResponseCount = ({ article }: { article: ResponseCountArticle }) => {
  const count = article?.responseCount || 0

  return (
    <span className="count" aira-label={`${count} 條回應`}>
      {count}

      <style jsx>{styles}</style>
    </span>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
