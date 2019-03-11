import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'
import { LanguageContext } from '~/components/Language'
import { PublishModal } from '~/components/Modal/PublishModal'
import { ModalInstance } from '~/components/ModalManager'
import { Placeholder } from '~/components/Placeholder'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import { DraftDetailQuery_node_Draft } from '../__generated__/DraftDetailQuery'
import { UpdateDraftVariables } from './__generated__/UpdateDraft'
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

  const draftId = draft.id

  const { lang } = useContext(LanguageContext)
  const { updateHeaderState } = useContext(HeaderContext)
  const [title, setTitle] = useState(draft.title)
  const isPending = draft.publishState === 'pending'

  return (
    <Mutation mutation={UPDATE_DRAFT}>
      {updateDraft => (
        <>
          <header className={isPending ? 'u-area-disable' : ''}>
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
            onSave={async (newDraft: UpdateDraftVariables) => {
              updateHeaderState({ type: 'draft', state: 'saving', draftId })
              try {
                await updateDraft({ variables: { id: draft.id, ...newDraft } })
                updateHeaderState({ type: 'draft', state: 'saved', draftId })
              } catch (e) {
                updateHeaderState({
                  type: 'draft',
                  state: 'saveFailed',
                  draftId
                })
              }
            }}
          />
          <ModalInstance modalId="publishModal" title="publish">
            {(props: ModalInstanceProps) => (
              <PublishModal draftId={draft.id} {...props} />
            )}
          </ModalInstance>
          <style jsx>{styles}</style>
        </>
      )}
    </Mutation>
  )
}

DraftContent.fragments = fragments

export default DraftContent
