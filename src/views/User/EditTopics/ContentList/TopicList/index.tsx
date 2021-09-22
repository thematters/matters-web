import { Card, List, useRoute } from '~/components'

import { toPath } from '~/common/utils'

import Item from '../Item'
import { fragments } from './gql'
import styles from './styles.css'

import { TopicListTopic } from './__generated__/TopicListTopic'

type TopicListProps = {
  topics: TopicListTopic[]
}

const TopicList = ({ topics }: TopicListProps) => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const totalArticleCount = (topic: TopicListTopic) => {
    const topicArticleCount = topic.articleCount
    const chapterArticleCount =
      topic.chapters
        ?.map((c) => c.articleCount)
        .reduce((prev, curr) => prev + curr, 0) || 0
    return topicArticleCount + chapterArticleCount
  }

  return (
    <List>
      {topics.map((topic) => (
        <List.Item key={topic.id}>
          <Card
            {...toPath({
              page: 'userEditTopicsTopic',
              userName,
              topicId: topic.id,
            })}
            spacing={['base', 'base']}
            bgColor="white"
          >
            <section className="topic">
              <Item
                title={topic.title}
                count={totalArticleCount(topic)}
                is="h3"
              />
            </section>

            {topic.chapters?.map((chapter) => (
              <section className="chapter" key={chapter.id}>
                <Item
                  title={chapter.title}
                  count={chapter.articleCount}
                  is="h4"
                />
              </section>
            ))}

            <style jsx>{styles}</style>
          </Card>
        </List.Item>
      ))}
    </List>
  )
}

TopicList.fragments = fragments

export default TopicList
