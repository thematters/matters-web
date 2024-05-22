import { FormattedMessage } from 'react-intl'

import { Tag } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'
import { EditorRecommendedTagsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type EditorRecommendedTagsUserTagsEdgesNode = NonNullable<
  NonNullable<EditorRecommendedTagsQuery['user']>['tags']['edges']
>[0]['node'] & { __typename: 'Tag' }

type RecommendedTagsProps = {
  tags: EditorRecommendedTagsUserTagsEdgesNode[]
  onAddTag: (tag: SelectTag) => void
  disabled?: boolean
}

const RecommendedTags: React.FC<RecommendedTagsProps> = ({
  tags,
  onAddTag,
  disabled,
}) => {
  return (
    <section className={styles.recommendedTags}>
      <p className={styles.hint}>
        <FormattedMessage defaultMessage="Recently used" id="m+cdhC" />
      </p>

      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              is="span"
              onClick={!disabled ? () => onAddTag(tag) : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecommendedTags
