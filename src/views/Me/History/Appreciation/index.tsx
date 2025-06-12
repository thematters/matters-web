import gql from 'graphql-tag'
import React from 'react'
import { useIntl } from 'react-intl'

import IconClap from '@/public/static/icons/24px/clap.svg'
import { ArticleDigestList, Icon, TextIcon } from '~/components'
import { DigestAppreciationFragment } from '~/gql/graphql'

interface AppreciationProps {
  type: 'received' | 'sent'
  appreciation: DigestAppreciationFragment
}

const fragments = {
  appreciation: gql`
    fragment DigestAppreciation on Appreciation {
      amount
      purpose
      content
      sender {
        ...UserDigestMiniUser
      }
      recipient {
        ...UserDigestMiniUser
      }
      target {
        ...ArticleDigestListArticle
      }
    }
    ${ArticleDigestList.fragments.article}
  `,
}

export const Appreciation = ({ type, appreciation }: AppreciationProps) => {
  const intl = useIntl()

  const { amount, purpose, recipient, sender, target } = appreciation

  const isAppreciate = purpose === 'appreciate'
  const isSent = type === 'sent'

  if (!target || !isAppreciate) {
    return null
  }

  return (
    <ArticleDigestList
      article={target}
      user={isSent ? recipient! : sender!}
      userPlacement={isSent ? 'top' : 'bottom'}
      right={
        <div
          aria-label={intl.formatMessage(
            {
              defaultMessage: `{amount} likes`,
              id: '43qbTk',
            },
            { amount }
          )}
        >
          <TextIcon
            icon={<Icon icon={IconClap} size={22} />}
            size={14}
            spacing={4}
            weight="medium"
            color="green"
          >
            {amount}
          </TextIcon>
        </div>
      }
    />
  )
}

Appreciation.fragments = fragments
