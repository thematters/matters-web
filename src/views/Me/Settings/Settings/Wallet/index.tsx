import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Form,
  IconSpinner,
  LikeCoinDialog,
  Translate,
  usePullToRefresh,
  ViewerContext,
} from '~/components'

import { numRound } from '~/common/utils'

import { ViewerLikeInfo } from './__generated__/ViewerLikeInfo'

const VIEWER_LIKE_INFO = gql`
  query ViewerLikeInfo {
    viewer {
      id
      status {
        LIKE {
          total
          rateUSD
        }
      }
    }
  }
`

const WalletSettings = () => {
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId
  const { data, loading, refetch } = useQuery<ViewerLikeInfo>(
    VIEWER_LIKE_INFO,
    {
      errorPolicy: 'none',
    }
  )
  const LIKE = data?.viewer?.status?.LIKE
  const USDPrice = numRound(LIKE?.rateUSD * LIKE?.total)
  const equalSign = LIKE?.total > 0 ? '≈' : '='

  usePullToRefresh.Handler(refetch)

  return (
    <Form.List groupName={<Translate id="settingsWallet" />}>
      <LikeCoinDialog defaultStep="setup">
        {({ open }) => (
          <Form.List.Item
            title="Liker ID"
            onClick={!likerId ? open : undefined}
            rightText={likerId || <Translate id="setup" />}
          />
        )}
      </LikeCoinDialog>

      <Form.List.Item
        title={<Translate zh_hant="我的創作價值" zh_hans="我的创作价值" />}
        htmlHref="https://like.co/in/matters/redirect"
        htmlTarget="_blank"
        leftAlign="top"
        right={
          loading ? <IconSpinner color="grey-light" size="sm" /> : undefined
        }
        rightText={
          likerId ? (
            `${numRound(LIKE?.total || 0)} LikeCoin`
          ) : (
            <Translate
              zh_hant="完成設置 Liker ID 後即可管理創作收益"
              zh_hans="完成设置 Liker ID 后即可管理创作收益"
            />
          )
        }
        rightSubText={likerId && `${equalSign} ${USDPrice} USD`}
      />
    </Form.List>
  )
}

export default WalletSettings
