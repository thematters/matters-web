import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React, { useContext, useEffect } from 'react'

import {
  Dialog,
  Form,
  IconMetaMask24,
  IconWalletConnect24,
  Spacer,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { WalletConnector } from '~/common/enums'
import { analytics, walletConnectors } from '~/common/utils'

import styles from './styles.css'

export interface ConnectWalletFormProps {
  type?: 'connectForSetting' | 'loginSignUp'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

const Desc = {
  section1: {
    zh_hant:
      'Matters 除了持續打造更好的創作環境，也計畫提供更多創作與區塊鏈結合的服務，完成設定後即可在未來第一時間參與。',
    zh_hans:
      'Matters 除了持续打造更好的创作环境，也计划提供更多创作与区块链结合的服务，完成设置后即可在未来第一时间参与。',
    en:
      'Matters continues to create a better environment for creating and provide services that combine creativity with blockchain ' +
      'technology. You will be the first to experience them after completing connecting wallet.',
  },
  section2: {
    zh_hant:
      '曾登記加密錢包參與 Traveloggers 活動的朋友，若想利用加密錢包登入也需完成設定才能啟用。' +
      '完成後，若設定的地址擁有 Traveloggers，個人頁與頭像將顯示相關徽章與裝飾。',
    zh_hans:
      '曾登记加密钱包参与 Traveloggers 活动的朋友，若想利用加密钱包登入也需完成设定才能启用。' +
      '完成后，若设定的地址拥有 Traveloggers，个人页与头像将显示相关徽章与装饰。',
    en:
      'For those who have registered your wallet via Traveloggers, you need to complete this setting to enable it if you want to ' +
      'log in with your wallet. Once set up, your account page and avatar will display Traveloggers’ relevant badge and decoration if ' +
      'the address connected has Traveloggers.',
  },
  section3: {
    zh_hant:
      '原有透過電子信箱登入方式將為你保留。為維護你的帳戶安全，加密錢包連接後無法重設。另外，Matters 不會透過任何渠道主動詢問你的錢包私鑰。',
    zh_hans:
      '原有透过电子信箱登入方式将为你保留。为维护你的帐户安全，加密钱包连接后无法重设。另外，Matters 不会透过任何渠道主动询问你的钱包私钥。',
    en:
      'The original login via email will be kept for you. Please note that your wallet cannot be reset once it is connected because of your ' +
      'account security. In addition, Matters will never ask your wallet key through any channel.',
  },
}

const ConnectWallet: React.FC<ConnectWalletFormProps> = ({
  type,
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const formId = 'login-sign-up-connect-wallet-form'

  const viewer = useContext(ViewerContext)
  const { activate, connector } = useWeb3React<ethers.providers.Web3Provider>()

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const isConnectForSetting = type === 'connectForSetting'

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      {isConnectForSetting && (
        <Form.List
          groupName={<Translate zh_hant="帳戶" zh_hans="帳戶" en="Account" />}
        >
          <Form.List.Item title="Matters ID" rightText={viewer.userName} />
        </Form.List>
      )}

      <Form.List groupName={<Translate id="connectWallet" />}>
        <Form.List.Item
          title={
            <TextIcon
              color="black"
              icon={<IconMetaMask24 size="md" />}
              size="md"
              spacing="xtight"
            >
              MetaMask
            </TextIcon>
          }
          onClick={async () => {
            analytics.trackEvent('click_button', {
              type: 'connectorMetaMask',
            })
            setActivatingConnector(connectorMetaMask)
            activate(connectorMetaMask)
            submitCallback()
          }}
        />
        <Form.List.Item
          title={
            <TextIcon
              color="black"
              icon={<IconWalletConnect24 size="md" />}
              size="md"
              spacing="xtight"
            >
              WalletConnect
            </TextIcon>
          }
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            setActivatingConnector(connectorWalletConnect)
            activate(connectorWalletConnect)
            submitCallback()
          }}
        />
      </Form.List>
    </Form>
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title={
            isConnectForSetting ? (
              <Translate
                zh_hant="使用加密錢包登入"
                zh_hans="使用加密钱包登入"
                en="Connect Wallet"
              />
            ) : (
              'loginSignUp'
            )
          }
          closeDialog={closeDialog}
        />
      )}

      <Dialog.Content hasGrow>
        {isConnectForSetting && (
          <Dialog.Message>
            <ul className="connectWalletDesc">
              <li>
                <Translate {...Desc.section1} />
              </li>
              <li>
                <Translate {...Desc.section2} />
              </li>
              <li>
                <Translate {...Desc.section3} />
              </li>
            </ul>
          </Dialog.Message>
        )}

        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
      <style jsx>{styles}</style>
    </>
  )
}

export default ConnectWallet
