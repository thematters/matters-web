import { Card, List, useRoute } from '~/components'

import { toPath } from '~/common/utils'

import Item from '../Item'
import { fragments } from './gql'

import { ChapterListChapter } from './__generated__/ChapterListChapter'

type ChapterListProps = {
  chapters: ChapterListChapter[]
}

const ChapterList = ({ chapters }: ChapterListProps) => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const topicId = getQuery('topicId')

  return (
    <List>
      {chapters.map((chapter) => (
        <List.Item key={chapter.id}>
          <Card
            {...toPath({
              page: 'userEditTopicsTopicChapter',
              userName,
              topicId,
              chapterId: chapter.id,
            })}
            spacing={['base', 'base']}
            bgColor="white"
          >
            <section className="topic-card">
              <Item
                title={chapter.title}
                type="chapter"
                count={chapter.articleCount}
              />
            </section>
          </Card>
        </List.Item>
      ))}
    </List>
  )
}

ChapterList.fragments = fragments

export default ChapterList
