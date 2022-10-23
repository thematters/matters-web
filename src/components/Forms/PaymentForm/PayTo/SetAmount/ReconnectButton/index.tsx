import { useContext } from 'react'
import { useDisconnect } from 'wagmi'

import {
  Button,
  CopyToClipboard,
  Dialog,
  IconCopy16,
  LanguageContext,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { maskAddress, translate } from '~/common/utils'

import styles from './styles.css'

const ReconnectButton = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { disconnect } = useDisconnect()

  return (
    <>
      <p className="reconnect-hint">
        <Translate
          zh_hant="當前錢包地址與帳戶綁定不同，若要變更請直接操作錢包或重新連接為："
          zh_hans="当前钱包地址与帐户绑定不同，若要变更请直接操作钱包或重新连接为："
          en="The wallet address is not the one you bound to account. Please switch it in the wallet or reconnect as: "
        />
        <CopyToClipboard text={viewer.info.ethAddress || ''}>
          <Button
            spacing={['xtight', 'xtight']}
            aria-label={translate({ id: 'copy', lang })}
          >
            <TextIcon
              icon={<IconCopy16 color="black" size="xs" />}
              color="black"
              textPlacement="left"
            >
              {maskAddress(viewer.info.ethAddress || '')}
            </TextIcon>
          </Button>
        </CopyToClipboard>
      </p>

      <Dialog.Footer.Button
        bgColor="green"
        textColor="white"
        onClick={() => {
          disconnect()
        }}
      >
        <Translate
          zh_hant="重新連接錢包"
          zh_hans="重新连接钱包"
          en="Reconnect Wallet"
        />
      </Dialog.Footer.Button>

      <style jsx>{styles}</style>
    </>
  )
}

export default ReconnectButton
