import { TEST_ID } from '~/common/enums'
import { ArticleTag } from '~/components'
import { MomentDigestDetailMomentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type TagsProps = {
  moment: MomentDigestDetailMomentFragment
}

const Tags = ({ moment }: TagsProps) => {
  const { momentTags } = moment

  if (!momentTags || momentTags.length === 0) {
    return null
  }

  return (
    <section className={styles.tags} data-test-id={TEST_ID.MOMENT_DIGEST_TAGS}>
      {momentTags.map(
        (tag) =>
          tag && (
            <ArticleTag
              key={tag.id}
              tag={tag}
              canClamp
              feedType="moment"
              textIconProps={{ size: 13 }}
            />
          )
      )}
    </section>
  )
}

export default Tags
