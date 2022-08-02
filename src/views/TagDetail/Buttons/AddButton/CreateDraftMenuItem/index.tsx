import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  IconAdd24,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import { ADD_TOAST, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'
// import { TagDetailPublic_node_Tag } from '../../../__generated__/TagDetailPublic'
import { TagFragment } from '../../../__generated__/TagFragment'

interface CreateDraftButtonProps {
  tag: TagFragment // TagDetailPublic_node_Tag
}

const BaseCreateDraftButton = ({ onClick }: { onClick: () => any }) => (
  <Menu.Item onClick={onClick}>
    <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
      <Translate
        zh_hant="創作新的作品"
        zh_hans="创作新的作品"
        en="create new work"
      />
    </TextIcon>
  </Menu.Item>
)

const CreateDraftButton: React.FC<CreateDraftButtonProps> = ({ tag }) => {
  const router = useRouter()
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const [putDraft] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: [tag.content],
    },
  })

  const createDraft = async () => {
    if (viewer.isInactive) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="FORBIDDEN" />,
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
