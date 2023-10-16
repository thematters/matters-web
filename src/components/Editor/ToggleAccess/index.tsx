import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

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

  contentSensitive?: boolean | null
  toggleContentSensitive: (contentSensitive: boolean) => void
  contentSensitiveSaving: boolean

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

  contentSensitive,
  toggleContentSensitive,
  contentSensitiveSaving,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  inSidebar,
}) => {
  const { lang } = useContext(LanguageContext)
  const content = draft ? draft : article

  return (
    <section className={inSidebar ? styles.inSidebar : ''}>
      {canToggleCircle && (
        <section className={styles.circle}>
          <section className={styles.switch}>
            <header className={styles.header}>
              <h3 className={styles.title}>
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
                      ? ArticleLicenseType.CcByNcNd_4
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
              bgColor="greyLighter"
              borderRadius="xtight"
              avatarSize="xl"
              textSize="mdS"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          )}
        </section>
      )}

      <section className={styles.license}>
        <h3 className={styles.title}>
          <Translate id="license" />
        </h3>

        <section className={styles.select}>
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

      <section className={styles.supportSetting}>
        <button type="button" onClick={onOpenSupportSetting}>
          <section className={styles.support}>
            <section className={styles.left}>
              <h3 className={styles.title}>
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

            <p className={styles.hint}>
              <Translate
                zh_hans="可自订号召支持的内容，以及收到支持后的感谢文字"
                zh_hant="可自訂號召支持的內容，以及收到支持後的感謝文字"
                en="Customize your call-to-support prompt to audience, or thank-you card for those who supported you."
              />
            </p>
          </section>
        </button>
      </section>

      <section className={styles.sensitive}>
        <header className={styles.header}>
          <h3 className={styles.title}>
            <Translate id="restrictedContent" />
          </h3>

          <Switch
            name="sensitive"
            label={translate({ id: 'restrictedContent', lang })}
            checked={!!contentSensitive}
            onChange={() => {
              toggleContentSensitive(!contentSensitive)
            }}
            loading={contentSensitiveSaving}
          />
        </header>

        <p className={styles.hint}>
          <FormattedMessage
            defaultMessage="Upon activation, the main text will be temporarily obscured, displaying only the title and summary. Readers can choose whether to continue reading. (Contains explicit content, violence, gore, etc.)"
            description="src/components/Editor/ToggleAccess/index.tsx"
          />
        </p>
      </section>

      <section className={styles.iscn}>
        <header className={styles.header}>
          <h3 className={styles.title}>
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

        <p className={styles.hint}>
          <Translate id="publishToISCNHint_1" />
          <a
            href="https://docs.like.co/v/zh/general-guides/writing-nft/nft-portal#publish-writing-nft-with-iscn-id"
            target="_blank"
            rel="noreferrer"
          >
            ISCN
          </a>
          <Translate id="publishToISCNHint_2" />
        </p>
      </section>
    </section>
  )
}

export default ToggleAccess
