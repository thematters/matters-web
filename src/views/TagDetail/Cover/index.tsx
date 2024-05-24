import classNames from 'classnames'
import gql from 'graphql-tag'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { Cover } from '~/components'
import { Icon, TextIcon } from '~/components'
import { CoverTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const TagCover = ({ tag }: { tag: CoverTagFragment }) => {
  const titleClasses = classNames({
    [styles.title]: true,
    [styles.mask]: !!tag.cover,
  })

  return (
    <Cover cover={tag.cover} fallbackCover={IMAGE_TAG_COVER.src}>
      <div className={titleClasses}>
        <div className={styles.content}>
          <span
            className={classNames({
              [styles.tag]: true,
              [styles.disabled]: true,
            })}
          >
            <TextIcon
              size={20}
              weight="medium"
              spacing={0}
              color="white"
              icon={<Icon icon={IconHashTag} color="white" size={20} />}
              placement="right"
              allowUserSelect
            >
              <span className={styles.name}>{tag.content}</span>
            </TextIcon>
          </span>
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
      content
      numArticles
      numAuthors
    }
    fragment DigestTag on Tag {
      id
      content
      numArticles
      numAuthors
    }
  `,
}

export default TagCover
