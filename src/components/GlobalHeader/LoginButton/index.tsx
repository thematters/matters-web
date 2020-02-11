import { useState } from 'react'

import { Button, Dialog, TextIcon, Translate } from '~/components'
import LoginForm from '~/components/Form/LoginForm'

import { TEXT } from '~/common/enums'

const LoginButton = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      <Button
        size={[null, '2.25rem']}
        spacing={[0, 'loose']}
        bgHoverColor="green-lighter"
        onClick={open}
      >
        <TextIcon color="green" weight="md">
          <Translate
            zh_hant={TEXT.zh_hant.login}
            zh_hans={TEXT.zh_hans.login}
          />
        </TextIcon>
      </Button>

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.login}
            zh_hans={TEXT.zh_hans.login}
          />
        }
        size="sm"
        isOpen={showDialog}
        onDismiss={close}
      >
        <LoginForm purpose="dialog" submitCallback={close} />
      </Dialog>
    </>
  )
}

export default LoginButton
