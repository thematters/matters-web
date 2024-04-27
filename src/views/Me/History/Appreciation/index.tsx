import gql from 'graphql-tag'
import React, { useContext } from 'react'

import { ReactComponent as IconClap } from '@/public/static/icons/24px/clap.svg'
import { translate } from '~/common/utils'
import {
  ArticleDigestList,
  Icon,
  LanguageContext,
  TextIcon,
} from '~/components'
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
  const { lang } = useContext(LanguageContext)

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
          aria-label={translate({
            zh_hant: `${amount} 次讚賞`,
            zh_hans: `${amount} 次赞赏`,
            en: `${amount} likes`,
            lang,
          })}
        >
          <TextIcon
            icon={<Icon icon={IconClap} size="mdM" />}
            size="sm"
            spacing="xxtight"
            weight="md"
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
