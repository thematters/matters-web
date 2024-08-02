import { useMutation } from '@apollo/react-hooks'
import { createContext, useRef } from 'react'

import { randomString } from '~/common/utils'
import { useRoute } from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'
import { ME_DRAFTS_FEED } from '~/views/Me/Drafts/gql'
import { ME_WORKS_TABS } from '~/views/Me/Works/WorksTabs/gql'

type Job = {
  id: string
  fn: () => Promise<any>
}

const NEW_DRAFT_ID = 'new'

export const DraftDetailStateContext = createContext(
  {} as {
    addRequest: (fn: () => Promise<any>) => void
    getDraftId: () => string | undefined
    isNewDraft: () => boolean
    createDraft: (props: { onCreate: (draftId: string) => any }) => any
  }
)

export const DraftDetailStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  /**
   * Request job queue
   */
  // Run request jobs in sequence
  const jobsRef = useRef<Job[]>()
  const runningRef = useRef<string>()

  // push request job
  const addRequest = (fn: () => Promise<any>) => {
    const id = randomString()
    const jobs = jobsRef.current || []
    const newJobs = [...jobs, { id, fn }]
    jobsRef.current = newJobs

    if (!runningRef.current) {
      runFirstJob()
    }
  }

  const getJobs = () => {
    const jobs = jobsRef.current || []
    const [firstJob, ...restJobs] = jobs
    return {
      firstJob,
      restJobs,
    }
  }

  const runFirstJob = async () => {
    const { firstJob } = getJobs()
    if (!firstJob || runningRef.current === firstJob.id) {
      return
    }

    // run first job
    runningRef.current = firstJob.id
    await firstJob.fn()
    runningRef.current = ''

    // set to rest jobs
    const { restJobs } = getJobs()
    jobsRef.current = restJobs

    // run next job
    runFirstJob()
  }

  /**
   * Draft getter and setter
   */
  const { router } = useRoute()
  const [create] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    // refetch /me/drafts once a new draft has been created
    refetchQueries: [{ query: ME_DRAFTS_FEED }, { query: ME_WORKS_TABS }],
  })

  // create draft and shallow replace URL
  const createDraft = async ({
    onCreate,
  }: {
    onCreate: (draftId: string) => any
  }) => {
    const result = await create()
    const { id } = result?.data?.putDraft || {}

    if (!id) return

    await onCreate(id)

    await router.replace({ query: { draftId: id } }, undefined, {
      shallow: true,
    })
  }

  // get draft id from URL instead of `useRouter.getQuery`
  const getDraftId = () => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const id = window.location.href.split('/').pop()
    return id === NEW_DRAFT_ID ? undefined : id
  }

  // Match `/me/drafts/new` path
  const isNewDraft = () => {
    const draftId = getDraftId()
    return draftId === undefined
  }

  return (
    <DraftDetailStateContext.Provider
      value={{ addRequest, createDraft, getDraftId, isNewDraft }}
    >
      {children}
    </DraftDetailStateContext.Provider>
  )
}
