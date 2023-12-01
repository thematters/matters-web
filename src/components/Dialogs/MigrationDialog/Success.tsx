import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, Translate } from '~/components'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
  en: Record<string, string>
} = {
  zh_hant: {
    content:
      '搬家已經開始！你無需守候在電腦旁，搬家完成後你會收到郵件通知，請你上站檢視。',
    back: '返回首頁',
  },
  zh_hans: {
    content:
      '搬家已经开始！你无需守候在电脑旁，搬家完成后你会收到邮件通知，请你上站查看。',
    back: '返回首页',
  },
  en: {
    content:
      'Migration started! You do not have to stay by your computer. You will receive notification by email and be redirected to Matters.',
    back: 'go home',
  },
}

const MigrationDialogSuccess = () => {
  const { zh_hant, zh_hans, en } = texts

  return (
    <>
      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <Translate
              zh_hant={zh_hant.content}
              zh_hans={zh_hans.content}
              en={en.content}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            href={PATHS.HOME}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            href={PATHS.HOME}
          />
        }
      />
    </>
  )
}

export default MigrationDialogSuccess
