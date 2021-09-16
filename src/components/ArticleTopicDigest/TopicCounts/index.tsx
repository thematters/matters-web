import {
  IconArticle16,
  IconChapter16,
  IconDotDivider,
  TextIcon,
  Translate,
} from '~/components'

import { fragments } from './gql'
import styles from './styles.css'

import { TopicCountsTopic } from './__generated__/TopicCountsTopic'

type TopicCountsProps = {
  topic: TopicCountsTopic
}

const TopicCounts = ({ topic }: TopicCountsProps) => {
  const chapterCount = topic.chapterCount || 0
  const articleCount = topic.articleCount || 0

  return (
    <section className="counts">
      <TextIcon icon={<IconChapter16 />} size="sm-s" spacing="xxtight">
        <Translate
          zh_hant={`${chapterCount} 個章節`}
          zh_hans={`${chapterCount} 个章节`}
          en={`${chapterCount} chapters`}
        />
      </TextIcon>

      <IconDotDivider />

      <TextIcon icon={<IconArticle16 />} size="sm-s" spacing="xxtight">
        <Translate
          zh_hant={`${articleCount} 篇作品`}
          zh_hans={`${articleCount} 篇作品`}
          en={`${articleCount} articles`}
        />
      </TextIcon>

      <style jsx>{styles}</style>
    </section>
  )
}

TopicCounts.fragments = fragments

export default TopicCounts
