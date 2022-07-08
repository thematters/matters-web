import { Tag, Translate } from '~/components'

import styles from './styles.css'

type RecommendedTagsProps = {
  tags: any[]
  onClickTag: (tag: any) => void
}

const RecommendedTags: React.FC<RecommendedTagsProps> = ({
  tags,
  onClickTag,
}) => {
  return (
    <section className="recommendedTags">
      <p className="hint">
        <Translate
          zh_hant="點選標籤幫助讀者找到你的作品，一篇作品最多添加 8 個標籤"
          zh_hans="點選標籤幫助讀者找到你的作品，一篇作品最多添加 8 個標籤"
          en=""
        />
      </p>

      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              active
              onClick={() => onClickTag(tag)}
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default RecommendedTags
