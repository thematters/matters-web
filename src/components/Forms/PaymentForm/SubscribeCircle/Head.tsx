import IconCircleFeatureConnection from '@/public/static/icons/circle-feature-connection.svg'
import IconCircleFeatureDiscussion from '@/public/static/icons/circle-feature-discussion.svg'
import IconCircleFeatureReading from '@/public/static/icons/circle-feature-reading.svg'
import { formatAmount } from '~/common/utils'
import { CircleDigest, Icon, TextIcon, Translate } from '~/components'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
  InvitationState,
} from '~/gql/graphql'

import ConfirmTable from '../ConfirmTable'
import styles from './styles.module.css'

type HeadProps = {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
}

const Head: React.FC<HeadProps> = ({ circle }) => {
  const price = circle.prices && circle.prices[0]
  const invitation = circle.invitedBy

  if (!price) {
    return null
  }

  const isInvited = invitation && invitation.state === InvitationState.Pending

  return (
    <section className={styles.head}>
      <section className={styles.product}>
        <CircleDigest.Rich
          circle={circle}
          borderRadius="xtight"
          borderColor="lineGreyLight"
          hasFooter={false}
          hasDescription
          hasOwner
          disabled
        />
      </section>

      <ul className={styles.features}>
        <li>
          <TextIcon
            icon={<Icon icon={IconCircleFeatureReading} size={20} />}
            color="gold"
            size={15}
          >
            <Translate zh_hant="無限閱讀" zh_hans="无限阅读" />
          </TextIcon>
        </li>
        <li>
          <TextIcon
            icon={<Icon icon={IconCircleFeatureDiscussion} size={20} />}
            color="gold"
            size={15}
          >
            <Translate zh_hant="眾聊互動" zh_hans="众聊互动" />
          </TextIcon>
        </li>
        <li>
          <TextIcon
            icon={<Icon icon={IconCircleFeatureConnection} size={20} />}
            color="gold"
            size={15}
          >
            <Translate zh_hant="解鎖社群" zh_hans="解锁社群" />
          </TextIcon>
        </li>
      </ul>

      <ConfirmTable>
        <ConfirmTable.Row type="balance">
          <ConfirmTable.Col>
            <Translate zh_hant="每月費用" zh_hans="每月费用" />
          </ConfirmTable.Col>

          <ConfirmTable.Col>
            {price.currency} {formatAmount(price.amount)}
          </ConfirmTable.Col>
        </ConfirmTable.Row>

        {isInvited && (
          <>
            <ConfirmTable.Row type="balance">
              <ConfirmTable.Col>
                <Translate zh_hant="免費資格" zh_hans="免费资格" />
                {` ${invitation?.freePeriod} `}
                <Translate zh_hant="天" zh_hans="天" />
              </ConfirmTable.Col>

              <ConfirmTable.Col type="insufficient">
                - {price.currency} {formatAmount(price.amount)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row type="total">
              <ConfirmTable.Col>
                <Translate zh_hant="總金額" zh_hans="总金额" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {price.currency} {formatAmount(0)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </>
        )}
      </ConfirmTable>
    </section>
  )
}

export default Head
