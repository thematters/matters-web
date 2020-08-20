import { Dialog, Translate } from '~/components'

import { PATHS } from '~/common/enums'

interface Props {
  close: () => void
}

const Complete: React.FC<Props> = ({ close }) => {
  return (
    <>
      <Dialog.Message spacing="md">
        <p>
          <Translate
            zh_hant="感謝你對 Matters 社區的信任與支持。"
            zh_hans="感谢你对 Matters 社区的信任与支持。"
          />
          <br />
          <Translate
            zh_hant="提現經由 Stripe 完成，"
            zh_hans="提现经由 Stripe 完成，"
          />
          <br />
          <Translate
            zh_hant="請留意發卡銀行處理進度。"
            zh_hans="请留意发卡银行处理进度。"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer block>
        <Dialog.Footer.Button
          type="button"
          bgColor="green"
          href={PATHS.ME_WALLET_TRANSACTIONS}
        >
          <Translate zh_hant="查看交易" zh_hans="查看交易" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          type="button"
          bgColor="grey-lighter"
          textColor="black"
          onClick={close}
        >
          <Translate zh_hant="完成交易" zh_hans="完成交易" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
