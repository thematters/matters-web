import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext } from 'react'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { useMutation } from '~/components/GQL'
import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'
import { Placeholder } from '~/components/Placeholder'

import { DraftDetailQuery_node_Draft } from '../__generated__/DraftDetailQuery'
import { UpdateDraft } from './__generated__/UpdateDraft'
import styles from './styles.css'

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: () => <Placeholder.ArticleDetail />
})

export const UPDATE_DRAFT = gql`
  mutation UpdateDraft($id: ID!, $title: String, $content: String) {
    putDraft(input: { id: $id, title: $title, content: $content }) {
      id
      title
      content
      cover
      slug
      assets {
        id
        type
        path
      }
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
  const { updateHeaderState } = useContext(HeaderContext)

  const [updateDraft] = useMutation<UpdateDraft>(UPDATE_DRAFT)

  const [singleFileUpload] = useMutation<SingleFileUpload>(UPLOAD_FILE)

  const draftId = draft.id

  if (!process.browser) {
    return null
  }

  const upload = async (input: { [key: string]: any }) => {
    const result = await singleFileUpload({
      variables: {
        input: {
          type: 'embed',
          entityType: 'draft',
          entityId: draft.id,
          ...input
        }
      }
    })

    const { id, path } =
      (result && result.data && result.data.singleFileUpload) || {}

    if (id && path) {
      return { id, path }
    } else {
      throw new Error('upload not successful')
    }
  }

  const update = async (newDraft: {
    title?: string | null
    content?: string | null
    coverAssetId?: string | null
  }) => {
    try {
      updateHeaderState({ type: 'draft', state: 'saving', draftId })
      await updateDraft({ variables: { id: draft.id, ...newDraft } })
      updateHeaderState({ type: 'draft', state: 'saved', draftId })
    } catch (error) {
      updateHeaderState({ type: 'draft', state: 'saveFailed', draftId })
    }
  }

  return (
    <>
      <Editor draft={draft} update={update} upload={upload} />
      <style jsx>{styles}</style>
    </>
  )
}

DraftContent.fragments = fragments

export default DraftContent
