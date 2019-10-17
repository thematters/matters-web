import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'
import { useMutation } from 'react-apollo'

import { Icon, LanguageContext, Tooltip, Translate } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { toPath, translate } from '~/common/utils'
import ICON_EXTEND from '~/static/icons/extend.svg?sprite'

import { ExtendArticle } from './__generated__/ExtendArticle'
import { ExtendButtonArticle } from './__generated__/ExtendButtonArticle'

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
      state
    }
  `
}

const ExtendButton = ({ article }: { article: ExtendButtonArticle }) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [extend] = useMutation(EXTEND_ARTICLE, {
    variables: {
      title: translate({
        zh_hans: TEXT.zh_hans.untitle,
        zh_hant: TEXT.zh_hant.untitle,
        lang
      }),
      collection: [article.id]
    }
  })
  const canExtend = viewer.isActive

  if (!canExtend) {
    return null
  }

  return (
    <Tooltip
      content={<Translate zh_hant="關聯當前作品" zh_hans="关联当前作品" />}
      placement="top"
    >
      <button
        type="button"
        aria-label="關聯當前作品"
        onClick={async () => {
          const result = await extend()
          const { data } = result as { data: ExtendArticle }
          const { slug, id } = data.putDraft
          const path = toPath({ page: 'draftDetail', slug, id })
          Router.push(path.as)
        }}
      >
        <Icon
          size="default"
          id={ICON_EXTEND.id}
          viewBox={ICON_EXTEND.viewBox}
        />
      </button>
    </Tooltip>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
