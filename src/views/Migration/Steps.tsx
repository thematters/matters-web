import { useContext } from 'react'

import {
  Avatar,
  Button,
  ButtonProps,
  LoginButton,
  MigrationDialog,
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
    title_1: '登入帳戶',
    content_1: '註冊或登入你的 Matters 帳戶，開啟你的個人創作空間站。',
    sub_content_1_1: '還不是 Matters 創作者？',
    sub_content_1_2: '馬上入駐 →',
    title_2: '預備檔案',
    content_2:
      '前往 Medium 設置頁面下載檔案，解壓並找到其中 HTML 格式的作品檔案。',
    sub_content_2_1: '下載檔案',
    title_3: '匯入作品',
    content_3: '選中想要搬家的作品檔案並上傳，搬家成功的作品會匯入你的草稿箱。'
  },
  zh_hans: {
    header: '三个步骤，立即搬家',
    title_1: '登陆帐户',
    content_1: '注册或登入你的 Matters 帐户，开启你的个人创作空间站。',
    sub_content_1_1: '还不是 Matters 创作者？',
    sub_content_1_2: '马上入驻 →',
    title_2: '准备文档',
    content_2:
      '前往 Medium 设置页面下载文档，解压并找到其中 HTML 格式的作品文件。',
    sub_content_2_1: '下载文档',
    title_3: '导入作品',
    content_3: '选中想要搬家的作品文件并上传，搬家成功的作品会导入你的草稿箱。'
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
                iconSize="md"
                size={['7rem', '2.5rem']}
                spacing={[0, 0]}
              />
              <p className="sub-content">
                <Translate
                  zh_hant={zh_hant.sub_content_1_1}
                  zh_hans={zh_hans.sub_content_1_1}
                />
              </p>
              <section className="sub-content-link">
                <SignUpButton trackType={SIGNUP_TYPE.GENERAL} isPlain>
                  <Translate
                    zh_hant={zh_hant.sub_content_1_2}
                    zh_hans={zh_hans.sub_content_1_2}
                  />
                </SignUpButton>
              </section>
            </>
          )}
        </Step>

        <Step src={IMAGE_STEP_2} step={2}>
          <Button
            aria-haspopup="false"
            borderColor="green"
            href="https://medium.com/me/export"
            target="_blank"
            {...buttonProps}
          >
            <TextIcon color="green" size="md" weight="md">
              <Translate
                zh_hant={zh_hant.sub_content_2_1}
                zh_hans={zh_hans.sub_content_2_1}
              />
            </TextIcon>
          </Button>
        </Step>

        <Step src={IMAGE_STEP_3} step={3}>
          <MigrationDialog>
            {({ open }) => (
              <Button
                aria-haspopup="true"
                bgColor="green"
                size={['7rem', '2.5rem']}
                spacing={[0, 0]}
                onClick={open}
              >
                <TextIcon color="white" size="md" weight="md">
                  <Translate
                    zh_hant={zh_hant.title_3}
                    zh_hans={zh_hans.title_3}
                  />
                </TextIcon>
              </Button>
            )}
          </MigrationDialog>
        </Step>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Steps
