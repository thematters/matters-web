import { Dialog, Title, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'
import { appendTarget } from '~/common/utils'

import styles from './styles.css'

const PasswordChanged = () => (
  <section className="complete">
    <Dialog.Content>
      <Title is="h3" type="dialog-headline">
        <Translate
          zh_hant={TEXT.zh_hant.resetPasswordSuccess}
          zh_hans={TEXT.zh_hans.resetPasswordSuccess}
        />
      </Title>

      <p className="hint">
        <Translate
          zh_hant={TEXT.zh_hant.useNewPassword}
          zh_hans={TEXT.zh_hans.useNewPassword}
        />
        。
      </p>
    </Dialog.Content>

    <Dialog.Footer>
      <Dialog.Footer.Button {...appendTarget(PATHS.AUTH_LOGIN)}>
        <Translate zh_hant={TEXT.zh_hant.login} zh_hans={TEXT.zh_hans.login} />
      </Dialog.Footer.Button>
    </Dialog.Footer>

    <style jsx>{styles}</style>
  </section>
)

export default PasswordChanged
