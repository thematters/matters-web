import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Form,
  getErrorCodes,
  IconLikeCoin40,
  IconSpinner16,
  TextIcon,
  Translate,
  usePullToRefresh,
  ViewerContext,
} from '~/components'

import CurrencyFormatter from './CurrencyFormatter'

import { ViewerLikeBalance } from './__generated__/ViewerLikeBalance'

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

export const LikeCoin = () => {
  const viewer = useContext(ViewerContext)

  const likerId = viewer.liker.likerId
  const { data, loading, refetch, error } = useQuery<ViewerLikeBalance>(
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

  usePullToRefresh.Handler(refetch)

  return (
    <Form.List.Item
      title={
        <TextIcon
          icon={<IconLikeCoin40 size="xl-m" />}
          size="md"
          spacing="xtight"
        >
          <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
        </TextIcon>
      }
      // htmlHref={
      //   shouldReAuth
      //     ? `${process.env.NEXT_PUBLIC_OAUTH_URL}/likecoin`
      //     : 'https://like.co/in/matters/redirect'
      // }
      // htmlTarget="_blank"
      // leftAlign="top"
      bold
      right={
        loading ? <IconSpinner16 color="grey-light" size="sm" /> : undefined
      }
      rightText={
        shouldReAuth ? (
          <Translate
            zh_hant="重新綁定 Liker ID 后即可管理創作收益"
            zh_hans="重新绑定 Liker ID 后即可管理创作收益"
            en="Connect Liker ID to manage your rewards"
          />
        ) : likerId ? (
          <CurrencyFormatter currency={total} currencyCode={'LIKE'} />
        ) : (
          <Translate
            zh_hant="完成設置 Liker ID 後即可管理創作收益"
            zh_hans="完成设置 Liker ID 后即可管理创作收益"
            en="Set Liker ID to manage your rewards"
          />
        )
      }
    />
  )
}
