import IconMore from '@/public/static/icons/24px/more.svg'
import { Button, Icon } from '~/components'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

import NoticeActorAvatar from './NoticeActorAvatar'
import styles from './styles.module.css'

type NoticeMultiActorsProps = {
  actors: NoticeActorAvatarUserFragment[]
}

const NoticeMultiActors = ({ actors }: NoticeMultiActorsProps) => {
  const actorsCount = actors.length
  const showAll = actorsCount <= 8

  if (showAll) {
    return (
      <>
        {actors.map((actor, index) => (
          <NoticeActorAvatar key={index} user={actor} />
        ))}
      </>
    )
  }

  return (
    <>
      {actors.slice(0, 7).map((actor, index) => (
        <NoticeActorAvatar key={index} user={actor} />
      ))}
      <span className={styles.moreActors}>
        <Button
          bgColor="greyLighter"
          bgActiveColor="greyLighter"
          borderRadius="5rem"
        >
          <Icon icon={IconMore} color="grey" size={32} />
        </Button>
      </span>
    </>
  )
}

export default NoticeMultiActors
