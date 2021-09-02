import classNames from 'classnames'

import {
  Button,
  // SubscribeCircleDialog,
  TextIcon,
  Throw404,
  Translate,
  useResponsive,
} from '~/components'

import { OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'

import BACKGROUND_SM from '@/public/static/images/discussion/background-sm.png'
import BACKGROUND from '@/public/static/images/discussion/background.png'
import MAIN_SM from '@/public/static/images/discussion/main-sm.svg'
import MAIN from '@/public/static/images/discussion/main.svg'

import Members from './Members'
import styles from './styles.css'

import { UserDiscussionPublic_node_Circle } from './__generated__/UserDiscussionPublic'

interface Props {
  circle: UserDiscussionPublic_node_Circle
}

const Wall = ({ circle }: Props) => {
  const isSmallUp = useResponsive('sm-up')

  const prices = circle?.prices || []
  const price = prices[0]

  if (!price) {
    return <Throw404 />
  }

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  const wallClasses = classNames({
    wall: true,
  })
  const wallStyles = {
    backgroundImage: `url(${isSmallUp ? BACKGROUND.src : BACKGROUND_SM.src})`,
  }

  const sloganClasses = classNames({
    slogan: true,
    [`size-${isSmallUp ? 'md' : 'sm'}`]: true,
  })

  return (
    <section className={wallClasses} style={wallStyles}>
      <section className="info">
        <p className="price">
          <Translate
            zh_hant={`每月只要 $${price.amount} HKD`}
            zh_hans={`每月只要 $${price.amount} HKD`}
            en={`Join for $${price.amount} HKD per month`}
          />
        </p>

        <Members circle={circle} />
      </section>

      <picture>
        <source media="(min-width: 768px)" srcSet={MAIN} />

        <img src={MAIN_SM} />
      </picture>

      <section className={sloganClasses}>
        <p className="title">
          <Translate
            zh_hant="無限閱讀・支持創作・眾聊互動"
            zh_hans="无限阅读・支持创作・众聊互动"
            en="Read More・Support Creator・Join Discussion"
          />
        </p>
        <p className="desc">
          <Translate
            zh_hant="解鎖圍爐內所有作品，擁有眾聊的討論權限"
            zh_hans="解锁围炉内所有作品，拥有众聊的讨论权限"
            en="Unlock all contents, and join discussion."
          />
        </p>

        <Button
          bgColor="green"
          size={['100%', '3rem']}
          onClick={openSubscribeCircleDialog}
        >
          <TextIcon color="white" size="xm" weight="md">
            <Translate zh_hant="立即加入" zh_hans="立即加入" en="Join Now" />
          </TextIcon>
        </Button>
      </section>

      {/*
      <SubscribeCircleDialog circle={circle} />
      */}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Wall
