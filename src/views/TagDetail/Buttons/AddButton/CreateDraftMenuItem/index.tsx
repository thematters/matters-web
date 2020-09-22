import { useContext } from 'react'

import {
  IconAddMedium,
  LanguageContext,
  LikeCoinDialog,
  Menu,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import { ADD_TOAST } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  routerPush,
  toPath,
  translate,
} from '~/common/utils'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'
import { TagDetailPublic_node_Tag } from '../../../__generated__/TagDetailPublic'

interface CreateDraftButtonProps {
  tag: TagDetailPublic_node_Tag
}

const BaseCreateDraftButton = ({ onClick }: { onClick: () => any }) => (
  <Menu.Item onClick={onClick}>
    <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
      <Translate zh_hant="創作新的作品" zh_hans="创作新的作品" />
    </TextIcon>
  </Menu.Item>
)

const CreateDraftButton: React.FC<CreateDraftButtonProps> = ({ tag }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const [putDraft] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: [tag.content],
    },
  })

  const createDraft = async () => {
    try {
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
        routerPush(path.href, path.as)
      }
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)

      if (!messages[codes[0]]) {
        return null
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
    }
  }

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => <BaseCreateDraftButton onClick={open} />}
      </LikeCoinDialog>
    )
  }

  return <BaseCreateDraftButton onClick={createDraft} />
}

export default CreateDraftButton
