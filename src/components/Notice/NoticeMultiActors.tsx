import { Button, IconMore32 } from '~/components'

import NoticeActorAvatar, { size } from './NoticeActorAvatar'
import styles from './styles.css'

type NoticeMultiActorsProps = {
  actors: any[]
  size: size
}

const NoticeMultiActors = ({ actors, size }: NoticeMultiActorsProps) => {
  const actorsCount = actors.length
  const showAll = actorsCount <= 8

  return (
    <>
      {showAll &&
        actors.map((actor, index) => (
          <NoticeActorAvatar key={index} user={actor} size={size} />
        ))}
      {!showAll && (
        <>
          {actors.slice(0, 7).map((actor, index) => (
            <NoticeActorAvatar key={index} user={actor} size={size} />
          ))}
          <span className="more-actors">
            <Button
              bgColor="grey-lighter"
              bgActiveColor="grey-lighter"
              borderRadius="5rem"
            >
              <IconMore32 color="grey" size="lg" />
            </Button>
            <style jsx>{styles}</style>
          </span>
        </>
      )}
    </>
  )
}

export default NoticeMultiActors
