import classNames from 'classnames'
import gql from 'graphql-tag'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { Cover, Tag } from '~/components'
import { CoverTagFragment } from '~/gql/graphql'

import styles from './styles.css'

interface TagCoverProps {
  tag: CoverTagFragment
}

const TagCover = ({ tag }: TagCoverProps) => {
  const titleClasses = classNames({
    title: true,
    mask: !!tag.cover,
  })

  return (
    <Cover cover={tag.cover} fallbackCover={IMAGE_TAG_COVER.src}>
      <div className={titleClasses}>
        <div className="content">
          <Tag tag={tag} type="title" disabled />
        </div>

        <style jsx>{styles}</style>
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
    ${Tag.fragments.tag}
  `,
}

export default TagCover
