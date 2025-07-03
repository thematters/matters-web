import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import {
  ToggleRecommendArticleArticleFragment,
  ToggleRecommendArticleMutation,
} from '~/gql/graphql'

const TOGGLE_RECOMMEND_ARTICLE = gql`
  mutation ToggleRecommendArticle(
    $id: ID!
    $enabled: Boolean!
    $type: RecommendTypes!
  ) {
    toggleArticleRecommend(input: { id: $id, enabled: $enabled, type: $type }) {
      id
      oss {
        inRecommendHottest
        inRecommendIcymi
        inRecommendNewest
      }
    }
  }
`

type Type = 'icymi' | 'hottestAndNewest'

export type OpenToggleRecommendArticleDialogWithProps = {
  type: Type
  enabled: boolean
}

export interface ToggleRecommendArticleDialogProps {
  article: Partial<ToggleRecommendArticleArticleFragment>
  children: ({
    openDialog,
  }: {
    openDialog: (props: OpenToggleRecommendArticleDialogWithProps) => void
  }) => React.ReactNode
}

const ToggleRecommendArticleDialog = ({
  article,
  children,
}: ToggleRecommendArticleDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const [type, setType] = useState<Type>('icymi')
  const [enabled, setEnabled] = useState(false)
  const [toggleRecommendArticle, { loading }] =
    useMutation<ToggleRecommendArticleMutation>(TOGGLE_RECOMMEND_ARTICLE)

  const title = {
    icymi: ['設為首頁精選', '撤銷首頁精選'],
    hottestAndNewest: ['撤銷移出', '移出熱門與最新'],
  }
  const description = {
    icymi: [
      `確認要将「<span class="u-highlight">${article.title}</span>」設為首頁精選嗎？`,
      `確認要将「<span class="u-highlight">${article.title}</span>」撤銷首頁精選嗎？`,
    ],
    hottestAndNewest: [
      `作品「<span class="u-highlight">${article.title}</span>」將可能出現在熱門和最新的文章列表中。`,
      `作品「<span class="u-highlight">${article.title}</span>」將不會出現在熱門和最新的文章列表中。`,
    ],
  }

  const openDialogWithProps = ({
    type,
    enabled,
  }: OpenToggleRecommendArticleDialogWithProps) => {
    setType(type)
    setEnabled(enabled)
    openDialog()
  }

  const onToggle = async () => {
    if (type === 'icymi') {
      await toggleRecommendArticle({
        variables: { id: article.id, enabled: !enabled, type: 'icymi' },
      })
    } else {
      await toggleRecommendArticle({
        variables: { id: article.id, enabled: !enabled, type: 'hottest' },
      })
      await toggleRecommendArticle({
        variables: { id: article.id, enabled: !enabled, type: 'newest' },
      })
    }

    toast.info({ message: '設置成功' })
    closeDialog()
  }

  return (
    <>
      {children({ openDialog: openDialogWithProps })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title={<span>{title[type][+enabled]}</span>} />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p
              dangerouslySetInnerHTML={{ __html: description[type][+enabled] }}
            />
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="green"
              onClick={onToggle}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="green"
              onClick={onToggle}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default ToggleRecommendArticleDialog
