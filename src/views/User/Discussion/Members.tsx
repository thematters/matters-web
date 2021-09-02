import { Avatar, Translate } from '~/components'

import styles from './styles.css'

import {
  UserDiscussionPublic_node_Circle,
  UserDiscussionPublic_node_Circle_members_edges,
} from './__generated__/UserDiscussionPublic'

interface Props {
  circle: UserDiscussionPublic_node_Circle
}

const Members = ({ circle }: Props) => {
  const members = (circle?.members.edges ||
    []) as UserDiscussionPublic_node_Circle_members_edges[]

  if (members.length === 0) {
    return null
  }

  return (
    <section className="members">
      <section className="member-list">
        {members.map(({ node }, index) => (
          <Avatar user={node.user || undefined} size="md" key={index} />
        ))}
      </section>
      <p className="member-desc">
        <Translate
          zh_hant={`有 ${circle.members.totalCount} 位用戶已加入圍爐計畫`}
          zh_hans={`有 ${circle.members.totalCount} 位用户已加入围炉计画`}
          en={`${circle.members.totalCount} Supporters`}
        />
      </p>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Members
