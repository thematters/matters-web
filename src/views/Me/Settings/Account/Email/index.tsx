import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { URL_ME_SETTINGS } from '~/common/enums'
import {
  SetEmailDialog,
  TableView,
  useRoute,
  ViewerContext,
} from '~/components'

import { SettingsButton } from '../../Button'

const Email = () => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const { getQuery, replaceQuery } = useRoute()
  const key = URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.key
  const needOpenDialog =
    getQuery(key) === URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.value

  return (
    <SetEmailDialog initStep="confirm">
      {({ openDialog }) => {
        if (needOpenDialog) {
          setTimeout(() => {
            replaceQuery(key, '')
            openDialog()
          })
        }
        return (
          <TableView.Cell
            title={
              <FormattedMessage
                defaultMessage="Email"
                id="aacIz8"
                description="src/views/Me/Settings/Settings/Email/index.tsx"
              />
            }
            rightText={hasEmail ? viewer.info.email : undefined}
            onClick={hasEmail ? openDialog : undefined}
            right={
              hasEmail ? undefined : (
                <SettingsButton onClick={openDialog}>
                  <FormattedMessage defaultMessage="Connect" id="+vVZ/G" />
                </SettingsButton>
              )
            }
          />
        )
      }}
    </SetEmailDialog>
  )
}

export default Email
