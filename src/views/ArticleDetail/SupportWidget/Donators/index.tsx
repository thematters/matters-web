import { DonatorsDialog } from '~/components'
import { Avatar } from '~/components/Avatar'

import { IMAGE_PIXEL, TEXT } from '~/common/enums'

import { fragments } from './gql'
import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

interface DonatorsProps {
  article: DonatorsArticle
}

const Donators = ({ article }: DonatorsProps) => {
  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 10)

  return (
    <DonatorsDialog article={article}>
      {({ open }) => (
        <button
          type="button"
          onClick={open}
          disabled={donatorsCount <= 0}
          aria-label={TEXT.zh_hant.viewDonators}
          aria-haspopup="true"
        >
          <section className="avatar-list">
            {donators.map((user, index) => (
              <Avatar
                user={user || undefined}
                src={user ? undefined : IMAGE_PIXEL}
                size="sm"
                key={index}
              />
            ))}
            {donatorsCount > 4 && (
              <span className="count">{donatorsCount}</span>
            )}
          </section>

          <style jsx>{styles}</style>
        </button>
      )}
    </DonatorsDialog>
  )
}

Donators.fragments = fragments

export default Donators
