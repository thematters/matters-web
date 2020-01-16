import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getConfig from 'next/config'
import { useState } from 'react'

import { getErrorCodes, useMutation } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Spinner } from '~/components/Spinner'

import { ADD_TOAST, TEXT } from '~/common/enums'

import { Migration } from './__generated__/Migration'
import { ViewerOAuthProviders } from './__generated__/ViewerOAuthProviders'
import styles from './styles.css'

type Provider = 'medium'

type Step = 'provider' | 'authentication' | 'import' | 'complete'

const VIEWER_OAUTH_PROVIDERS = gql`
  query ViewerOAuthProviders {
    viewer {
      id
      settings {
        oauthProviders
      }
    }
  }
`

const MIGRATION = gql`
  mutation Migration($provider: OAuthProvider!) {
    migration(input: { provider: $provider })
  }
`

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const SourceStep = ({
  setWindowRef,
  setStep,
  setProvider,
  provider
}: {
  setWindowRef: (windowRef: Window) => void
  setStep: (step: Step) => void
  setProvider: (provider: Provider) => void
  provider: Provider
}) => {
  const mediumCheckIcon =
    provider === 'medium' ? (
      <Icon.CheckActive size="sm" />
    ) : (
      <Icon.CheckInactive size="sm" />
    )

  return (
    <>
      <Modal.Content spacing="none" layout="full-width">
        <section className="container">
          <Translate
            zh_hant="點擊你想要一鍵搬家的網站："
            zh_hans="点击你想要一键搬家的网站："
          />
          <ul className="sources">
            <li onClick={() => setProvider('medium')}>
              {mediumCheckIcon}
              <span>Medium</span>
            </li>
          </ul>
        </section>
      </Modal.Content>
      <footer>
        <Modal.FooterButton
          width="full"
          onClick={() => {
            const url = `${OAUTH_URL}/medium`
            const windowRef = window.open(url, '_blank')

            if (windowRef) {
              setWindowRef(windowRef)
            }
            setStep('authentication')
          }}
        >
          <Translate
            zh_hant={TEXT.zh_hant.agreeAndContinue}
            zh_hans={TEXT.zh_hans.agreeAndContinue}
          />
        </Modal.FooterButton>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

const AuthenticationStep = ({
  windowRef,
  setStep,
  provider
}: {
  windowRef?: Window
  setStep: (step: Step) => void
  provider: Provider
}) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerOAuthProviders>(
    VIEWER_OAUTH_PROVIDERS,
    {
      pollInterval: polling ? 1000 : undefined,
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: !process.browser
    }
  )
  const oauthProviders: string[] = data?.viewer?.settings?.oauthProviders || []
  const hasMediumOAuth = oauthProviders.includes(provider)

  if (hasMediumOAuth) {
    setStep('import')

    if (windowRef) {
      setTimeout(() => {
        windowRef.close()
      }, 5000)
    }
    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <>
      <Modal.Content>
        <section>
          {!error && (
            <>
              <Spinner />
              <p>
                <Translate
                  zh_hant="請在新頁面完成身份認證，不要關閉本窗口"
                  zh_hans="请在新页面完成身份认证，不要关闭本窗口"
                />
              </p>
            </>
          )}
          {error && (
            <p>
              <Translate
                zh_hant="哎呀，設置失敗了。"
                zh_hans="哎呀，设置失败了。"
              />
            </p>
          )}
        </section>
      </Modal.Content>
      <footer>
        <Modal.FooterButton
          width="full"
          onClick={() => {
            if (windowRef) {
              windowRef.close()
            }
            setStep('provider')
          }}
        >
          <Translate
            zh_hant={TEXT.zh_hant.retry}
            zh_hans={TEXT.zh_hant.retry}
          />
        </Modal.FooterButton>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

const ImportStep = ({
  setStep,
  provider
}: {
  setStep: (step: Step) => void
  provider: Provider
}) => {
  const [migration] = useMutation<Migration>(MIGRATION)

  const executeMigration = async (event: any) => {
    event.stopPropagation()

    try {
      await migration({ variables: { input: { provider } } })
      setStep('complete')
    } catch (error) {
      const errorCode = getErrorCodes(error)[0]
      const errorMessage = (
        <Translate
          zh_hant={TEXT.zh_hant.error[errorCode] || errorCode}
          zh_hans={TEXT.zh_hans.error[errorCode] || errorCode}
        />
      )
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: errorMessage
          }
        })
      )
    }
  }

  return (
    <>
      <Modal.Content>
        <Translate
          zh_hant="已經完成身份認證，選擇「匯入作品」後，搬家就會馬上開始！"
          zh_hans="已經完成身份认证，选择「导入作品」后，搬家就会马上开始！"
        />
      </Modal.Content>
      <footer>
        <Modal.FooterButton width="full" onClick={executeMigration}>
          <Translate zh_hant="匯入作品" zh_hans="导入作品" />
        </Modal.FooterButton>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

const Complete = ({ close }: { close: () => void }) => {
  return (
    <>
      <Modal.Content>
        <Translate
          zh_hant="你無需守候在電腦旁，搬家完成後你會收到郵件通知。"
          zh_hans="你无需守候在电脑旁，搬家完成后你会收到邮件通知。"
        />
      </Modal.Content>
      <footer>
        <Modal.FooterButton width="full" onClick={() => close()}>
          <Translate
            zh_hant={TEXT.zh_hant.close}
            zh_hans={TEXT.zh_hans.close}
          />
        </Modal.FooterButton>
      </footer>
    </>
  )
}

const MigrationModal: React.FC<ModalInstanceProps> = ({ close, closeable }) => {
  const [step, setStep] = useState<Step>('provider')
  const [provider, setProvider] = useState<Provider>('medium')
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  return (
    <>
      {step === 'provider' && (
        <SourceStep
          setWindowRef={setWindowRef}
          setStep={setStep}
          setProvider={setProvider}
          provider={provider}
        />
      )}
      {step === 'authentication' && (
        <AuthenticationStep
          windowRef={windowRef}
          setStep={setStep}
          provider={provider}
        />
      )}
      {step === 'import' && (
        <ImportStep setStep={setStep} provider={provider} />
      )}
      {step === 'complete' && <Complete close={close} />}
    </>
  )
}

export default MigrationModal
