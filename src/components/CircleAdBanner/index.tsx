import { useContext } from 'react'

import { Button, FeaturesContext, IconClose32, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import IMAGE_CIRCLE_AD_BANNER from '@/public/static/images/circle-ad-banner.svg'

import styles from './styles.css'

export const CircleAdBanner = () => {
  const features = useContext(FeaturesContext)

  // TODO
  // @ts-ignore
  const canCreateCircle = features.circle

  return (
    <section
      className="container"
      style={{ backgroundImage: `url(${IMAGE_CIRCLE_AD_BANNER})` }}
    >
      {canCreateCircle ? (
        <>
          <h3>
            <Translate zh_hant="爐子起好了，快來加薪火" zh_hans="" />
          </h3>
          <p>
            <Translate
              zh_hant="聯結所有支持者，搭建你的可持續創作生態圈"
              zh_hans=""
            />
          </p>
        </>
      ) : (
        <>
          <h3>
            <Translate zh_hant="圍爐內測，火熱進行中" zh_hans="" />
          </h3>
          <p>
            <Translate
              zh_hant="點擊這裡，致信 hi@matters.news，申請參與內測"
              zh_hans=""
            />
          </p>
        </>
      )}

      <div className="close">
        <Button
          spacing={[0, 0]}
          bgActiveColor="green"
          aria-label={TEXT.zh_hant.close}
        >
          <IconClose32 size="lg" />
        </Button>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}
