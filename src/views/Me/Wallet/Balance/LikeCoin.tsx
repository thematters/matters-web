import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  getErrorCodes,
  IconLikeCoin40,
  IconSpinner16,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { QuoteCurrency, ViewerLikeBalanceQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface LikeCoinBalanceProps {
  currency: QuoteCurrency
  exchangeRate: number
}

const VIEWER_LIKE_BALANCE = gql`
  query ViewerLikeBalance {
    viewer {
      id
      liker {
        total
        rateUSD
      }
    }
  }
`

const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <section className="assetsItem">
    <TextIcon icon={<IconLikeCoin40 size="xl-m" />} size="md" spacing="xtight">
      <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
    </TextIcon>

    {children}
  </section>
)

export const LikeCoinBalance = ({
  currency,
  exchangeRate,
}: LikeCoinBalanceProps) => {
  const viewer = useContext(ViewerContext)

  const likerId = viewer.liker.likerId
  const { data, loading, error } = useQuery<ViewerLikeBalanceQuery>(
    VIEWER_LIKE_BALANCE,
    {
      errorPolicy: 'none',
      skip: typeof window === 'undefined',
    }
  )

  const errorCodes = getErrorCodes(error)
  const shouldReAuth = errorCodes.some((code) => code === 'OAUTH_TOKEN_INVALID')

  const liker = data?.viewer?.liker
  const total = liker?.total || 0

  if (loading) {
    return (
      <Wrapper>
        <IconSpinner16 color="grey-light" size="sm" />
      </Wrapper>
    )
  }

  if (shouldReAuth) {
    return (
      <Wrapper>
        <Button
          spacing={[0, 'tight']}
          size={[null, '1.5rem']}
          borderColor="black"
          href={PATHS.ME_SETTINGS}
        >
          <TextIcon color="black" size="xs">
            <Translate
              zh_hant="重新綁定 Liker ID"
              zh_hans="重新绑定 Liker ID"
              en="Connect Liker ID"
            />
          </TextIcon>
        </Button>
      </Wrapper>
    )
  }

  if (likerId) {
    return (
      <Wrapper>
        <CurrencyFormatter
          value={formatAmount(total, 0)}
          currency="LIKE"
          subValue={formatAmount(total * exchangeRate, 2)}
          subCurrency={currency}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Button
        spacing={[0, 'tight']}
        size={[null, '1.5rem']}
        borderColor="black"
        href={PATHS.ME_SETTINGS}
      >
        <TextIcon color="black" size="xs">
          <Translate zh_hant="前往設置" zh_hans="前往设置" en="Setup" />
        </TextIcon>
      </Button>
    </Wrapper>
  )
}
