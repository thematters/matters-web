import { useContext } from 'react'

import {
  Avatar,
  Button,
  ButtonProps,
  LoginButton,
  MigrationUploader,
  SignUpButton,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'

import { SIGNUP_TYPE } from '~/common/enums'
import IMAGE_STEP_1 from '~/static/images/migration-step-1.svg'
import IMAGE_STEP_2 from '~/static/images/migration-step-2.svg'
import IMAGE_STEP_3 from '~/static/images/migration-step-3.svg'

import styles from './styles.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    header: '三個步驟，立即搬家',
    title_1: '登錄帳號',
    content_1:
      '註冊或登入你的 Matters 帳號，加入自主、永續、有價的創作與公共討論空間。',
    sub_content_1: '還不是 Matters 創作者？',
    sub_content_2: '馬上入駐 →',
    title_2: '下載檔案',
    content_2: '前往 Medium 設定頁面導出你的作品，查收郵件並下載檔案。',
    title_3: '導入作品',
    content_3: '你無需守候在電腦旁，搬家完成後你會收到郵件通知，請你上站查看。'
  },
  zh_hans: {
    header: '三个步骤，立即搬家',
    title_1: '登录账号',
    content_1:
      '注册或登入你的 Matters 账号，加入自主、永续、有价的创作与公共讨论空间。',
    sub_content_1: '还不是 Matters 创作者？',
    sub_content_2: '马上入驻 →',
    title_2: '下载档案',
    content_2: '前往 Medium 设置页面导出你的作品，查收邮件并下载档案。',
    title_3: '导入作品',
    content_3: '你無需守候在電腦旁，搬家完成後你會收到郵件通知，請你上站查看。'
  }
}

const Step = ({
  children,
  src,
  step
}: {
  children: React.ReactNode
  src: string
  step: number
}) => {
  const { zh_hant, zh_hans } = texts
  const titleId = `title_${step}`
  const contentId = `content_${step}`

  return (
    <section className="step">
      <img src={src} />
      <p className="title">
        <span className="number">{step}.</span>
        <Translate zh_hant={zh_hant[titleId]} zh_hans={zh_hans[titleId]} />
      </p>
      <p className="content">
        <Translate zh_hant={zh_hant[contentId]} zh_hans={zh_hans[contentId]} />
      </p>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

const Steps = () => {
  const viewer = useContext(ViewerContext)
  const { zh_hant, zh_hans } = texts

  const buttonProps: ButtonProps = {
    size: ['7rem', '2.5rem'],
    spacing: [0, 0]
  }

  return (
    <section id="steps" className="steps-wrap">
      <section className="l-row header">
        <h2>
          <Translate zh_hant={zh_hant.header} zh_hans={zh_hans.header} />
        </h2>
      </section>

      <section className="l-row steps">
        <Step src={IMAGE_STEP_1} step={1}>
          {viewer.isAuthed ? (
            <section className="avatar">
              <Avatar size="lg" user={viewer.isInactive ? undefined : viewer} />
              <section className="info">
                <span className="username">{viewer.displayName}</span>
              </section>
            </section>
          ) : (
            <>
              <LoginButton
                bgColor="green"
                size={['7rem', '2.5rem']}
                spacing={[0, 0]}
                textSize="md"
              />
              <p className="sub-content">
                <Translate
                  zh_hant={zh_hant.sub_content_1}
                  zh_hans={zh_hans.sub_content_1}
                />
              </p>
              <SignUpButton
                bgColor={null}
                spacing={[0, 0]}
                textWeight="normal"
                trackType={SIGNUP_TYPE.GENERAL}
              >
                <Translate
                  zh_hant={zh_hant.sub_content_2}
                  zh_hans={zh_hans.sub_content_2}
                />
              </SignUpButton>
            </>
          )}
        </Step>

        <Step src={IMAGE_STEP_2} step={2}>
          <Button
            aria-haspopup="false"
            borderColor="green"
            href="https://medium.com/me/export"
            {...buttonProps}
          >
            <TextIcon color="green" size="md" weight="md">
              <Translate zh_hant={zh_hant.title_2} zh_hans={zh_hans.title_2} />
            </TextIcon>
          </Button>
        </Step>

        <Step src={IMAGE_STEP_3} step={3}>
          <MigrationUploader />
        </Step>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Steps
