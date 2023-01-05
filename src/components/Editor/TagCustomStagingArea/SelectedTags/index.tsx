import { Tag } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'
import { EditorRecommendedTagsQuery } from '~/gql/graphql'

import styles from './styles.css'

type EditorRecommendedTagsUserTagsEdgesNode = NonNullable<
  NonNullable<EditorRecommendedTagsQuery['user']>['tags']['edges']
>[0]['node'] & { __typename: 'Tag' }

type SelectedTagsProps = {
  tags: EditorRecommendedTagsUserTagsEdgesNode[]
  onRemoveTag: (tag: SelectTag) => void
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ tags, onRemoveTag }) => {
  return (
    <section className="selectedTags">
      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              hasClose
              disabled
              removeTag={() => onRemoveTag(tag)}
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SelectedTags
