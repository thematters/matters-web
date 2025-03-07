import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import gql from 'graphql-tag'
import React, { useContext } from 'react'

import { ReactComponent as IconLikeCoin } from '@/public/static/icons/24px/likecoin.svg'
import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  getErrorCodes,
  Icon,
  Spinner,
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
      }
    }
  }
`

const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const classes = classNames({
    [styles.assetsItem]: true,
    assetsItem: true, // global selector for overriding
  })

  return (
    <section className={classes}>
      <TextIcon
        icon={<Icon icon={IconLikeCoin} size={40} />}
        size={16}
        spacing={8}
      >
        <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
      </TextIcon>

      {children}
    </section>
  )
}

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

  if (!likerId) {
    return null
  }

  if (loading) {
    return (
      <Wrapper>
        <Spinner color="greyLight" size={14} />
      </Wrapper>
    )
  }

  if (shouldReAuth) {
    return (
      <Wrapper>
        <Button
          spacing={[0, 12]}
          size={[null, '1.5rem']}
          borderColor="black"
          href={PATHS.ME_SETTINGS_MISC}
        >
          <TextIcon color="black" size={12}>
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

  return (
    <Wrapper>
      <CurrencyFormatter
        value={formatAmount(total, 0)}
        currency="LIKE"
        subValue={formatAmount(total * exchangeRate, 2)}
        subCurrency={currency}
        weight="normal"
      />
    </Wrapper>
  )
}
