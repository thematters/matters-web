import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ADD_TOAST, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import {
  IconAdd24,
  Menu,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation, TagFragmentFragment } from '~/gql/graphql'

interface CreateDraftButtonProps {
  tag: TagFragmentFragment
}

const BaseCreateDraftButton = ({ onClick }: { onClick: () => any }) => (
  <Menu.Item onClick={onClick}>
    <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
      <FormattedMessage
        defaultMessage="New Article"
        description="src/views/TagDetail/Buttons/AddButton/CreateDraftMenuItem/index.tsx"
      />
    </TextIcon>
  </Menu.Item>
)

const CreateDraftButton: React.FC<CreateDraftButtonProps> = ({ tag }) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)

  const intl = useIntl()
  const [putDraft] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    variables: {
      title: intl.formatMessage({
        defaultMessage: 'Untitled',
        description: '',
      }),
      tags: [tag.content],
    },
  })

  const createDraft = async () => {
    if (viewer.isInactive) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <FormattedMessage
                defaultMessage="You do not have permission to perform this operation"
                description=""
              />
            ),
          },
        })
      )
      return
    }

    analytics.trackEvent('click_button', {
      type: 'write',
    })

    const result = await putDraft()
    const { slug, id } = result?.data?.putDraft || {}

    if (slug && id) {
      const path = toPath({ page: 'draftDetail', slug, id })
      router.push(path.href)
    }
  }

  if (viewer.shouldSetupLikerID) {
    return (
      <BaseCreateDraftButton
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
      />
    )
  }

  return <BaseCreateDraftButton onClick={createDraft} />
}

export default CreateDraftButton
