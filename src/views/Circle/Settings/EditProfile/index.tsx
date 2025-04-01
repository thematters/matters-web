import { useContext } from 'react'
import { useIntl } from 'react-intl'

import {
  CreateCircleForm,
  EmptyLayout,
  Head,
  Layout,
  SpinnerBlock,
  Throw404,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CircleBasicProfileQuery } from '~/gql/graphql'

import { CIRCLE_BASIC_PROFILE } from './gql'

const EditProfile = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, loading } = usePublicQuery<CircleBasicProfileQuery>(
    CIRCLE_BASIC_PROFILE,
    {
      variables: { name },
    }
  )
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id

  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (!circle || !isOwner) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Edit Circle',
          id: 'H8hiL/',
        })}
      />

      <CreateCircleForm.Profile circle={circle} type="edit" purpose="page" />
    </Layout.Main>
  )
}

export default EditProfile
