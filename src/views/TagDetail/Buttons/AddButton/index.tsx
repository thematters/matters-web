import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAddMedium,
  IconHashTag,
  IconPen,
  IconSpinner,
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

import TagArticleDialog from './TagArticleDialog'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'
import { TagDetail_node_Tag } from '../../__generated__/TagDetail'

interface DropdownActionsProps {
  isMaintainer: boolean
  tag: TagDetail_node_Tag
}

interface DialogProps {
  openTagSelectedArticleDialog: () => void
  openTagArticleDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

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

const BaseDropdownActions = ({
  isMaintainer,
  tag,
  openTagSelectedArticleDialog,
  openTagArticleDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: [tag.content],
    },
  })

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {isMaintainer && (
        <>
          <Menu.Item onClick={openTagSelectedArticleDialog}>
            <TextIcon
              icon={<IconAddMedium size="md" />}
              size="md"
              spacing="base"
            >
              <Translate id="tagAddSelectedArticle" />
            </TextIcon>
          </Menu.Item>
          <Menu.Divider spacing="xtight" />
        </>
      )}
      <CreateDraftMenuItem putDraft={putDraft} />
      <Menu.Item onClick={openTagArticleDialog}>
        <TextIcon icon={<IconHashTag size="md" />} size="md" spacing="base">
          <Translate id="tagAddArticle" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          size={['7rem', '2.25rem']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          onClick={open}
          aria-haspopup="true"
          ref={ref}
        >
          <TextIcon
            icon={loading ? <IconSpinner /> : <IconPen />}
            weight="md"
            size="md-s"
          >
            <Translate id="addArticleTag" />
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  return (
    <TagArticleDialog tag={props.tag} forSelected>
      {({ open: openTagSelectedArticleDialog }) => (
        <TagArticleDialog tag={props.tag}>
          {({ open: openTagArticleDialog }) => (
            <BaseDropdownActions
              {...props}
              openTagSelectedArticleDialog={openTagSelectedArticleDialog}
              openTagArticleDialog={openTagArticleDialog}
            />
          )}
        </TagArticleDialog>
      )}
    </TagArticleDialog>
  )
}

export default DropdownActions
