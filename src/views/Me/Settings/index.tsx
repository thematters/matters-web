import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Form,
  Layout,
  LikeCoinDialog,
  Translate,
  ViewerContext,
} from '~/components'

import { LANG_TEXT_MAP, PATHS } from '~/common/enums'

import { ViewerLikeInfo } from './__generated__/ViewerLikeInfo'
import { ViewerTotalBlockCount } from './__generated__/ViewerTotalBlockCount'

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

const VIEWER_TOTAL_BLOCK_COUNT = gql`
  query ViewerTotalBlockCount {
    viewer {
      id
      blockList(input: { first: 0 }) {
        totalCount
      }
    }
  }
`

const UISettings = () => {
  const viewer = useContext(ViewerContext)

  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
      <Form.List.Item
        title={<Translate id="settingsLanguage" />}
        {...PATHS.ME_SETTINGS_USERNAME}
        rightText={LANG_TEXT_MAP[viewer.settings.language]}
      />
    </Form.List>
  )
}

const AccountSettings = () => {
  const viewer = useContext(ViewerContext)
  const { data } = useQuery<ViewerTotalBlockCount>(VIEWER_TOTAL_BLOCK_COUNT, {
    errorPolicy: 'none',
  })
  const totalBlockCount = data?.viewer?.blockList?.totalCount

  return (
    <Form.List groupName={<Translate id="settingsAccount" />}>
      <Form.List.Item
        title="Matters ID"
        {...PATHS.ME_SETTINGS_USERNAME}
        rightText={viewer.userName}
      />
      <Form.List.Item
        title={<Translate id="email" />}
        {...PATHS.ME_SETTINGS_EMAIL}
        rightText={viewer.info.email}
      />
      <Form.List.Item
        title={<Translate id="loginPassword" />}
        {...PATHS.ME_SETTINGS_PASSWORD}
      />
      <Form.List.Item
        title={<Translate id="settingsNotification" />}
        {...PATHS.ME_SETTINGS_NOTIFICATION}
      />
      <Form.List.Item
        title={<Translate id="settingsBlock" />}
        {...PATHS.ME_SETTINGS_BLOCKED}
        rightText={totalBlockCount}
      />
    </Form.List>
  )
}

const WalletSettings = () => {
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId
  const { data } = useQuery<ViewerLikeInfo>(VIEWER_LIKE_INFO, {
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

const Settings = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="settings" />}
      />

      <UISettings />

      <AccountSettings />

      <WalletSettings />
    </Layout.Main>
  )
}

export default Settings
