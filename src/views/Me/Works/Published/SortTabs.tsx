import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { UserArticlesSort } from '~/gql/graphql'

import styles from './styles.module.css'

const TabItem = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) => {
  const liClasses = classNames({
    [styles.tabItem]: true,
    [styles.active]: active,
  })
  return (
    <li className={liClasses} role="button" onClick={onClick}>
      {children}
    </li>
  )
}

export const SortTabs = ({
  sort,
  setSort,
}: {
  sort: UserArticlesSort
  setSort: React.Dispatch<React.SetStateAction<UserArticlesSort>>
}) => {
  return (
    <ul className={styles.tabList}>
      <TabItem
        active={sort === UserArticlesSort.Newest}
        onClick={() => setSort(UserArticlesSort.Newest)}
      >
        <FormattedMessage
          defaultMessage="Latest"
          id="SPTRiT"
          description="src/views/Me/Works/Published/SortTabs.tsx"
        />
      </TabItem>
      <TabItem
        active={sort === UserArticlesSort.MostReaders}
        onClick={() => setSort(UserArticlesSort.MostReaders)}
      >
        <FormattedMessage
          defaultMessage="Most readers"
          id="rHi+cL"
          description="src/views/Me/Works/Published/SortTabs.tsx"
        />
      </TabItem>
      <TabItem
        active={sort === UserArticlesSort.MostAppreciations}
        onClick={() => setSort(UserArticlesSort.MostAppreciations)}
      >
        <FormattedMessage
          defaultMessage="Most claps"
          id="AA5PkU"
          description="src/views/Me/Works/Published/SortTabs.tsx"
        />
      </TabItem>
      <TabItem
        active={sort === UserArticlesSort.MostComments}
        onClick={() => setSort(UserArticlesSort.MostComments)}
      >
        <FormattedMessage
          defaultMessage="Most comments"
          id="aOFCqL"
          description="src/views/Me/Works/Published/SortTabs.tsx"
        />
      </TabItem>
      <TabItem
        active={sort === UserArticlesSort.MostDonations}
        onClick={() => setSort(UserArticlesSort.MostDonations)}
      >
        <FormattedMessage
          defaultMessage="Most Supporters"
          id="n/w6lW"
          description="src/views/Me/Works/Published/SortTabs.tsx"
        />
      </TabItem>
    </ul>
  )
}
