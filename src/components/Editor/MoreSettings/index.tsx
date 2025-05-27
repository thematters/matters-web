import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import IconSquareChecked from '@/public/static/icons/square-checked.svg'
import { capitalizeFirstLetter } from '~/common/utils'
import { CircleDigest, Icon, Switch, ViewerContext } from '~/components'
import {
  ArticleAccessType,
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
  EditMetaDraftFragment,
} from '~/gql/graphql'

import ListItem from '../ListItem'
import SelectLicense from './SelectLicense'
import styles from './styles.module.css'

export type MoreSettingsProps = {
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
  article?: {
    replyToDonator?: string | null
    requestForDonation?: string | null
    canComment: boolean
  }
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

  theme?: 'sidebar' | 'bottomBar'
}

const MoreSettings: React.FC<MoreSettingsProps> = ({
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

  theme,
}) => {
  const intl = useIntl()
  const content = draft ? draft : article
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId

  return (
    <section
      className={classNames({
        [styles.container]: true,
        [styles[`theme${capitalizeFirstLetter(theme + '')}`]]: !!theme,
      })}
    >
      {canToggleCircle && (
        <section className={styles.circle}>
          <section className={styles.switch}>
            <header className={styles.header}>
              <h3 className={styles.title}>
                <FormattedMessage defaultMessage="Add to Circle" id="06XHBC" />
              </h3>

              <Switch
                name="circle"
                label={intl.formatMessage({
                  defaultMessage: 'Add to Circle',
                  id: '06XHBC',
                })}
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
              avatarSize={48}
              textSize={15}
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          )}
        </section>
      )}

      <section className={styles.license}>
        <h3 className={styles.title}>
          <FormattedMessage defaultMessage="License" id="HBxXD/" />
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
        {theme ? (
          <button type="button" onClick={onOpenSupportSetting}>
            <section className={styles.support}>
              <section className={styles.left}>
                <h3 className={styles.title}>
                  <FormattedMessage
                    defaultMessage="Support Setting"
                    id="5IS+ui"
                  />
                </h3>

                {content &&
                (content.replyToDonator || content.requestForDonation) ? (
                  <Icon icon={IconSquareChecked} size={24} />
                ) : (
                  <Icon icon={IconRight} color="grey" />
                )}
              </section>

              <p className={styles.hint}>
                <FormattedMessage
                  defaultMessage="Customize your call-to-support prompt to audience, or thank-you card for those who supported you."
                  id="DUvMii"
                />
              </p>
            </section>
          </button>
        ) : (
          <ListItem
            title={
              <FormattedMessage defaultMessage="Support Setting" id="5IS+ui" />
            }
            subTitle={
              <FormattedMessage
                defaultMessage="Customize your call-to-support prompt to audience, or thank-you card for those who supported you."
                id="DUvMii"
              />
            }
            hint
            onClick={onOpenSupportSetting}
          >
            <ListItem.ArrowIndicator
              checked={
                !!(
                  content &&
                  (content.replyToDonator || content.requestForDonation)
                )
              }
            />
          </ListItem>
        )}
      </section>

      <section className={styles.sensitive}>
        <header className={styles.header}>
          <h3 className={styles.title}>
            <FormattedMessage defaultMessage="Restricted content" id="d5+b8r" />
          </h3>

          <Switch
            name="sensitive"
            label={intl.formatMessage({
              defaultMessage: 'Restricted content',
              id: 'd5+b8r',
            })}
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
            id="HwaiSE"
          />
        </p>
      </section>

      {likerId && (
        <section className={styles.iscn}>
          <header className={styles.header}>
            <h3 className={styles.title}>
              <FormattedMessage
                defaultMessage="Register for ISCN"
                id="SuRTsQ"
              />
            </h3>

            <Switch
              name="iscn"
              label={intl.formatMessage({
                defaultMessage: 'Register for ISCN',
                id: 'SuRTsQ',
              })}
              checked={!!iscnPublish}
              onChange={() => {
                togglePublishISCN(!iscnPublish)
              }}
              loading={iscnPublishSaving}
            />
          </header>

          <p className={styles.hint}>
            <FormattedMessage
              defaultMessage="Registering ISCN allows you to publish Writing NFT. The cost of "
              id="2qbSh8"
            />
            <a
              href="https://docs.like.co/v/zh/general-guides/writing-nft/nft-portal#publish-writing-nft-with-iscn-id"
              target="_blank"
              rel="noreferrer"
            >
              ISCN
            </a>
            <FormattedMessage
              defaultMessage=" registration is about 1 LIKE. During promotion period it is sponsored by Matters.News."
              id="Kwv1n3"
            />
          </p>
        </section>
      )}
    </section>
  )
}

export default MoreSettings
