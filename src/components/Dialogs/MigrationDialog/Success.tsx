import { Dialog, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    content_1: '搬家已經開始！',
    content_2: '你無需守候在電腦旁，搬家完成後你會收到郵件通知，請你上站檢視。',
    back: '返回首頁'
  },
  zh_hans: {
    content_1: '搬家已经开始！',
    content_2: '你无需守候在电脑旁，搬家完成后你会收到邮件通知，请你上站查看。',
    back: '返回首页'
  }
}

const MigrationDialogSuccess = () => {
  const { zh_hant, zh_hans } = texts

  return (
    <>
      <Dialog.Content spacing={['base', 'base']}>
        <p className="action">
          <Translate
            zh_hant={zh_hant.content_1}
            zh_hans={zh_hans.content_1}
          />
        </p>
        <p className="description">
          <Translate
            zh_hant={zh_hant.content_2}
            zh_hans={zh_hans.content_2}
          />
        </p>
      </Dialog.Content>
      <Dialog.Footer>
        <Dialog.Footer.Button href={PATHS.HOME.href} as={PATHS.HOME.as}>
          <Translate zh_hant={zh_hant.back} zh_hans={zh_hans.back} />
        </Dialog.Footer.Button>
      </Dialog.Footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default MigrationDialogSuccess
