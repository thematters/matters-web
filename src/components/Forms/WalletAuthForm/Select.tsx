import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import React, { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Form,
  IconMetaMask24,
  IconSpinner16,
  IconWalletConnect24,
  LanguageContext,
  Layout,
  Spacer,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { WalletConnector } from '~/common/enums'
import {
  analytics,
  getWalletErrorMessage,
  translate,
  walletConnectors,
} from '~/common/utils'

import styles from './styles.css'

export interface FormProps {
  type?: 'connect' | 'auth'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
  back?: () => void
}

const Desc = {
  section1: {
    zh_hant:
      'Matters 將提供更多創作與區塊鏈結合的服務，接入錢包後即可在未來第一時間體驗新功能。',
    zh_hans:
      'Matters 将提供更多创作与区块链结合的服务，接入钱包后即可在未来第一时间体验新功能。',
    en:
      'Matters continues to provide services that combine creativity with blockchain ' +
      'technology. You will be the first to experience them after completing connecting wallet.',
  },
  section2: {
    zh_hant: '錢包地址將作為身份識別之一在個人頁公開顯示。',
    zh_hans: '钱包地址将作为身份识别之一在个人页公开显示。',
    en: 'Wallet address will be part of your digital identity and shown in your profile page.',
  },
  section3: {
    zh_hant:
      '原有透過電子信箱登入方式將為你保留。為維護你的帳戶安全，加密錢包連接後無法重設。',
    zh_hans:
      '原有透过电子信箱登入方式将为你保留。为维护你的帐户安全，加密钱包连接后无法重设。',
    en:
      'The original login via email will be kept for you. Please note that your wallet ' +
      'cannot be reset once it is connected because of your account security.',
  },
  section4: {
    zh_hant: 'Matters 不會透過任何渠道主動詢問你的錢包私鑰。',
    zh_hans: 'Matters 不会透过任何渠道主动询问你的钱包私钥。',
    en: 'Matters will never ask your wallet key through any channel.',
  },
}

const Select: React.FC<FormProps> = ({
  type,
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const formId = 'wallet-auth-select-form'
  const fieldMsgId = 'wall-auth-select-msg'
  const isInPage = purpose === 'page'
  const isConnect = type === 'connect'

  const { activate, connector, account, error } =
    useWeb3React<EthersWeb3Provider>()

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  const isMetaMaskLoading = activatingConnector === connectorMetaMask
  const isWalletConnectLoading = activatingConnector === connectorWalletConnect

  useEffect(() => {
    if (!account || !activatingConnector) return

    submitCallback()
  }, [account])

  const onClickMetaMask = () => {
    if (connector === connectorMetaMask && account) {
      submitCallback()
    }

    analytics.trackEvent('click_button', { type: 'connectorMetaMask' })
    setActivatingConnector(connectorMetaMask)
    activate(connectorMetaMask)
  }
  const onClickWalletConnect = () => {
    if (connector === connectorWalletConnect && account) {
      submitCallback()
    }

    analytics.trackEvent('click_button', { type: 'connectorWalletConnect' })
    setActivatingConnector(connectorWalletConnect)
    activate(connectorWalletConnect)
  }

  const Intro = () => {
    if (!isConnect) return null

    return (
      <Dialog.Message align="left">
        <ul>
          <li>
            <Translate {...Desc.section1} />
          </li>
          <li>
            <Translate {...Desc.section2} />
          </li>
          <li>
            <Translate {...Desc.section3} />
          </li>
          <li>
            <Translate {...Desc.section4} />
          </li>
        </ul>
      </Dialog.Message>
    )
  }

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      {isConnect && (
        <Form.List
          groupName={<Translate zh_hant="帳戶" zh_hans="帳戶" en="Account" />}
        >
          <Form.List.Item title="Matters ID" rightText={viewer.userName} />
        </Form.List>
      )}

      <Form.List
        groupName={
          <Translate
            zh_hans="连接加密钱包"
            zh_hant="連接加密錢包"
            en="Connect Wallet"
          />
        }
      >
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
          onClick={onClickMetaMask}
          right={isMetaMaskLoading ? <IconSpinner16 color="grey" /> : null}
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
          onClick={onClickWalletConnect}
          right={isWalletConnectLoading ? <IconSpinner16 color="grey" /> : null}
        />
      </Form.List>

      {(error || activatingConnector) && (
        <section className="msg">
          <Form.Field>
            <Form.Field.Footer
              fieldMsgId={fieldMsgId}
              hint={
                activatingConnector
                  ? translate({
                      lang,
                      zh_hant: '請打開你的錢包完成連接操作',
                      zh_hans: '请打开你的钱包完成连接操作',
                      en: 'Please confirm the connection in your wallet.',
                    })
                  : undefined
              }
              error={error ? getWalletErrorMessage({ error, lang }) : undefined}
            />
          </Form.Field>
          <style jsx>{styles}</style>
        </section>
      )}
    </Form>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton onClick={back} />}
          right={
            <Layout.Header.Title
              id={isConnect ? 'loginWithWallet' : 'authEntries'}
            />
          }
        />

        <Intro />

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          leftButton={back ? <Dialog.Header.BackButton onClick={back} /> : null}
          title={
            <Translate id={isConnect ? 'loginWithWallet' : 'authEntries'} />
          }
          closeDialog={closeDialog}
        />
      )}

      <Dialog.Content hasGrow>
        <Intro />

        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
    </>
  )
}

export default Select
