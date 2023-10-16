import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { GUIDE_LINKS } from '~/common/enums'
import {
  Dialog,
  LanguageContext,
  Translate,
  useDialogSwitch,
} from '~/components'

interface WhyPolygonDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const WhyPolygonDialog = ({ children }: WhyPolygonDialogProps) => {
  const { lang } = useContext(LanguageContext)

  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const closeDialog = () => {
    baseCloseDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant="為什麼先採用 Polygon？"
              zh_hans="为什么先采用 Polygon ?"
              en="Why Polygon?"
            />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Understood" />}
        />

        <Dialog.Message align="left" smUpAlign="left">
          <ol>
            <li>
              <Translate
                zh_hant="在區塊鏈上操作需支付手續費，若在以太坊上進行交易，手續費高昂且波動劇烈。為了讓支持更方便且費用低廉，Matters 先採用 Polygon 網絡，讓你能更輕鬆地支持創作者"
                zh_hans="在区块链上操作需支付手续费，若在以太坊上进行交易，手续费高昂且波动剧烈。为了让支持更方便且费用低廉，Matters 先采用 Polygon 网络，让你能更轻松地支持创作者"
                en="Operating on the blockchain requires gas fees, which can be high on the Ethereum. To make Support easier and with lower transaction fees, Matters.News started with the Polygon network."
              />
            </li>
            <li>
              <Translate
                zh_hant="Polygon (先前為 Matic Network) 是獨立運行的區塊鏈，若你在其他鏈上已有 USDT 貨幣，需將它們移轉到 Polygon 網絡中才能使用，細節參考 "
                zh_hans="Polygon (先前为 Matic Network) 是独立运行的区块链，若你在其他链上已有 USDT 货币，需将它们移转到 Polygon 网络中才能使用，细节参考 "
                en="Polygon (Matic Network) is a standalone blockchain. If you have USDT on other chains, you will need to transfer them to the Polygon network. See details in the "
              />
              <a
                className="u-link-green"
                href={GUIDE_LINKS.payment[lang]}
                target="_blank"
                rel="noreferrer"
              >
                <Translate
                  zh_hant="教學指南"
                  zh_hans="教学指南"
                  en="tutorial"
                />
              </a>
              <Translate zh_hant="" zh_hans="" en="." />
            </li>
            <li>
              <Translate
                zh_hant="Matters 將有計畫地兼容其他區塊鏈，屆時將有更多的選擇來支持創作者"
                zh_hans="Matters 将有计划地兼容其他区块链，届时将有更多的选择来支持创作者"
                en="Matters.News will gradually access more blockchain networks, so there will be more options to support creators."
              />
            </li>
          </ol>
        </Dialog.Message>

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Understood" />}
              color="green"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyWhyPolygonDialog = (props: WhyPolygonDialogProps) => (
  <Dialog.Lazy mounted={<WhyPolygonDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyWhyPolygonDialog
