import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, IconHashTag16, TextIcon } from '~/components'
import {
  TagDigestRichTagPrivateFragment,
  TagDigestRichTagPublicFragment,
} from '~/gql/graphql'

import { TagDigestButtons } from '../Buttons'
import styles from './styles.module.css'

type Props = {
  tag: TagDigestRichTagPublicFragment & Partial<TagDigestRichTagPrivateFragment>

  hasDesc?: boolean
  hasFollow?: boolean
} & CardProps

const fragments = {
  tag: {
    public: gql`
      fragment TagDigestRichTagPublic on Tag {
        id
        content
        description
      }
    `,
    private: gql`
      fragment TagDigestRichTagPrivate on Tag {
        id
        ...TagDigestFollowButtonPrivate
      }
      ${TagDigestButtons.FollowButton.fragments.tag.private}
    `,
  },
}

const Rich = ({
  tag,
  hasDesc,
  hasFollow,

  ...cardProps
}: Props) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  return (
    <Card
      {...path}
      {...cardProps}
      testId={TEST_ID.DIGEST_TAG_RICH}
      bgActiveColor="none"
    >
      <section className={styles.content}>
        <TextIcon
          icon={<IconHashTag16 color="grey" />}
          color="black"
          size="md"
          spacing="xxtight"
          weight="normal"
        >
          {tag.content}
        </TextIcon>

        {hasFollow && (
          <section className={styles.button}>
            <TagDigestButtons.FollowButton tag={tag} />
          </section>
        )}
      </section>

      {hasDesc && (
        <section className={styles.desc}>
          <p>{tag.description}</p>
        </section>
      )}
    </Card>
  )
}

Rich.fragments = fragments

export default Rich
