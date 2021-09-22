import TopicCounts from '~/components/ArticleTopicDigest/TopicCounts'

import AddButton from './AddButton'
import { fragments } from './gql'
import styles from './styles.css'

import { TopicHeadTopic } from './__generated__/TopicHeadTopic'

type TopicHeadProps = {
  topic: TopicHeadTopic
}

const TopicHead = ({ topic }: TopicHeadProps) => {
  return (
    <header>
      <section>
        <h2>{topic.title}</h2>

        <TopicCounts topic={topic} />
      </section>

      <AddButton topic={topic} />

      <style jsx>{styles}</style>
    </header>
  )
}

TopicHead.fragments = fragments

export default TopicHead
