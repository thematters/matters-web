import gql from 'graphql-tag'
import { SFC, useContext, useEffect, useState } from 'react'
import { Mutation } from 'react-apollo'

import { LanguageContext, Placeholder } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import { DraftDetailQuery_node_Draft } from '../__generated__/DraftDetailQuery'
import { UpdateDraftVariables } from './__generated__/UpdateDraft'
import styles from './styles.css'

export const UPDATE_DRAFT = gql`
  mutation UpdateDraft(
    $id: ID!
    $title: String
    $content: String
    $coverAssetId: ID
  ) {
    putDraft(
      input: {
        id: $id
        title: $title
        content: $content
        coverAssetId: $coverAssetId
      }
    ) {
      id
      title
      content
      slug
    }
  }
`

const fragments = {
  draft: gql`
    fragment DraftContentDraft on Draft {
      id
      title
      ...EditorDraft
    }
    ${EditorFragments.draft}
  `
}

const DraftContent: React.FC<{ draft: DraftDetailQuery_node_Draft }> & {
  fragments: typeof fragments
} = ({ draft }) => {
  // return placeholder on SSR
  const [Editor, setEditor] = useState(
    () =>
      Placeholder.ArticleDetail as SFC<{
        draft: DraftDetailQuery_node_Draft
        upload: any
        submit: any
      }>
  )

  // use real editor on client side
  useEffect(() => {
    if (process.browser) {
      const EditorComponent = require('~/components/Editor')
      setEditor(() => EditorComponent.Editor)
    }
  })

  // use state for controling title
  const [title, setTitle] = useState(draft.title)

  const { lang } = useContext(LanguageContext)

  const upload = (uploadata: any) => {
    console.log('upload', uploadata)
    return Promise.resolve({
      data: { singleFileUpload: { id: 'test', path: 'test' } }
    })
  }

  return (
    <Mutation mutation={UPDATE_DRAFT}>
      {updateDraft => (
        <>
          <header>
            <input
              placeholder={translate({
                zh_hant: '請輸入標題…',
                zh_hans: '请输入标题…',
                lang
              })}
              aria-label="請輸入標題…"
              type="text"
              value={
                title &&
                title !==
                  translate({
                    zh_hant: TEXT.zh_hant.untitle,
                    zh_hans: TEXT.zh_hans.untitle,
                    lang
                  })
                  ? title
                  : ''
              }
              onChange={e => {
                setTitle(e.target.value)
              }}
              onBlur={() => updateDraft({ variables: { id: draft.id, title } })}
            />
          </header>

          <Editor
            draft={draft}
            upload={upload}
            submit={(newDraft: UpdateDraftVariables) => {
              updateDraft({ variables: { id: draft.id, ...newDraft } })
            }}
          />

          <style jsx>{styles}</style>
        </>
      )}
    </Mutation>
  )
}

DraftContent.fragments = fragments

export default DraftContent
