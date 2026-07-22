import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  TextIcon,
  toast,
  useMutation,
} from '~/components'
import {
  EditorViewerFederationSettingQuery,
  FederationArticleSettingState,
  FederationAuthorSettingState,
  SetArticleFederationSettingMutation,
  SetArticleFederationSettingMutationVariables,
  SetViewerFederationSettingMutation,
  SetViewerFederationSettingMutationVariables,
} from '~/gql/graphql'

import Box from '../Box'

export type SidebarFederationSettingProps = {
  articleId?: string
  federationSetting?: FederationArticleSettingState | null
  federationSettingSaving?: boolean
  editFederationSetting?: (state: FederationArticleSettingState) => void
}

const VIEWER_FEDERATION_SETTING = gql`
  query EditorViewerFederationSetting {
    viewer {
      id
      federationSetting {
        state
      }
    }
  }
`

const SET_ARTICLE_FEDERATION_SETTING = gql`
  mutation SetArticleFederationSetting(
    $input: SetArticleFederationSettingInput!
  ) {
    setArticleFederationSetting(input: $input) {
      articleId
      state
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

const labels = {
  [FederationArticleSettingState.Enabled]: (
    <FormattedMessage defaultMessage="開啟" id="mMji02" />
  ),
  [FederationArticleSettingState.Disabled]: (
    <FormattedMessage defaultMessage="關閉" id="DnOjES" />
  ),
}

const toArticleSetting = (state?: FederationAuthorSettingState | null) =>
  state === FederationAuthorSettingState.Enabled
    ? FederationArticleSettingState.Enabled
    : FederationArticleSettingState.Disabled

const toAuthorSetting = (state: FederationArticleSettingState) =>
  state === FederationArticleSettingState.Enabled
    ? FederationAuthorSettingState.Enabled
    : FederationAuthorSettingState.Disabled

const SidebarFederationSetting: React.FC<SidebarFederationSettingProps> = ({
  articleId,
  federationSetting,
  federationSettingSaving,
  editFederationSetting,
}) => {
  const { data, loading: viewerLoading } =
    useQuery<EditorViewerFederationSettingQuery>(VIEWER_FEDERATION_SETTING, {
      fetchPolicy: 'cache-and-network',
    })
  const [setArticleFederationSetting, { loading }] = useMutation<
    SetArticleFederationSettingMutation,
    SetArticleFederationSettingMutationVariables
  >(SET_ARTICLE_FEDERATION_SETTING)
  const [setViewerFederationSetting, { loading: viewerSaving }] = useMutation<
    SetViewerFederationSettingMutation,
    SetViewerFederationSettingMutationVariables
  >(SET_VIEWER_FEDERATION_SETTING)

  const authorDefaultState = toArticleSetting(
    data?.viewer?.federationSetting?.state
  )
  const currentState =
    federationSetting &&
    federationSetting !== FederationArticleSettingState.Inherit
      ? federationSetting
      : authorDefaultState
  const saving = !!federationSettingSaving || loading || viewerSaving
  const disabled = saving || viewerLoading || (!articleId && !data?.viewer?.id)

  const updateSetting = async (state: FederationArticleSettingState) => {
    if (state === currentState || disabled) {
      return
    }

    try {
      if (articleId) {
        await setArticleFederationSetting({
          variables: { input: { id: articleId, state } },
          optimisticResponse: {
            setArticleFederationSetting: {
              __typename: 'ArticleFederationSetting',
              articleId,
              state,
            },
          },
        })
        editFederationSetting?.(state)
      } else if (data?.viewer?.id) {
        const authorState = toAuthorSetting(state)
        await setViewerFederationSetting({
          variables: { input: { state: authorState } },
          optimisticResponse: {
            setViewerFederationSetting: {
              __typename: 'UserFederationSetting',
              userId: data.viewer.id,
              state: authorState,
            },
          },
        })
      }
    } catch {
      toast.error({
        message: (
          <FormattedMessage defaultMessage="Failed to save" id="+OtV6h" />
        ),
      })
    }
  }

  const Content = () => (
    <Menu>
      <Menu.Item
        text={labels[FederationArticleSettingState.Enabled]}
        onClick={() => updateSetting(FederationArticleSettingState.Enabled)}
        weight={
          currentState === FederationArticleSettingState.Enabled
            ? 'bold'
            : 'normal'
        }
      />
      <Menu.Item
        text={labels[FederationArticleSettingState.Disabled]}
        onClick={() => updateSetting(FederationArticleSettingState.Disabled)}
        weight={
          currentState === FederationArticleSettingState.Disabled
            ? 'bold'
            : 'normal'
        }
      />
    </Menu>
  )

  return (
    <Box
      title={<FormattedMessage defaultMessage="分享到聯邦宇宙" id="tsUFZX" />}
      subtitle={
        <FormattedMessage
          defaultMessage="公開作品會自動送出，遠端站台可能保留副本"
          id="ZAoAcG"
        />
      }
      rightButton={
        <Dropdown content={<Content />}>
          {({ openDropdown, ref }) => (
            <Button
              onClick={openDropdown}
              size={[null, '1.5rem']}
              spacing={[0, 8]}
              bgColor="white"
              disabled={disabled}
              aria-haspopup="listbox"
              ref={ref}
            >
              <TextIcon
                icon={<Icon icon={IconDown} size={12} />}
                size={14}
                color="grey"
                spacing={4}
                placement="left"
              >
                {labels[currentState]}
              </TextIcon>
            </Button>
          )}
        </Dropdown>
      }
    />
  )
}

export default SidebarFederationSetting
