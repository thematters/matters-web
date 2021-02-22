import classNames from 'classnames'
import gql from 'graphql-tag'

import { Cover, Tag } from '~/components'

import TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { CoverTag } from './__generated__/CoverTag'

interface TagCoverProps {
  tag: CoverTag
}

const TagCover = ({ tag }: TagCoverProps) => {
  const titleClasses = classNames({
    title: true,
    mask: !!tag.cover,
  })

  return (
    <Cover cover={tag.cover} fallbackCover={TAG_COVER}>
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
