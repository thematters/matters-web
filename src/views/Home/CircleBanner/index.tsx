import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Button,
  IconClose32,
  Translate,
  useFeatures,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { STORAGE_KEY_CIRCLE_BANNER, TEXT } from '~/common/enums'
import { storage } from '~/common/utils'

import IMAGE_CIRCLE_AD_BANNER from '@/public/static/images/circle-ad-banner.svg'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

export const CircleBanner = () => {
  const viewer = useContext(ViewerContext)
  const features = useFeatures()
  const { data: clientPreferenceData, client } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    {
      variables: { id: 'local' },
    }
  )

  // skip if it's server-side rendering
  if (!process.browser) {
    return null
  }

  // determine whether banner should be shown or not
  const storedCircleBanner = storage.get(STORAGE_KEY_CIRCLE_BANNER)
  const enabled =
    typeof storedCircleBanner === 'boolean'
      ? storedCircleBanner
      : clientPreferenceData?.clientPreference?.circleBanner

  const hideBanner = () => {
    storage.set(STORAGE_KEY_CIRCLE_BANNER, false)

    client.writeData({
      id: 'ClientPreference:local',
      data: {
        circleBanner: false,
      },
    })
  }

  if (!viewer.isAuthed || !enabled) {
    return null
  }

  // TODO: showing differnt UI based on viewer state
  // @ts-ignore
  const canCreateCircle = features.circle

  return (
    <div className="container">
      <section
        className="banner"
        style={{ backgroundImage: `url(${IMAGE_CIRCLE_AD_BANNER})` }}
      >
        {canCreateCircle ? (
          <>
            <h3>
              <Translate
                zh_hant="爐子起好了，快來加薪火"
                zh_hans="炉子起好了，快来加薪火"
              />
            </h3>
            <p>
              <Translate
                zh_hant="聯結所有支持者，搭建你的可持續創作生態圈"
                zh_hans="联结所有支持者，搭建你的可持续创作生态圈"
              />
            </p>
          </>
        ) : (
          <>
            <h3>
              <Translate
                zh_hant="圍爐內測，火熱進行中"
                zh_hans="围炉内测，火热进行中"
              />
            </h3>
            <p>
              <Translate
                zh_hant="點擊這裡，致信 hi@matters.news，申請參與內測"
                zh_hans="点击这里，致信 hi@matters.news，申请参与内测"
              />
            </p>
          </>
        )}

        <div className="close">
          <Button
            spacing={[0, 0]}
            bgActiveColor="green"
            aria-label={TEXT.zh_hant.close}
            onClick={hideBanner}
          >
            <IconClose32 size="lg" />
          </Button>
        </div>
      </section>

      <style jsx>{styles}</style>
    </div>
  )
}
