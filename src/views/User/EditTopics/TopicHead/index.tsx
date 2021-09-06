import { Button, IconAdd16, TextIcon, Translate } from '~/components'
import TopicCounts from '~/components/ArticleTopicDigest/TopicCounts'

type TopicHeadProps = {
  title: React.ReactNode | string
  chapterCount: number
  articleCount: number
  onAdd: () => void
}

const TopicHead: React.FC<TopicHeadProps> = ({
  title,
  chapterCount,
  articleCount,
  onAdd,
}) => {
  return (
    <header>
      <section>
        <h2>{title}</h2>

        <TopicCounts chapterCount={chapterCount} articleCount={articleCount} />
      </section>

      <Button
        borderColor="black"
        spacing={['xxtight', 'tight']}
        onClick={onAdd}
      >
        <TextIcon icon={<IconAdd16 />} size="md-s" weight="md">
          <Translate id="add" />
        </TextIcon>
      </Button>
    </header>
  )
}

export default TopicHead
