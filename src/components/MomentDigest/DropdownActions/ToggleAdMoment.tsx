import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconPin from '@/public/static/icons/24px/pin.svg'
import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import { Icon, Menu, Spinner, toast, useMutation } from '~/components'
import { FetchMomentAdStatusQuery, ToggleAdMomentMutation } from '~/gql/graphql'

const fragments = {
  moment: gql`
    fragment ToggleAdMomentMoment on Moment {
      id
      adStatus {
        isAd
      }
    }
  `,
}

const TOGGLE_AD_MOMENT = gql`
  mutation ToggleAdMoment($momentId: ID!, $isAd: Boolean!) {
    setWritingAdStatus(input: { id: $momentId, isAd: $isAd }) {
      ... on Moment {
        id
        ...ToggleAdMomentMoment
      }
    }
  }
  ${fragments.moment}
`

const FETCH_MOMENT_AD_STATUS = gql`
  query FetchMomentAdStatus($shortHash: String!) {
    moment(input: { shortHash: $shortHash }) {
      ...ToggleAdMomentMoment
    }
  }
  ${fragments.moment}
`

const ToggleAdMoment = ({ shortHash }: { shortHash: string }) => {
  const { data, loading } = useQuery<FetchMomentAdStatusQuery>(
    FETCH_MOMENT_AD_STATUS,
    {
      variables: {
        shortHash,
      },
    }
  )

  const isAd = data?.moment?.adStatus.isAd
  const momentId = data?.moment?.id

  const [update] = useMutation<ToggleAdMomentMutation>(TOGGLE_AD_MOMENT, {
    variables: {
      momentId,
      isAd: !isAd,
    },
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <Menu.Item
      text={isAd ? '取消廣告' : '標記廣告'}
      icon={<Icon icon={isAd ? IconUnpin : IconPin} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: isAd ? '已取消標記廣告' : '已標記廣告',
        })
      }}
    />
  )
}

ToggleAdMoment.fragments = fragments

export default ToggleAdMoment
