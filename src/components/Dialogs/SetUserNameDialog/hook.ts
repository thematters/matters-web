import { useApolloClient } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'

import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from '~/common/enums'
import { normalizeUserName } from '~/common/utils'
import { ViewerContext } from '~/components/Context'
import { SocialAccountType } from '~/gql/graphql'

import { QUERY_USER_NAME } from './gql'

const MAX_TRIES = 10
const PAD_LENGTH = 3

export const useAvailableUserName = ({
  enable = true,
}: {
  enable?: boolean
}) => {
  const client = useApolloClient()

  // email or social ids to genereate userName
  const viewer = useContext(ViewerContext)
  const googleId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Google
  )?.email
  const twitterId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Twitter
  )?.userName

  const presetUserName = (viewer.info.email as string) || googleId || twitterId

  const [loading, setLoading] = useState(enable && !!presetUserName)
  const [index, setIndex] = useState(0)

  const [availableUserName, setAvailableUserName] = useState('')

  const checkAvaiableUserName = async () => {
    const normalizedUserName =
      presetUserName &&
      normalizeUserName(
        presetUserName
          .split('@')[0]
          .slice(0, MAX_USER_NAME_LENGTH)
          .toLowerCase()
      )

    if (!normalizedUserName) {
      setLoading(false)
      return
    }

    // (first try) userName to be checked
    let initUserName = normalizedUserName
    if (initUserName && initUserName.length < MIN_USER_NAME_LENGTH) {
      initUserName = initUserName + String(index).padStart(PAD_LENGTH, '0')
    }

    // (further tries) userName to be checked
    const generatedUserName =
      normalizedUserName.slice(0, MAX_USER_NAME_LENGTH - PAD_LENGTH) +
      String(index).padStart(PAD_LENGTH, '0')

    // check if user exists
    const userName = index === 0 ? initUserName : generatedUserName
    const { data } = await client.query({
      query: QUERY_USER_NAME,
      variables: { userName },
      fetchPolicy: 'network-only',
    })

    // user exists, try another one
    if (!!data.user) {
      if (index < MAX_TRIES) {
        setIndex(index + 1)
      } else {
        setLoading(false)
      }
    }
    // user doesn't exists, use this one
    else {
      setAvailableUserName(userName)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!enable || !presetUserName) return

    checkAvaiableUserName()
  }, [index])

  return {
    availableUserName,
    loading,
  }
}
