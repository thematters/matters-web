import {
  IconArticle16,
  IconChapter16,
  IconDotDivider,
  TextIcon,
  Translate,
} from '~/components'

type TopicCountsProps = {
  chapterCount: number
  articleCount: number
}

const TopicCounts: React.FC<TopicCountsProps> = ({
  chapterCount,
  articleCount,
}) => {
  const hasChapter = chapterCount > 0
  const hasArticle = articleCount > 0

  return (
    <section className="counts">
      {hasChapter && (
        <TextIcon icon={<IconChapter16 />} size="sm-s" spacing="xxtight">
          <Translate
            zh_hant={`${chapterCount} 個章節`}
            zh_hans={`${chapterCount} 个章节`}
            en={`${chapterCount} chapters`}
          />
        </TextIcon>
      )}

      {hasChapter && hasArticle && <IconDotDivider />}

      {hasArticle && (
        <TextIcon icon={<IconArticle16 />} size="sm-s" spacing="xxtight">
          <Translate
            zh_hant={`${articleCount} 篇作品`}
            zh_hans={`${articleCount} 篇作品`}
            en={`${articleCount} articles`}
          />
        </TextIcon>
      )}
    </section>
  )
}

export default TopicCounts
