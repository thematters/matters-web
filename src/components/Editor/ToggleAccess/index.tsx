import {
  CircleDigest,
  IconArrowRight16,
  IconChecked32,
  Switch,
  Translate,
} from '~/components'

import SelectLicense from './SelectLicense'
import styles from './styles.css'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { ArticleDetailPublic_article_Article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { EditMetaDraft } from '~/views/Me/DraftDetail/__generated__/EditMetaDraft'

export type ToggleAccessProps = {
  circle?: DigestRichCirclePublic | null
  accessType: ArticleAccessType
  license: ArticleLicenseType

  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => any

  accessSaving: boolean
  canToggleCircle: boolean

  draft?: EditMetaDraft
  article?: ArticleDetailPublic_article_Article
  editSupportSetting: (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => any
  supportSettingSaving: boolean
  onOpenSupportSetting: () => void

  iscnPublish?: boolean | null
  togglePublishISCN: (iscnPublish: boolean) => void
  iscnPublishSaving: boolean

  inSidebar?: boolean
}

const ToggleAccess: React.FC<ToggleAccessProps> = ({
  circle,
  license,

  editAccess,
  accessSaving,
  canToggleCircle,

  draft,
  article,
  onOpenSupportSetting,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  inSidebar,
}) => {
  const content = draft ? draft : article
  return (
    <section className={inSidebar ? 'inSidebar' : ''}>
      {canToggleCircle && (
        <section className="circle">
          <section className="switch">
            <header>
              <h3>
                <Translate id="addToCircle" />
              </h3>

              <Switch
                checked={!!circle}
                onChange={() =>
                  editAccess(
                    !circle,
                    false,
                    circle && license === ArticleLicenseType.arr
                      ? ArticleLicenseType.cc_by_nc_nd_2
                      : license
                  )
                }
                disabled={!canToggleCircle}
                loading={accessSaving}
              />
            </header>
          </section>

          {circle && (
            <CircleDigest.Rich
              circle={circle}
              bgColor="grey-lighter"
              borderRadius="xtight"
              avatarSize="xl"
              textSize="md-s"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          )}
        </section>
      )}

      <section className="widget">
        <h3>
          <Translate id="license" />
        </h3>

        <section className="license">
          <SelectLicense
            isInCircle={!!circle}
            license={license}
            onChange={(newLicense) =>
              editAccess(
                !!circle,
                !!circle && newLicense === ArticleLicenseType.arr,
                newLicense
              )
            }
          />
        </section>
      </section>

      <section className="support-setting">
        <button type="button" onClick={onOpenSupportSetting}>
          <section className="support">
            <section className="left">
              <h3>
                <Translate
                  zh_hans="设定支持"
                  zh_hant="設定支持"
                  en="Support Setting"
                />
              </h3>
              {content &&
              (content.replyToDonator || content.requestForDonation) ? (
                <IconChecked32 size="md" />
              ) : (
                <IconArrowRight16 />
              )}
            </section>
            <p className="hint">
              <Translate
                zh_hans="可自定求支持文字，以及支持後回覆的內容"
                zh_hant="可自定求支持文字，以及支持回复的內容"
                en="Customize your call-to-support prompt to audience, or thank-you card for those who supported you."
              />
            </p>
          </section>
        </button>
      </section>

      <section className="iscn">
        <header>
          <h3 className="title">
            <Translate id="publishToISCN" />
          </h3>

          <Switch
            checked={!!iscnPublish}
            onChange={() => {
              togglePublishISCN(!iscnPublish)
            }}
            loading={iscnPublishSaving}
          />
        </header>

        <p className="hint">
          <Translate id="publishToISCNHint_1" />
          <a href="https://iscn.io/" target="_blank">
            ISCN
          </a>
          <Translate id="publishToISCNHint_2" />
        </p>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleAccess
