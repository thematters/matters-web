import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'

import {
  KEYVALUE,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Drawer, useNativeEventListener, ViewerContext } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import SupportAuthor from '../SupportAuthor'
import { Step as SupportStep } from '../SupportAuthor/types'

type SupportDrawerProps = {
  isOpen: boolean
  onClose: () => void
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

export const SupportDrawer: React.FC<SupportDrawerProps> = ({
  isOpen,
  onClose,
  article,
}) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [supportStep, setSupportStep] = useState<SupportStep>('setAmount')

  const isTopup = supportStep === 'topup'
  const isAuthor = viewer.id === article.author.id

  // Keyboard shortcuts for open/close support drawer
  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    const keyCode = event.code.toLowerCase()

    if (keyCode === KEYVALUE.escape && isOpen) {
      onClose()
    }

    if (keyCode === KEYVALUE.keyD && !isOpen) {
      if (isAuthor) {
        return
      }

      if (!viewer.isAuthed) {
        window.dispatchEvent(
          new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
            detail: { trigger: UNIVERSAL_AUTH_TRIGGER.support },
          })
        )
        return
      }

      if (viewer.isFrozen) {
        return
      }

      onClose()
    }
  })

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={
          isTopup
            ? intl.formatMessage({
                defaultMessage: 'Top up',
                id: 'Y47aYU',
              })
            : intl.formatMessage({
                defaultMessage: 'Support Author',
                id: 'ezYuE2',
              })
        }
        closeDrawer={onClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <SupportAuthor
          recipient={article.author}
          targetId={article.id}
          article={article}
          updateSupportStep={setSupportStep}
          onClose={onClose}
        />
      </Drawer.Content>
    </Drawer>
  )
}
