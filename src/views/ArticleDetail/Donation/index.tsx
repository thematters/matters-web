import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { DonationDialog, LikeCoinDialog, usePullToRefresh } from '~/components'

import DonationButton from './DonationButton'
import Donators from './Donators'
import styles from './styles.css'

import { ArticleDonation } from './__generated__/ArticleDonation'

interface DonationProps {
  mediaHash: string
}

const ARTICLE_DONATION = gql`
  query ArticleDonation($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      author {
        ...UserDonationRecipient
      }
    }
  }
  ${DonationDialog.fragments.recipient}
`

const BaseDonation = ({ mediaHash }: DonationProps) => {
  const { data, loading, refetch } = useQuery<ArticleDonation>(
    ARTICLE_DONATION,
    {
      variables: { mediaHash },
    }
  )

  usePullToRefresh.Handler(refetch)

  if (loading || !data || !data.article) {
    return null
  }

  const { article } = data

  return (
    <section className="container">
      <section className="button">
        <DonationButton recipient={article.author} targetId={article.id} />
      </section>

      <section className="donators">
        <Donators mediaHash={mediaHash} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

const Donation = ({ mediaHash }: DonationProps) => {
  return (
    <>
      <BaseDonation mediaHash={mediaHash} />
      <LikeCoinDialog allowEventTrigger />
    </>
  )
}

export default Donation
