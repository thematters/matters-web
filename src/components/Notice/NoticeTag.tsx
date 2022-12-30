import gql from 'graphql-tag'

import { Tag } from '~/components/Tag'
import { NoticeTagFragment } from '~/gql/graphql'

import styles from './styles.css'

const NoticeTag = ({ tag }: { tag: NoticeTagFragment | null }) => {
  if (!tag) {
    return null
  }

  return (
    <section className="sub-content tag-content">
      <Tag tag={tag} type="inline" active />

      <style jsx>{styles}</style>
    </section>
  )
}

NoticeTag.fragments = {
  tag: gql`
    fragment NoticeTag on Tag {
      id
      ...DigestTag
    }
    ${Tag.fragments.tag}
  `,
}

export default NoticeTag
