import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAdd24,
  IconMore32,
  IconShare16,
  LanguageContext,
  Menu,
  ShareDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'
import { useMutation } from '~/components/GQL'
import PUT_CIRCLE_ARTICLES from '~/components/GQL/mutations/putCircleArticles'

import { ADD_TOAST, REFETCH_CIRCLE_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import { fragments } from './gql'

import { PutCircleArticles } from '~/components/GQL/mutations/__generated__/PutCircleArticles'
import { DropdownActionsCircle } from './__generated__/DropdownActionsCircle'

interface DialogProps {
  openAddCircleArticlesDialog: () => void
  openShareDialog: () => void
}

type DropdownActionsProps = {
  circle: DropdownActionsCircle
}

interface Controls {
  hasAddArticles: boolean
}

type BaseDropdownActionsProps = DialogProps & Controls

const BaseDropdownActions = ({
  hasAddArticles,

  openAddCircleArticlesDialog,
  openShareDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openShareDialog}>
        <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
          <Translate zh_hant="分享圍爐" zh_hans="分享围炉" />
        </TextIcon>
      </Menu.Item>

      {hasAddArticles && (
        <Menu.Item onClick={openAddCircleArticlesDialog}>
          <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
            <Translate id="circleAddArticles" />
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

  const controls = {
    hasAddArticles: isOwner,
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
            <BaseDropdownActions
              {...controls}
              openAddCircleArticlesDialog={openAddCircleArticlesDialog}
              openShareDialog={openShareDialog}
            />
          )}
        </ShareDialog>
      )}
    </SearchSelectDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
