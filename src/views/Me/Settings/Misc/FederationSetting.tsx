import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Switch, TableView, toast, useMutation } from '~/components'
import {
  FederationAuthorSettingState,
  SetViewerFederationSettingMutation,
  SetViewerFederationSettingMutationVariables,
  UserFeatureFlagType,
  ViewerFederationSettingQuery,
} from '~/gql/graphql'

const VIEWER_FEDERATION_SETTING = gql`
  query ViewerFederationSetting {
    viewer {
      id
      federationSetting {
        state
      }
      oss {
        featureFlags {
          type
        }
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
  const isFediverseBeta = !!viewer?.oss?.featureFlags.some(
    ({ type }) => type === UserFeatureFlagType.FediverseBeta
  )

  useEffect(() => {
    if (viewer?.federationSetting?.state) {
      setSetting(viewer.federationSetting.state)
    }
  }, [viewer?.federationSetting?.state])

  if (!loading && !isFediverseBeta) {
    return null
  }

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
    } catch {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Failed to edit, please try again."
            id="USOHRK"
          />
        ),
      })
    }
  }

  return (
    <TableView.Cell
      title={<FormattedMessage defaultMessage="Fediverse" id="R6sMIX" />}
      subtitle={
        <FormattedMessage
          defaultMessage="Allow eligible public articles to be exported to Fediverse."
          id="oh7tJ1"
        />
      }
      right={
        <Switch
          name="fediverse"
          label={intl.formatMessage({
            defaultMessage: 'Fediverse',
            id: 'R6sMIX',
          })}
          checked={enabled}
          onChange={updateSetting}
          loading={loading || saving}
          disabled={loading || saving || !viewer?.id}
        />
      }
    />
  )
}

export default FederationSetting
