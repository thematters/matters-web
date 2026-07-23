import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Switch, TableView, toast, useMutation } from '~/components'
import {
  FederationAuthorSettingState,
  SetViewerFederationSettingMutation,
  SetViewerFederationSettingMutationVariables,
  ViewerFederationSettingQuery,
} from '~/gql/graphql'

const VIEWER_FEDERATION_SETTING = gql`
  query ViewerFederationSetting {
    viewer {
      id
      federationSetting {
        state
      }
    }
  }
`

const SET_VIEWER_FEDERATION_SETTING = gql`
  mutation SetViewerFederationSetting(
    $input: SetViewerFederationSettingInput!
  ) {
    setViewerFederationSetting(input: $input) {
      userId
      state
    }
  }
`

const FederationSetting = () => {
  const intl = useIntl()
  const [setting, setSetting] = useState(FederationAuthorSettingState.Disabled)
  const { data, loading } = useQuery<ViewerFederationSettingQuery>(
    VIEWER_FEDERATION_SETTING,
    { fetchPolicy: 'cache-and-network' }
  )
  const [setViewerFederationSetting, { loading: saving }] = useMutation<
    SetViewerFederationSettingMutation,
    SetViewerFederationSettingMutationVariables
  >(SET_VIEWER_FEDERATION_SETTING)

  const viewer = data?.viewer

  useEffect(() => {
    if (viewer?.federationSetting?.state) {
      setSetting(viewer.federationSetting.state)
    }
  }, [viewer?.federationSetting?.state])

  const enabled = setting === FederationAuthorSettingState.Enabled

  const updateSetting = async () => {
    if (!viewer?.id) {
      return
    }

    const state = enabled
      ? FederationAuthorSettingState.Disabled
      : FederationAuthorSettingState.Enabled

    try {
      await setViewerFederationSetting({
        variables: { input: { state } },
        optimisticResponse: {
          setViewerFederationSetting: {
            __typename: 'UserFederationSetting',
            userId: viewer.id,
            state,
          },
        },
      })
      setSetting(state)
      toast.success({
        message: intl.formatMessage({
          defaultMessage: '已更新 Fediverse 設定',
          id: 'mFn/Vv',
        }),
      })
    } catch {
      toast.error({
        message: intl.formatMessage({
          defaultMessage: '操作失敗，請稍後再試',
          id: 'vXgChH',
        }),
      })
    }
  }

  return (
    <>
      <TableView.Cell
        title={
          <FormattedMessage defaultMessage="Fediverse 聯邦發佈" id="YC2b3b" />
        }
        subtitle={
          <FormattedMessage
            defaultMessage="開啟後，新發佈的公開作品會自動送到 Fediverse。其他站台可能保留副本；關閉後將停止同步，並嘗試刪除先前內容。"
            id="2cnZc/"
          />
        }
        right={
          <Switch
            name="fediverse-federation-setting"
            label={
              <FormattedMessage
                defaultMessage="Fediverse 聯邦發佈"
                id="YC2b3b"
              />
            }
            checked={enabled}
            loading={loading || saving}
            onChange={updateSetting}
          />
        }
      />
      {enabled && (
        <TableView.Cell
          role="link"
          title={
            <FormattedMessage defaultMessage="聯邦宇宙互動中心" id="Nw8VNu" />
          }
          subtitle={
            <FormattedMessage
              defaultMessage="追蹤遠端作者、閱讀聯邦動態，並管理回覆與通知"
              id="rudmDY"
            />
          }
          href={PATHS.ME_FEDIVERSE}
        />
      )}
    </>
  )
}

export default FederationSetting
