import { useContext } from 'react'

import { DonatorsDialog, LanguageContext } from '~/components'
import { Avatar } from '~/components/Avatar'

import { IMAGE_PIXEL } from '~/common/enums'
import { translate } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

interface DonatorsProps {
  article: DonatorsArticle
}

const Donators = ({ article }: DonatorsProps) => {
  const { lang } = useContext(LanguageContext)

  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 10)

  return (
    <DonatorsDialog article={article}>
      {({ openDialog }) => (
        <button
          type="button"
          onClick={openDialog}
          disabled={donatorsCount <= 0}
          aria-label={translate({ id: 'viewDonators', lang })}
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
