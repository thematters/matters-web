import { createContext, useRef } from 'react'

import { NEW_DRAFT_ID } from '~/common/enums'
import { randomString } from '~/common/utils'

export const DraftEditorStateContext = createContext(
  {} as {
    addJob: (fn: () => Promise<any>) => void
    getDraftId: () => string | undefined
    isNewDraft: () => boolean
  }
)

type Job = {
  id: string
  fn: () => Promise<any>
}

export const DraftEditorStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const jobsRef = useRef<Job[]>()
  const runningRef = useRef<string>()

  const addJob = (fn: () => Promise<any>) => {
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

    runningRef.current = firstJob.id
    await firstJob.fn()
    runningRef.current = ''
    const { restJobs } = getJobs()
    jobsRef.current = restJobs
    runFirstJob()
  }

  const getDraftId = () => {
    const id = window.location.href.split('/').pop()
    return id === NEW_DRAFT_ID ? undefined : id
  }

  const isNewDraft = () => {
    const draftId = getDraftId()
    return draftId === NEW_DRAFT_ID
  }

  return (
    <DraftEditorStateContext.Provider
      value={{ addJob, getDraftId, isNewDraft }}
    >
      {children}
    </DraftEditorStateContext.Provider>
  )
}
