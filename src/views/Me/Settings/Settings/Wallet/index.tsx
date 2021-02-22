import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Form,
  getErrorCodes,
  IconSpinner16,
  Translate,
  usePullToRefresh,
  ViewerContext,
} from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { numRound } from '~/common/utils'

import { ViewerLikeInfo } from './__generated__/ViewerLikeInfo'

const VIEWER_LIKE_INFO = gql`
  query ViewerLikeInfo {
    viewer {
      id
      liker {
        total
        rateUSD
      }
    }
  }
`

const WalletSettings = () => {
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId
  const { data, loading, refetch, error } = useQuery<ViewerLikeInfo>(
    VIEWER_LIKE_INFO,
    {
      errorPolicy: 'none',
      skip: !process.browser,
    }
  )

  const errorCodes = getErrorCodes(error)
  const shouldReAuth = errorCodes.some((code) => code === 'OAUTH_TOKEN_INVALID')

  const liker = data?.viewer?.liker
  const USDPrice = numRound(liker?.rateUSD * liker?.total || 0)
  const equalSign = liker?.total > 0 ? '≈' : '='

  usePullToRefresh.Handler(refetch)

  return (
    <Form.List groupName={<Translate id="settingsWallet" />}>
      <Form.List.Item
        title="Liker ID"
        onClick={
          !likerId
            ? () =>
                window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
            : undefined
        }
        rightText={likerId || <Translate id="setup" />}
      />

      <Form.List.Item
        title={
          <Translate
            zh_hant="我的創作價值"
            zh_hans="我的创作价值"
            en="Rewards"
          />
        }
        htmlHref={
          shouldReAuth
            ? `${process.env.NEXT_PUBLIC_OAUTH_URL}/likecoin`
            : 'https://like.co/in/matters/redirect'
        }
        htmlTarget="_blank"
        leftAlign="top"
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
            `${numRound(liker?.total || 0)} LikeCoin`
          ) : (
            <Translate
              zh_hant="完成設置 Liker ID 後即可管理創作收益"
              zh_hans="完成设置 Liker ID 后即可管理创作收益"
              en="Set Liker ID to manage your rewards"
            />
          )
        }
        rightSubText={
          !shouldReAuth && likerId && `${equalSign} ${USDPrice} USD`
        }
      />
    </Form.List>
  )
}

export default WalletSettings
