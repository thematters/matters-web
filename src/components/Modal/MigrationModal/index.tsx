import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getConfig from 'next/config'
import { useState } from 'react'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Spinner } from '~/components/Spinner'

import { TEXT } from '~/common/enums'
import ICON_CHECK_ACTIVE from '~/static/icons/checkbox-check-active.svg?sprite'
import ICON_CHECK_INACTIVE from '~/static/icons/checkbox-check-inactive.svg?sprite'

import { ViewerOAuthProviders } from './__generated__/ViewerOAuthProviders'
import styles from './styles.css'

type Source = 'medium'

type Step = 'source' | 'authentication' | 'import' | 'complete'

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

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const SourceStep = ({
  setWindowRef,
  setStep,
  setSource,
  source
}: {
  setWindowRef: (windowRef: Window) => void
  setStep: (step: Step) => void
  setSource: (source: Source) => void
  source: Source
}) => {
  const mediumCheckIcon =
    source === 'medium' ? ICON_CHECK_ACTIVE : ICON_CHECK_INACTIVE

  return (
    <>
      <Modal.Content spacing="none" layout="full-width">
        <section className="container">
          <Translate
            zh_hant="點擊你想要一鍵搬家的網站："
            zh_hans="点击你想要一键搬家的网站："
          />
          <ul className="sources">
            <li onClick={() => setSource('medium')}>
              <Icon
                id={mediumCheckIcon.id}
                viewBox={mediumCheckIcon.viewBox}
                size="small"
              />
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
  setStep
}: {
  windowRef?: Window
  setStep: (step: Step) => void
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
  const hasMediumOAuth = oauthProviders.includes('medium')

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
            setStep('source')
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

const ImportStep = ({ setStep }: { setStep: (step: Step) => void }) => {
  return (
    <>
      <Modal.Content>
        <Translate
          zh_hant="已經完成身份認證，選擇「匯入作品」後，搬家就會馬上開始！"
          zh_hans="已經完成身份认证，选择「导入作品」后，搬家就会马上开始！"
        />
      </Modal.Content>
      <footer>
        <Modal.FooterButton
          width="full"
          onClick={() => {
            setStep('complete')
          }}
        >
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
  const [step, setStep] = useState<Step>('source')
  const [source, setSource] = useState<Source>('medium')
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  return (
    <>
      {step === 'source' && (
        <SourceStep
          setWindowRef={setWindowRef}
          setStep={setStep}
          setSource={setSource}
          source={source}
        />
      )}
      {step === 'authentication' && (
        <AuthenticationStep windowRef={windowRef} setStep={setStep} />
      )}
      {step === 'import' && <ImportStep setStep={setStep} />}
      {step === 'complete' && <Complete close={close} />}
    </>
  )
}

export default MigrationModal
