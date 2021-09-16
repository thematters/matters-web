import { Button, IconAdd16, TextIcon, Translate } from '~/components'
import TopicCounts from '~/components/ArticleTopicDigest/TopicCounts'

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

      <Button
        borderColor="black"
        spacing={[0, 'tight']}
        size={[null, '2rem']}
        borderWidth="sm"
      >
        <TextIcon icon={<IconAdd16 />} size="md-s" weight="md">
          <Translate id="add" />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </header>
  )
}

TopicHead.fragments = fragments

export default TopicHead
