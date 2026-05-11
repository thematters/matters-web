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
  FederationArticleSettingState,
  SetArticleFederationSettingMutation,
  SetArticleFederationSettingMutationVariables,
} from '~/gql/graphql'

import Box from '../Box'

export type SidebarFederationSettingProps = {
  articleId: string
  federationSetting?: FederationArticleSettingState | null
  federationSettingSaving: boolean
  editFederationSetting: (state: FederationArticleSettingState) => void
}

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

const labels = {
  [FederationArticleSettingState.Inherit]: (
    <FormattedMessage defaultMessage="Follow author setting" id="yktxJN" />
  ),
  [FederationArticleSettingState.Enabled]: (
    <FormattedMessage defaultMessage="Allow" id="y/bmsG" />
  ),
  [FederationArticleSettingState.Disabled]: (
    <FormattedMessage defaultMessage="Off" id="OvzONl" />
  ),
}

const SidebarFederationSetting: React.FC<SidebarFederationSettingProps> = ({
  articleId,
  federationSetting,
  federationSettingSaving,
  editFederationSetting,
}) => {
  const [setArticleFederationSetting, { loading }] = useMutation<
    SetArticleFederationSettingMutation,
    SetArticleFederationSettingMutationVariables
  >(SET_ARTICLE_FEDERATION_SETTING)

  const currentState =
    federationSetting || FederationArticleSettingState.Inherit
  const saving = federationSettingSaving || loading

  const updateSetting = async (state: FederationArticleSettingState) => {
    if (state === currentState || saving) {
      return
    }

    try {
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
      editFederationSetting(state)
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
        text={labels[FederationArticleSettingState.Inherit]}
        onClick={() => updateSetting(FederationArticleSettingState.Inherit)}
        weight={
          currentState === FederationArticleSettingState.Inherit
            ? 'bold'
            : 'normal'
        }
      />
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
      title={<FormattedMessage defaultMessage="Fediverse" id="R6sMIX" />}
      subtitle={
        <FormattedMessage
          defaultMessage="Only public articles can be exported. Private or paywalled articles stay blocked by the server."
          id="bubFD6"
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
              disabled={saving}
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
