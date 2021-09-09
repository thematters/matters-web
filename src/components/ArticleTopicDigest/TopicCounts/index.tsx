import {
  IconArticle16,
  IconChapter16,
  IconDotDivider,
  TextIcon,
  Translate,
} from '~/components'

import { fragments } from './gql'

import { TopicCountsTopic } from './__generated__/TopicCountsTopic'

type TopicCountsProps = {
  topic: TopicCountsTopic
}

const TopicCounts = ({ topic }: TopicCountsProps) => {
  const hasChapter = topic.chapterCount > 0
  const hasArticle = topic.articleCount > 0

  return (
    <section className="counts">
      {hasChapter && (
        <TextIcon icon={<IconChapter16 />} size="sm-s" spacing="xxtight">
          <Translate
            zh_hant={`${topic.chapterCount} 個章節`}
            zh_hans={`${topic.chapterCount} 个章节`}
            en={`${topic.chapterCount} chapters`}
          />
        </TextIcon>
      )}

      {hasChapter && hasArticle && <IconDotDivider />}

      {hasArticle && (
        <TextIcon icon={<IconArticle16 />} size="sm-s" spacing="xxtight">
          <Translate
            zh_hant={`${topic.articleCount} 篇作品`}
            zh_hans={`${topic.articleCount} 篇作品`}
            en={`${topic.articleCount} articles`}
          />
        </TextIcon>
      )}
    </section>
  )
}

TopicCounts.fragments = fragments

export default TopicCounts
