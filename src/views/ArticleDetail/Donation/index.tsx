import gql from 'graphql-tag'

import { DonationDialog, LikeCoinDialog } from '~/components'

import DonationButton from './DonationButton'
import Donators from './Donators'
import styles from './styles.css'

import { DonationArticle } from './__generated__/DonationArticle'

interface DonationProps {
  article: DonationArticle
}

const fragments = {
  article: gql`
    fragment DonationArticle on Article {
      id
      author {
        ...UserDonationRecipient
      }
      ...DonatorsArticle
    }
    ${Donators.fragments.article}
    ${DonationDialog.fragments.recipient}
  `,
}

const BaseDonation = ({ article }: DonationProps) => {
  return (
    <section className="container">
      <DonationButton recipient={article.author} targetId={article.id} />

      <Donators article={article} />

      <style jsx>{styles}</style>
    </section>
  )
}

const Donation = ({ article }: DonationProps) => {
  return (
    <>
      <BaseDonation article={article} />
      <LikeCoinDialog allowEventTrigger />
    </>
  )
}

Donation.fragments = fragments

export default Donation
