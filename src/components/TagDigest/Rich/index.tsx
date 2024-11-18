import gql from 'graphql-tag'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, Icon, TextIcon } from '~/components'
import {
  TagDigestRichTagPrivateFragment,
  TagDigestRichTagPublicFragment,
} from '~/gql/graphql'

import { TagDigestButtons } from '../Buttons'
import styles from './styles.module.css'

type Props = {
  tag: TagDigestRichTagPublicFragment & Partial<TagDigestRichTagPrivateFragment>

  hasFollow?: boolean
} & CardProps

const fragments = {
  tag: {
    public: gql`
      fragment TagDigestRichTagPublic on Tag {
        id
        content
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
          icon={<Icon icon={IconHashTag} color="grey" />}
          color="black"
          size={16}
          spacing={4}
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
    </Card>
  )
}

Rich.fragments = fragments

export default Rich
