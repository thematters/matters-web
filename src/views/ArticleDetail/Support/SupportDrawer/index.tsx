import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Drawer } from '~/components'
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
  const intl = useIntl()

  const [supportStep, setSupportStep] = useState<SupportStep>('setAmount')

  const isTopup = supportStep === 'topup'

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
      />
      <Drawer.Content>
        <SupportAuthor
          recipient={article.author}
          targetId={article.id}
          article={article}
          updateSupportStep={setSupportStep}
        />
      </Drawer.Content>
    </Drawer>
  )
}
