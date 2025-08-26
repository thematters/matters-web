import { gql, useApolloClient, useMutation } from '@apollo/client'
import { createContext, useContext, useRef } from 'react'

import { randomString } from '~/common/utils'
import { useRoute, ViewerContext } from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation, DraftUpdatedAtFragment } from '~/gql/graphql'

type Job = {
  id: string
  fn: () => Promise<unknown>
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}

const NEW_DRAFT_ID = 'new'

export const DraftDetailStateContext = createContext(
  {} as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addRequest: (fn: () => Promise<any>) => Promise<any>
    getDraftId: () => string | undefined
    isNewDraft: () => boolean
    createDraft: (props: {
      onCreate: (draftId: string) => void
    }) => Promise<string | undefined>
    getDraftUpdatedAt: () => string | undefined
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
  const jobsRef = useRef<Job[]>([])
  const runningRef = useRef<string | null>(null)
  const client = useApolloClient()

  // push request job
  const addRequest = (fn: () => Promise<unknown>): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const id = randomString()
      const jobs = jobsRef.current
      const newJob = { id, fn, resolve, reject }
      jobsRef.current = [...jobs, newJob]

      if (!runningRef.current) {
        runFirstJob()
      }
    })
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

    // Run first job
    runningRef.current = firstJob.id
    try {
      const result = await firstJob.fn()
      firstJob.resolve(result) // Resolve the promise with the job result
    } catch (error) {
      firstJob.reject(error) // Reject the promise if there's an error
    } finally {
      runningRef.current = ''

      // Set to rest jobs
      const { restJobs } = getJobs()
      jobsRef.current = restJobs

      // Run next job
      runFirstJob()
    }
  }

  /**
   * Draft getter and setter
   */
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const [create] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    update: (cache) => {
      cache.evict({
        id: cache.identify(viewer),
        fieldName: 'drafts',
      })
      cache.gc()
    },
  })

  // create draft and shallow replace URL
  const createDraft = async ({
    onCreate,
  }: {
    onCreate: (draftId: string) => void
  }): Promise<string | undefined> => {
    const result = await create()
    const { id } = result?.data?.putDraft || {}

    if (!id) return undefined

    await onCreate(id)

    await router.replace({ query: { draftId: id } }, undefined, {
      shallow: true,
    })

    return id
  }

  // get draft id from URL instead of `useRouter.getQuery`
  const getDraftId = () => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const id = getQuery('draftId')
    return id === NEW_DRAFT_ID ? undefined : id
  }

  // Match `/me/drafts/new` path
  const isNewDraft = () => {
    const draftId = getDraftId()
    return draftId === undefined
  }

  // Read draft updatedAt from cache
  const getDraftUpdatedAt = () => {
    const draftId = getDraftId()
    if (!draftId) return undefined

    try {
      const cacheData = client.readFragment<DraftUpdatedAtFragment>({
        id: `Draft:${draftId}`,
        fragment: gql`
          fragment DraftUpdatedAt on Draft {
            id
            updatedAt
          }
        `,
      })
      return cacheData?.updatedAt
    } catch (error) {
      console.error('Error reading draft updatedAt from cache:', error)
      return undefined
    }
  }

  return (
    <DraftDetailStateContext.Provider
      value={{
        addRequest,
        createDraft,
        getDraftId,
        isNewDraft,
        getDraftUpdatedAt,
      }}
    >
      {children}
    </DraftDetailStateContext.Provider>
  )
}
