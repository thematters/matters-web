import { IconArticle16, TextIcon, Translate } from '~/components'

import AddButton from './AddButton'
import { fragments } from './gql'
import styles from './styles.css'

import { ChapterHeadChapter } from './__generated__/ChapterHeadChapter'

type ChapterHeadProps = {
  chapter: ChapterHeadChapter
}

const ChapterHead = ({ chapter }: ChapterHeadProps) => {
  return (
    <header>
      <section>
        <h2>{chapter.title}</h2>

        <section className="counts">
          <TextIcon icon={<IconArticle16 />} size="sm-s" spacing="xxtight">
            <Translate
              zh_hant={`${chapter.articleCount} 篇作品`}
              zh_hans={`${chapter.articleCount} 篇作品`}
              en={`${chapter.articleCount} articles`}
            />
          </TextIcon>
        </section>
      </section>

      <AddButton chapter={chapter} />

      <style jsx>{styles}</style>
    </header>
  )
}

ChapterHead.fragments = fragments

export default ChapterHead
