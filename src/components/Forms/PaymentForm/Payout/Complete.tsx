import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, Translate } from '~/components'

interface Props {
  closeDialog: () => void
}

const Complete: React.FC<Props> = ({ closeDialog }) => {
  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="The withdrawal process has started."
            id="ucxFlV"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <Translate
              zh_hant="感謝你對 Matters 社區的信任與支持。"
              zh_hans="感谢你对 Matters 社区的信任与支持。"
              en="Thank you for your support and trust in the Matters community."
            />
            <br />
            <Translate
              zh_hant="提現經由 Stripe 完成，"
              zh_hans="提现经由 Stripe 完成，"
              en="Payout is processed via Stripe,"
            />
            <br />
            <Translate
              zh_hant="請留意發卡銀行處理進度。"
              zh_hans="请留意发卡银行处理进度。"
              en="please refer to your bank for payout progress."
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        closeDialog={closeDialog}
        closeText={
          <Translate
            zh_hant="完成交易"
            zh_hans="完成交易"
            en="Complete Transaction"
          />
        }
        btns={
          <Dialog.RoundedButton
            text={
              <Translate
                zh_hant="查看交易"
                zh_hans="查看交易"
                en="View Tansaction"
              />
            }
            href={PATHS.ME_WALLET_TRANSACTIONS}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <Translate
                zh_hant="查看交易"
                zh_hans="查看交易"
                en="View Tansaction"
              />
            }
            href={PATHS.ME_WALLET_TRANSACTIONS}
          />
        }
      />
    </>
  )
}

export default Complete
