import { useRoute } from '~/components'
import { useMutation } from '~/components/GQL'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'
import { ME_DRAFTS_FEED } from '~/views/Me/Drafts/gql'
import { ME_WORKS_TABS } from '~/views/Me/Works/WorksTabs/gql'

export const useCreateDraft = () => {
  const { router } = useRoute()

  const [create] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    // refetch /me/drafts once a new draft has been created
    refetchQueries: [{ query: ME_DRAFTS_FEED }, { query: ME_WORKS_TABS }],
  })

  // create draft and redirect to draft detail page
  // NOTE: shallow replace if it's already on it
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

  return { createDraft }
}
