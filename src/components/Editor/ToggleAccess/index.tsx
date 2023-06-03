import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  CircleDigest,
  IconArrowRight16,
  IconChecked32,
  LanguageContext,
  Switch,
  Translate,
} from '~/components'
import {
  ArticleAccessType,
  ArticleDetailPublicQuery,
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
} from '~/gql/graphql'

import SelectLicense from './SelectLicense'
import styles from './styles.module.css'

export type ToggleAccessProps = {
  circle?: DigestRichCirclePublicFragment | null
  accessType: ArticleAccessType
  license: ArticleLicenseType

  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => any

  accessSaving: boolean
  canToggleCircle: boolean

  draft?: EditMetaDraftFragment
  article?: ArticleDetailPublicQuery['article']
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
  const { lang } = useContext(LanguageContext)
  const content = draft ? draft : article

  return (
    <section className={inSidebar ? 'inSidebar' : ''}>
      {canToggleCircle && (
        <section className={styles['circle']}>
          <section className={styles['switch']}>
            <header>
              <h3 className={styles.h3}>
                <Translate id="addToCircle" />
              </h3>

              <Switch
                name="circle"
                label={translate({ id: 'addToCircle', lang })}
                checked={!!circle}
                onChange={() =>
                  editAccess(
                    !circle,
                    false,
                    circle && license === ArticleLicenseType.Arr
                      ? ArticleLicenseType.CcByNcNd_2
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

      <section className={styles['widget']}>
        <h3>
          <Translate id="license" />
        </h3>

        <section className={styles['license']}>
          <SelectLicense
            isInCircle={!!circle}
            license={license}
            onChange={(newLicense) =>
              editAccess(
                !!circle,
                !!circle && newLicense === ArticleLicenseType.Arr,
                newLicense
              )
            }
          />
        </section>
      </section>

      <section className={styles['support-setting']}>
        <button type="button" onClick={onOpenSupportSetting}>
          <section className={styles['support']}>
            <section className={styles['left']}>
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
            <p className={styles['hint']}>
              <Translate
                zh_hans="可自订号召支持的内容，以及收到支持后的感谢文字"
                zh_hant="可自訂號召支持的內容，以及收到支持後的感謝文字"
                en="Customize your call-to-support prompt to audience, or thank-you card for those who supported you."
              />
            </p>
          </section>
        </button>
      </section>

      <section className={styles['iscn']}>
        <header>
          <h3 className={styles['title']}>
            <Translate id="publishToISCN" />
          </h3>

          <Switch
            name="iscn"
            label={translate({ id: 'publishToISCN', lang })}
            checked={!!iscnPublish}
            onChange={() => {
              togglePublishISCN(!iscnPublish)
            }}
            loading={iscnPublishSaving}
          />
        </header>

        <p className={styles['hint']}>
          <Translate id="publishToISCNHint_1" />
          <a href="https://iscn.io/" target="_blank" rel="noreferrer">
            ISCN
          </a>
          <Translate id="publishToISCNHint_2" />
        </p>
      </section>
    </section>
  )
}

export default ToggleAccess
