import gql from 'graphql-tag'

import styles from '~/common/styles/utils/content.css'

import { ContentArticle } from './__generated__/ContentArticle'

const fragments = {
  article: gql`
    fragment ContentArticle on Article {
      content
    }
  `
}

const Content = ({ article }: { article: ContentArticle }) => {
  return (
    <>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <style jsx>{styles}</style>
    </>
  )
}

Content.fragments = fragments

export default Content
