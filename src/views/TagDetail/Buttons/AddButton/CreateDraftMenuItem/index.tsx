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

import { ADD_TOAST } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  routerPush,
  toPath,
} from '~/common/utils'

const BaseCreateDraftMenuItem = ({ onClick }: { onClick: () => any }) => (
  <Menu.Item onClick={onClick}>
    <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
      <Translate zh_hant="創作新的作品" zh_hans="创作新的作品" />
    </TextIcon>
  </Menu.Item>
)

const CreateDraftMenuItem = ({
  putDraft,
}: {
  putDraft: () => Promise<any>
}) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => <BaseCreateDraftMenuItem onClick={open} />}
      </LikeCoinDialog>
    )
  }

  return (
    <BaseCreateDraftMenuItem
      onClick={async () => {
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
      }}
    />
  )
}

export default CreateDraftMenuItem
