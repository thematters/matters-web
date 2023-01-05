import { Tag, Translate } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'
import { EditorRecommendedTagsQuery } from '~/gql/graphql'

import styles from './styles.css'

type EditorRecommendedTagsUserTagsEdgesNode = NonNullable<
  NonNullable<EditorRecommendedTagsQuery['user']>['tags']['edges']
>[0]['node'] & { __typename: 'Tag' }

type RecommendedTagsProps = {
  tags: EditorRecommendedTagsUserTagsEdgesNode[]
  onAddTag: (tag: SelectTag) => void
}

const RecommendedTags: React.FC<RecommendedTagsProps> = ({
  tags,
  onAddTag,
}) => {
  return (
    <section className="recommendedTags">
      <p className="hint">
        <Translate id="hintAddRecommendedTag" />
      </p>

      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              active
              disabled
              onClick={() => onAddTag(tag)}
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default RecommendedTags
