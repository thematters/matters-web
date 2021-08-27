import { useEmblaCarousel } from 'embla-carousel/react'

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
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: 'trimSnaps',
  })

  return (
    <section className="container">
      <header>
        <Tabs sticky={false}>
          <Tabs.Tab count={numAbbr(user.followers.totalCount)} plain>
            <Translate id="followers" />
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

      <section className="content">
        <div className="wrap" ref={emblaRef}>
          <ul>
            {user.followers.edges?.map(({ node }) => (
              <li key={node.id}>
                <Avatar user={node} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Followers.fragments = fragments

export default Followers
