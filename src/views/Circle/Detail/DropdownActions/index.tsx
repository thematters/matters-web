import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAdd24,
  IconLogout24,
  IconMore32,
  IconShare16,
  LanguageContext,
  Menu,
  ShareDialog,
  TextIcon,
  Translate,
  UnsubscribeCircleDialog,
  useFeatures,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'
import PUT_CIRCLE_ARTICLES from '~/components/GQL/mutations/putCircleArticles'

import { ADD_TOAST, REFETCH_CIRCLE_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import { fragments } from './gql'

import { PutCircleArticles } from '~/components/GQL/mutations/__generated__/PutCircleArticles'
import { DropdownActionsCirclePrivate } from './__generated__/DropdownActionsCirclePrivate'
import { DropdownActionsCirclePublic } from './__generated__/DropdownActionsCirclePublic'

interface DialogProps {
  openAddCircleArticlesDialog: () => void
  openShareDialog: () => void
  openUnsubscribeCircleDialog: () => void
}

type DropdownActionsProps = {
  circle: DropdownActionsCirclePublic & Partial<DropdownActionsCirclePrivate>
}

interface Controls {
  hasAddArticles: boolean
  hasUnsubscribeCircle: boolean
}

type BaseDropdownActionsProps = DialogProps & Controls

const BaseDropdownActions = ({
  hasAddArticles,
  hasUnsubscribeCircle,

  openAddCircleArticlesDialog,
  openShareDialog,
  openUnsubscribeCircleDialog,
}: BaseDropdownActionsProps) => {
  const features = useFeatures()

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享圍爐" zh_hans="分享围炉" />
        </TextIcon>
      </Menu.Item>

      {hasAddArticles && features.circle_management && (
        <Menu.Item onClick={openAddCircleArticlesDialog}>
          <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
            <Translate id="circleAddArticles" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasUnsubscribeCircle && (
        <Menu.Item onClick={openUnsubscribeCircleDialog}>
          <TextIcon icon={<IconLogout24 size="md" />} size="md" spacing="base">
            <Translate id="unsubscribeCircle" />
          </TextIcon>
        </Menu.Item>
      )}
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
          bgColor="half-black"
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMore32 size="lg" color="white" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ circle }: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [add, { loading }] = useMutation<PutCircleArticles>(PUT_CIRCLE_ARTICLES)
  const addArticlesToCircle = async (articles: SearchSelectNode[]) => {
    const articleIds = articles.map((article) => article.id)

    await add({
      variables: { id: circle.id, articles: articleIds, type: 'add' },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: translate({ id: 'addedArticleCircle', lang }),
        },
      })
    )

    window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL_ARTICLES))
  }

  const isOwner = circle.owner.id === viewer.id
  const isMember = !!circle.isMember
  const controls = {
    hasAddArticles: isOwner,
    hasUnsubscribeCircle: isMember,
  }

  return (
    <SearchSelectDialog
      title="circleAddArticles"
      hint="hintCircleAddArticles"
      searchType="Article"
      searchFilter={{ authorId: viewer.id }}
      onSave={addArticlesToCircle}
      saving={loading}
    >
      {({ open: openAddCircleArticlesDialog }) => (
        <ShareDialog>
          {({ open: openShareDialog }) => (
            <UnsubscribeCircleDialog id={circle.id}>
              {({ open: openUnsubscribeCircleDialog }) => (
                <BaseDropdownActions
                  {...controls}
                  openAddCircleArticlesDialog={openAddCircleArticlesDialog}
                  openShareDialog={openShareDialog}
                  openUnsubscribeCircleDialog={openUnsubscribeCircleDialog}
                />
              )}
            </UnsubscribeCircleDialog>
          )}
        </ShareDialog>
      )}
    </SearchSelectDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
