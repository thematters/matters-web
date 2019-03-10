import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'
import { useInterval } from '~/components/Hook'
import { LanguageContext } from '~/components/Language'
import { PublishModal } from '~/components/Modal/PublishModal'
import { ModalInstance } from '~/components/ModalManager'
import { Placeholder } from '~/components/Placeholder'

import { TEXT } from '~/common/enums'
import { countDownToTime, leftPad, translate } from '~/common/utils'

import { DraftDetailQuery_node_Draft } from '../__generated__/DraftDetailQuery'
import { UpdateDraftVariables } from './__generated__/UpdateDraft'
import styles from './styles.css'

const PendingTitle = ({ lang, toastId, callback }: any) => {
  const second = 1000

  const duration = 2 * 60 * second

  const [timeLeft, setTimeLeft] = useState<number>(duration)

  const timer: { [key: string]: any } = timeLeft
    ? countDownToTime(timeLeft)
    : { mins: 0, secs: 0 }

  useInterval(() => {
    if (timeLeft !== null) {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - second)
      } else {
        setTimeLeft(0)
        window.dispatchEvent(
          new CustomEvent('removeToast', { detail: { id: toastId } })
        )
        callback(null)
      }
    }
  }, second)

  return (
    <>
      <span>
        {translate({
          zh_hant: '正在等待發佈',
          zh_hans: '正在等待发布',
          lang
        })}
      </span>
      {timer && (
        <span className="timer">
          {`(${leftPad(timer.mins, 2, 0)}:${leftPad(timer.secs, 2, 0)})`}
        </span>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

const MUTATION_RECALL_PUBLISH = gql`
  mutation RecallPublish($draftId: ID!) {
    recallPublish(input: { id: $draftId }) {
      id
      publishState
    }
  }
`

const RecallButton = ({ draftId, lang, toastId, callback }: any) => (
  <>
    <div className="recall">
      <Mutation mutation={MUTATION_RECALL_PUBLISH}>
        {recall => (
          <button
            onClick={() => {
              recall({ variables: { draftId } })
                .then((result: any) => {
                  window.dispatchEvent(
                    new CustomEvent('removeToast', { detail: { id: toastId } })
                  )
                  callback(null)
                })
                .catch((result: any) => {
                  // TODO: Handle error
                })
            }}
          >
            {translate({
              zh_hant: '撤銷',
              zh_hans: '撤销',
              lang
            })}
          </button>
        )}
      </Mutation>
    </div>
    <style jsx>{styles}</style>
  </>
)

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

  const [pendingToastId, setPendingToastId] = useState<string | null>(null)

  const pendingContent = translate({
    zh_hant: '上鏈後，文章不可刪改，永久保存',
    zh_hans: '上链后，文章不可删改，永久保存',
    lang
  })

  const makePendingToast = () => {
    const toastId = `toast-${Date.now()}`
    setPendingToastId(toastId)

    window.dispatchEvent(
      new CustomEvent('addToast', {
        detail: {
          id: toastId,
          color: 'green',
          header: (
            <PendingTitle
              lang={lang}
              toastId={toastId}
              callback={setPendingToastId}
            />
          ),
          content: pendingContent,
          closeButton: false,
          customButton: (
            <RecallButton
              draftId={draftId}
              lang={lang}
              toastId={toastId}
              callback={setPendingToastId}
            />
          ),
          duration: 2 * 61 * 1000
        }
      })
    )
  }

  return (
    <Mutation mutation={UPDATE_DRAFT}>
      {updateDraft => (
        <>
          {pendingToastId && <div className="spacing" />}
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
            onSave={async (newDraft: UpdateDraftVariables) => {
              updateHeaderState({ type: 'draft', state: 'saving' })
              try {
                await updateDraft({ variables: { id: draft.id, ...newDraft } })
                updateHeaderState({ type: 'draft', state: 'saved' })
              } catch (e) {
                updateHeaderState({ type: 'draft', state: 'saveFailed' })
              }
            }}
          />
          <ModalInstance modalId="publishModal" title="publish">
            {(props: ModalInstanceProps) => (
              <PublishModal
                draftId={draftId}
                makePendingToast={makePendingToast}
                {...props}
              />
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
