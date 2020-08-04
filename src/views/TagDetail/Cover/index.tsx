import classNames from 'classnames'
import gql from 'graphql-tag'

import { Img, Tag } from '~/components'

import TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { CoverTag } from './__generated__/CoverTag'

interface TagCoverProps {
  tag: CoverTag
}

const TagCover = ({ tag }: TagCoverProps) => {
  const url = tag.cover || TAG_COVER
  const titleClasses = classNames({
    title: true,
    mask: !!tag.cover,
  })

  return (
    <section className="cover">
      <Img url={url} size="1080w" smUpSize="540w" />

      <div className={titleClasses}>
        <div className="content">
          <Tag tag={tag} type="title" />
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
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
