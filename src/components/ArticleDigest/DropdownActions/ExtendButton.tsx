import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconCollection from '@/public/static/icons/24px/collection.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, Menu, toast, useMutation, ViewerContext } from '~/components'
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
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const [collectArticle] = useMutation<ExtendArticleMutation>(EXTEND_ARTICLE, {
    variables: { title: '', collection: [article.id] },
  })

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.collectArticle },
        })
      )

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
      text={intl.formatMessage({
        defaultMessage: 'Collect Article',
        id: '8UWUW8',
        description:
          'src/components/ArticleDigest/DropdownActions/ExtendButton.tsx',
      })}
      icon={<Icon icon={IconCollection} size={20} />}
      onClick={onClick}
    />
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
