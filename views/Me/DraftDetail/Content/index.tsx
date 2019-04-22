import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'
import MUTATION_UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { LanguageContext, Translate } from '~/components/Language'
import { Placeholder } from '~/components/Placeholder'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import { DraftDetailQuery_node_Draft } from '../__generated__/DraftDetailQuery'
import styles from './styles.css'

const Editor = dynamic(() => import('~/components/Editor'), {
  ssr: false,
  loading: () => <Placeholder.ArticleDetail />
})

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
  if (!process.browser) {
    return null
  }

  const { lang } = useContext(LanguageContext)
  const { updateHeaderState } = useContext(HeaderContext)
  const [title, setTitle] = useState(draft.title)
  const draftId = draft.id
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  useEffect(() => {
    setTitle(draft.title)
  }, [draft.title])

  return (
    <Mutation mutation={UPDATE_DRAFT}>
      {updateDraft => (
        <>
          <header className={isPending || isPublished ? 'u-area-disable' : ''}>
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
          <Mutation mutation={MUTATION_UPLOAD_FILE}>
            {(singleFileUpload, { loading: uploading }) => (
              <Editor
                upload={async input => {
                  const result = await singleFileUpload({
                    variables: { input: { ...input, type: 'embed' } }
                  })
                  if (result) {
                    const {
                      data: {
                        singleFileUpload: { id, path }
                      }
                    } = result
                    return { id, path }
                  } else {
                    window.dispatchEvent(
                      new CustomEvent('addToast', {
                        detail: {
                          color: 'red',
                          content: (
                            <Translate
                              zh_hant="圖片上傳失敗"
                              zh_hans="图片上传失败"
                            />
                          )
                        }
                      })
                    )
                    throw new Error('upload not successful')
                  }
                }}
                uploading={uploading}
                draft={draft}
                onSave={async (newDraft: {
                  title?: string | null
                  content?: string | null
                  coverAssetId?: string | null
                }) => {
                  updateHeaderState({
                    type: 'draft',
                    state: 'saving',
                    draftId
                  })
                  try {
                    await updateDraft({
                      variables: { id: draft.id, ...newDraft }
                    })
                    updateHeaderState({
                      type: 'draft',
                      state: 'saved',
                      draftId
                    })
                  } catch (e) {
                    updateHeaderState({
                      type: 'draft',
                      state: 'saveFailed',
                      draftId
                    })
                  }
                }}
              />
            )}
          </Mutation>

          <style jsx>{styles}</style>
        </>
      )}
    </Mutation>
  )
}

DraftContent.fragments = fragments

export default DraftContent
