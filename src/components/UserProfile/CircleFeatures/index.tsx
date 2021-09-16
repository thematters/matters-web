import {
  Button,
  IconBroadcast16,
  IconDiscussion16,
  TextIcon,
  Translate,
} from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserProfileUserPrivate_user_ownCircles } from '../__generated__/UserProfileUserPrivate'
import { UserProfileUserPublic_user_ownCircles } from '../__generated__/UserProfileUserPublic'

type CircleFeaturesCircle = UserProfileUserPublic_user_ownCircles &
  Partial<UserProfileUserPrivate_user_ownCircles>

interface Props {
  circles: CircleFeaturesCircle[]
  userName?: string | null
}

const CircleFeatures = ({ circles, userName }: Props) => {
  const hasCircle = circles && circles.length > 0

  if (!userName || !hasCircle) {
    return null
  }

  const broadcastPath = toPath({
    page: 'userBroadcast',
    userName,
  })
  const discussionPath = toPath({
    page: 'userDiscussion',
    userName,
  })

  return (
    <section className="container">
      <Button
        bgColor="green"
        spacing={['xtight', 'tight']}
        href={broadcastPath.href}
        aria-label={TEXT.zh_hant.circleBroadcast}
      >
        <TextIcon
          icon={<IconBroadcast16 />}
          color="white"
          size="sm-s"
          weight="md"
        >
          <Translate id="circleBroadcast" />
        </TextIcon>
      </Button>

      <Button
        bgColor="green"
        spacing={['xtight', 'tight']}
        href={discussionPath.href}
        aria-label={TEXT.zh_hant.circleDiscussion}
      >
        <TextIcon
          icon={<IconDiscussion16 />}
          color="white"
          size="sm-s"
          weight="md"
        >
          <Translate id="circleDiscussion" />
        </TextIcon>
      </Button>
      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleFeatures
