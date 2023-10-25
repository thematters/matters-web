import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, OPEN_UNIVERSAL_AUTH_DIALOG } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  ERROR_MESSAGES,
  IconCollection24,
  Menu,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  ExtendArticleMutation,
  ExtendButtonArticleFragment,
} from '~/gql/graphql'

const EXTEND_ARTICLE = gql`
  mutation ExtendArticle($title: String!, $collection: [ID]) {
    putDraft(input: { title: $title, collection: $collection }) {
      id
      slug
    }
  }
`

const fragments = {
  article: gql`
    fragment ExtendButtonArticle on Article {
      id
      articleState: state
    }
  `,
}

const ExtendButton = ({
  article,
}: {
  article: ExtendButtonArticleFragment
}) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const [collectArticle] = useMutation<ExtendArticleMutation>(EXTEND_ARTICLE, {
    variables: { title: '', collection: [article.id] },
  })

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      return
    }

    if (viewer.isInactive) {
      toast.error({
        message: (
          <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN]} />
        ),
      })

      return
    }

    const { data } = await collectArticle()
    const { id } = data?.putDraft || {}

    if (id) {
      const path = toPath({ page: 'draftDetail', id })
      router.push(path.href)
    }
  }

  return (
    <Menu.Item
      text={<Translate id="collectArticle" />}
      icon={<IconCollection24 size="mdS" />}
      onClick={onClick}
    />
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
