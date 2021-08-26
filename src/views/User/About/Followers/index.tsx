import { Avatar, Tabs, Translate, ViewAllButton } from '~/components'

import { numAbbr } from '~/common/utils'

import { FollowersDialog } from './FollowersDialog'
import { fragments } from './gql'
import styles from './styles.css'

import { UserAboutFollowersUser } from './__generated__/UserAboutFollowersUser'

type FollowersProps = {
  user: UserAboutFollowersUser
}

const Followers = ({ user }: FollowersProps) => {
  return (
    <section className="container">
      <header>
        <Tabs sticky={false}>
          <Tabs.Tab>
            <Translate id="followers" />
            <span>{numAbbr(user.followers.totalCount)}</span>
          </Tabs.Tab>
        </Tabs>

        <FollowersDialog>
          {({ openDialog: openFollowersDialog }) => (
            <button type="button" onClick={openFollowersDialog}>
              <ViewAllButton />
            </button>
          )}
        </FollowersDialog>
      </header>

      <ul>
        {user.followers.edges?.map(({ node }) => (
          <li key={node.id}>
            <Avatar user={node} />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

Followers.fragments = fragments

export default Followers
