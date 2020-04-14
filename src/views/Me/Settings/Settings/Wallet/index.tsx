import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Form,
  Icon,
  LikeCoinDialog,
  Translate,
  ViewerContext,
} from '~/components'

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
  const { data, loading } = useQuery<ViewerLikeInfo>(VIEWER_LIKE_INFO, {
    errorPolicy: 'none',
  })
  const LIKE = data?.viewer?.status?.LIKE
  const USDPrice = (LIKE?.rateUSD * LIKE?.total).toFixed(2)
  const equalSign = LIKE?.total > 0 ? '≈' : '='

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
        href="https://like.co/in"
        htmlTarget="_blank"
        leftAlign="top"
        right={
          loading ? <Icon.Spinner color="grey-light" size="sm" /> : undefined
        }
        rightText={
          likerId ? (
            `${LIKE?.total} LikeCoin`
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
