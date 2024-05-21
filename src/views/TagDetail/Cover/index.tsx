import classNames from 'classnames'
import gql from 'graphql-tag'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { Cover, TitleTag } from '~/components'
import { CoverTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface TagCoverProps {
  tag: CoverTagFragment
}

const TagCover = ({ tag }: TagCoverProps) => {
  const titleClasses = classNames({
    [styles.title]: true,
    [styles.mask]: !!tag.cover,
  })

  return (
    <Cover cover={tag.cover} fallbackCover={IMAGE_TAG_COVER.src}>
      <div className={titleClasses}>
        <div className={styles.content}>
          <TitleTag tag={tag} is="span" />
        </div>
      </div>
    </Cover>
  )
}

TagCover.fragments = {
  tag: gql`
    fragment CoverTag on Tag {
      id
      cover
      ...DigestTag
    }
    ${TitleTag.fragments.tag}
  `,
}

export default TagCover
