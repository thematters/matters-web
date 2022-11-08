import React, { useContext, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

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
  useResponsive,
  ViewerContext,
} from '~/components'

import { GUIDE_LINKS } from '~/common/enums'
import { analytics } from '~/common/utils'

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

const Hint = () => {
  const { lang } = useContext(LanguageContext)
  const isSmallUp = useResponsive('sm-up')

  if (isSmallUp) {
    return (
      <p>
        <Translate
          zh_hant="剛接觸加密錢包？參考 "
          zh_hans="刚接触加密钱包？参考 "
          en="Don't have a wallet yet? Check the "
        />
        <a
          className="u-link-green"
          href={GUIDE_LINKS.connectWallet[lang]}
          target="_blank"
        >
          <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
        </a>
        <Translate zh_hant="" zh_hans="" en="." />
      </p>
    )
  }

  return (
    <p>
      <Translate
        zh_hant="在行動裝置上使用問題，參考 "
        zh_hans="在行动装置上使用问题，参考"
        en="Have wallet questions on mobile device ? Click the "
      />
      <a
        className="u-link-green"
        href={GUIDE_LINKS.mobilePayment[lang]}
        target="_blank"
      >
        <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
      </a>
      <Translate zh_hant="" zh_hans="" en="." />
    </p>
  )
}

const Select: React.FC<FormProps> = ({
  type,
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const viewer = useContext(ViewerContext)

  const formId = 'wallet-auth-select-form'
  const fieldMsgId = 'wall-auth-select-msg'
  const isInPage = purpose === 'page'
  const isConnect = type === 'connect'

  const { disconnect } = useDisconnect()
  const {
    connectors,
    connect,
    error: connectError,
    pendingConnector,
  } = useConnect()
  const { address: account, isConnecting } = useAccount()
  const errorMessage = connectError?.message

  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const walletConnectConnector = connectors.find(
    (c) => c.id === 'walletConnect'
  )
  const isMetaMaskLoading =
    isConnecting && pendingConnector?.id === injectedConnector?.id
  const isWalletConnectLoading =
    isConnecting && pendingConnector?.id === walletConnectConnector?.id

  // auto switch to next step if account is connected
  useEffect(() => {
    if (!account) return

    submitCallback()
  }, [account])

  // disconnect before go back to previous step
  const onBack = () => {
    disconnect()

    if (back) {
      back()
    }
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
            <strong>
              <Translate {...Desc.section2} />
            </strong>
          </li>
          <li>
            <Translate {...Desc.section3} />
          </li>
          <li>
            <strong>
              <Translate {...Desc.section4} />
            </strong>
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

      <Form.List groupName={<Translate id="connectWallet" />}>
        {injectedConnector?.ready && (
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
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'connectorMetaMask',
              })
              connect({ connector: injectedConnector })
            }}
            right={isMetaMaskLoading ? <IconSpinner16 color="grey" /> : null}
          />
        )}
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
            connect({ connector: walletConnectConnector })
          }}
          right={isWalletConnectLoading ? <IconSpinner16 color="grey" /> : null}
        />
      </Form.List>

      <section className="msg">
        <Form.Field.Footer
          fieldMsgId={fieldMsgId}
          hint={errorMessage ? undefined : <Hint />}
          error={errorMessage}
        />

        <style jsx>{styles}</style>
      </section>
    </Form>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton onClick={onBack} />}
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
          leftButton={
            back ? <Dialog.Header.BackButton onClick={onBack} /> : null
          }
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
