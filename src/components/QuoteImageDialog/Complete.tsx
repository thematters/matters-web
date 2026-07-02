import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import { toPath } from '~/common/utils'
import { Dialog, Icon, LanguageContext } from '~/components'
import { UserLanguage } from '~/gql/graphql'

import { QuoteWallCampaign } from './gql'
import styles from './styles.module.css'

interface CompleteProps {
  campaign?: QuoteWallCampaign | null
  closeDialog: () => void
}

/**
 * 上牆成功後的對話框內容（取代原本的 toast）：
 * 打勾 + 提示 +「前往活動頁」主按鈕，讓使用者貼完金句可直接回到該期活動頁。
 */
const Complete: React.FC<CompleteProps> = ({ campaign, closeDialog }) => {
  const { lang } = useContext(LanguageContext)

  const campaignName = campaign
    ? lang === UserLanguage.En
      ? campaign.nameEn
      : lang === UserLanguage.ZhHans
        ? campaign.nameZhHans
        : campaign.nameZhHant
    : null

  const campaignPath = campaign
    ? toPath({ page: 'campaignDetail', campaign }).href
    : null

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Posted to the quote wall" id="IWLb33" />
        }
      />

      <Dialog.Content>
        <section className={styles.complete}>
          <Icon icon={IconCircleCheckFill} size={40} color="green" />
          <p className={styles.completeHint}>
            {campaignName ? (
              <FormattedMessage
                defaultMessage="Your quote is now on the wall of “{name}”."
                id="GpR55j"
                values={{ name: campaignName }}
              />
            ) : (
              <FormattedMessage
                defaultMessage="Your quote is now on the quote wall."
                id="GGd44x"
              />
            )}
          </p>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            {campaignPath && (
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Go to the event page"
                    id="D0pP8T"
                  />
                }
                color="green"
                htmlHref={campaignPath}
              />
            )}
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            {campaignPath && (
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Go to the event page"
                    id="D0pP8T"
                  />
                }
                color="green"
                htmlHref={campaignPath}
              />
            )}
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
      />
    </>
  )
}

export default Complete
