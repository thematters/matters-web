import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, IconHashTag16, TextIcon } from '~/components'

import { TagDigestButtons } from '../Buttons'
import { TagDigestRichTagPrivate } from './__generated__/TagDigestRichTagPrivate'
import { TagDigestRichTagPublic } from './__generated__/TagDigestRichTagPublic'
import styles from './styles.css'

type Props = {
  tag: TagDigestRichTagPublic & Partial<TagDigestRichTagPrivate>

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
    <Card {...path} {...cardProps} testId={TEST_ID.DIGEST_TAG_RICH}>
      <section className="content">
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
          <section className="button">
            <TagDigestButtons.FollowButton tag={tag} />
          </section>
        )}
      </section>

      {hasDesc && (
        <section className="desc">
          <p>{tag.description}</p>
        </section>
      )}
      <style jsx>{styles}</style>
    </Card>
  )
}

Rich.fragments = fragments

export default Rich
