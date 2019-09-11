import _get from 'lodash/get'
import { useContext } from 'react'

import { Icon, PageHeader, TextIcon, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

export default () => {
  const viewer = useContext(ViewerContext)

  return (
    <section className="section-container">
      <PageHeader
        pageTitle={
          <Translate
            zh_hant={TEXT.zh_hant.walletSetting}
            zh_hans={TEXT.zh_hans.walletSetting}
          />
        }
        is="h2"
      />

      <section className="setting-section">
        <div className="left">
          <span className="title">Liker ID</span>
          <span>{_get(viewer, 'likerId')}</span>
        </div>
      </section>

      <section className="setting-section">
        <div className="left">
          <span className="title">
            <Translate zh_hant="我的創作價值" zh_hans="我的创作价值" />
          </span>
          <span>{_get(viewer, 'likerId')}</span>
        </div>

        <a href="https://like.co/in" className="u-link-green" target="_blank">
          <TextIcon
            icon={
              <Icon
                id={ICON_ARROW_RIGHT_GREEN.id}
                viewBox={ICON_ARROW_RIGHT_GREEN.viewbox}
                size="small"
              />
            }
            textPlacement="left"
            weight="medium"
          >
            <Translate zh_hant="去 like.co 查看" zh_hans="去 like.co 查看" />
          </TextIcon>
        </a>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
