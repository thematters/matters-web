import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import { Icon, PageHeader, TextIcon, Translate } from '~/components'
import { Query } from '~/components/GQL'
import { ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

const VIEWER_LIKE_INFO = gql`
  query ViewerLikeInfo {
    viewer {
      id
      status {
        LIKE {
          total
          rateUSD
        }
      }
    }
  }
`

const SetupLikerIdButton = () => (
  <ModalSwitch modalId="setupLikerIdModal">
    {(open: any) => (
      <button type="button" className="u-link-green" onClick={open}>
        <Translate zh_hant={TEXT.zh_hant.setup} zh_hans={TEXT.zh_hans.setup} />
      </button>
    )}
  </ModalSwitch>
)

const WalletSetting = () => {
  const viewer = useContext(ViewerContext)
  const likerId = _get(viewer, 'likerId')

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
          {likerId && <span>{likerId}</span>}
          {!likerId && <SetupLikerIdButton />}
        </div>
      </section>

      <Query query={VIEWER_LIKE_INFO}>
        {({ data, loading, error }: QueryResult) => {
          const LIKE = _get(data, 'viewer.status.LIKE')

          if (loading || error) {
            return null
          }

          const USDPrice = (LIKE.rateUSD * LIKE.total).toFixed(2)

          return (
            <section className="setting-section">
              <div className="left">
                <span className="title">
                  <Translate zh_hant="我的創作價值" zh_hans="我的创作价值" />
                </span>
                {likerId && (
                  <span>
                    {LIKE.total} LikeCoin
                    {USDPrice && (
                      <span className="usd-price"> ≈ {USDPrice} USD</span>
                    )}
                  </span>
                )}
                {!likerId && (
                  <span className="hint">
                    <Translate
                      zh_hant="完成設置 Liker ID 後即可管理創作收益"
                      zh_hans="完成设置 Liker ID 后即可管理创作收益"
                    />
                  </span>
                )}
              </div>

              {likerId && (
                <a
                  href="https://like.co/in"
                  className="u-link-green"
                  target="_blank"
                >
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
                    <Translate
                      zh_hant="去 like.co 查看"
                      zh_hans="去 like.co 查看"
                    />
                  </TextIcon>
                </a>
              )}
            </section>
          )
        }}
      </Query>

      <style jsx>{styles}</style>
    </section>
  )
}

export default WalletSetting
