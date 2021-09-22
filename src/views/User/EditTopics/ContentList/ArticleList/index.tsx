import { Card, List } from '~/components'

import Item from '../Item'
import { fragments } from './gql'

import { TopicArticleListArticle } from './__generated__/TopicArticleListArticle'

type ArticleListProps = {
  articles: TopicArticleListArticle[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <List>
      {articles.map((article) => (
        <List.Item key={article.id}>
          <Card spacing={['base', 'base']} bgColor="white">
            <Item title={article.title} type="article" />
          </Card>
        </List.Item>
      ))}
    </List>
  )
}

ArticleList.fragments = fragments

export default ArticleList
