import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ADD_TOAST,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  IconCollection24,
  Menu,
  TextIcon,
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

  const intl = useIntl()

  const [collectArticle] = useMutation<ExtendArticleMutation>(EXTEND_ARTICLE, {
    variables: {
      title: intl.formatMessage({
        defaultMessage: 'Untitled',
        description: 'Untitled state'
      }),
      collection: [article.id],
    },
  })

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.collectArticle },
        })
      )
      return
    }

    if (viewer.isInactive) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <FormattedMessage defaultMessage="You do not have permission to perform this operation" description="FORBIDDEN_BY_STATE"/>,
          },
        })
      )
      return
    }

    const { data } = await collectArticle()
    const { slug, id } = data?.putDraft || {}

    if (slug && id) {
      const path = toPath({ page: 'draftDetail', slug, id })
      router.push(path.href)
    }
  }

  return (
    <Menu.Item onClick={onClick}>
      <TextIcon icon={<IconCollection24 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Collect Article" description="src/components/ArticleDigest/DropdownActions/ExtendButton.tsx"/>
      </TextIcon>
    </Menu.Item>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
