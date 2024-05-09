import { createContext, useRef } from 'react'

import { randomString } from '~/common/utils'

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
  }
)

export const DraftDetailStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
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

  // get draft id from URL instead of `useRouter.getQuery`
  const getDraftId = () => {
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
      value={{ addRequest, getDraftId, isNewDraft }}
    >
      {children}
    </DraftDetailStateContext.Provider>
  )
}
