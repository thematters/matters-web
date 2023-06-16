import { useContext } from 'react'
import { useDisconnect } from 'wagmi'

import { maskAddress, translate } from '~/common/utils'
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

import styles from './styles.module.css'

const ReconnectButton = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { disconnect } = useDisconnect()

  return (
    <>
      <p className={styles.reconnectHint}>
        <Translate id="reconnectHint" />
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

      <Dialog.RoundedButton
        text={
          <Translate
            zh_hant="重新連接錢包"
            zh_hans="重新连接钱包"
            en="Reconnect Wallet"
          />
        }
        color="green"
        onClick={() => {
          disconnect()
        }}
      />
    </>
  )
}

export default ReconnectButton
