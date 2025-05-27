import gql from 'graphql-tag'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import IconHashTag from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'
import { Icon, LinkWrapper, TextIcon } from '~/components'
import { TagDigestConciseTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestConciseTagProps = {
  tag: TagDigestConciseTagFragment
  textSize?: 14 | 15 | 16
  textWeight?: 'normal' | 'medium'
  iconSize?: 20
  showArticlesNum?: boolean
  textLineClamp?: boolean
  onClick?: () => void
}

const fragments = {
  tag: gql`
    fragment TagDigestConciseTag on Tag {
      id
      content
      numArticles
    }
  `,
}

const Concise = ({
  tag,
  textSize = 15,
  textWeight = 'medium',
  showArticlesNum,
  iconSize,
  textLineClamp,
  onClick,
}: TagDigestConciseTagProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })
  return (
    <LinkWrapper
      {...path}
      testId={TEST_ID.DIGEST_TAG_CONCISE}
      onClick={onClick}
    >
      <section className={styles.content}>
        <TextIcon
          icon={<Icon icon={IconHashTag} color="grey" size={iconSize} />}
          color="black"
          size={textSize}
          spacing={4}
          weight={textWeight}
          textLineClamp={textLineClamp}
        >
          {tag.content}
        </TextIcon>

        {showArticlesNum && (
          <TextIcon
            icon={<Icon icon={IconDraft} color="greyDark" size={12} />}
            size={12}
            spacing={4}
            color="greyDark"
          >
            {numAbbr(tag.numArticles)}
          </TextIcon>
        )}
      </section>
    </LinkWrapper>
  )
}

Concise.fragments = fragments

export default Concise
