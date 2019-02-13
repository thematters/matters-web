import classNames from 'classnames'
import gql from 'graphql-tag'

import { AnalyticsListener } from '../Analytics'
import LoginButton from './LoginButton'
import Logo from './Logo'
import MeDigest from './MeDigest'
import NotificationButton from './NotificationButton'
import SearchButton from './SearchButton'
import SignUpButton from './SignUpButton'
import WriteButton from './WriteButton'

import styles from './styles.css'

export const GlobalHeader = ({ user }: { user: any }) => {
  const isAuthed = true
  const rightClasses = classNames({
    right: true,
    me: isAuthed
  })

  return (
    <header>
      <AnalyticsListener user={user} />
      <div className="l-row">
        <div className="container">
          <section className="left">
            <Logo />
          </section>

          <section className={rightClasses}>
            {isAuthed ? (
              <>
                <SearchButton />
                <NotificationButton />
                <MeDigest user={user} />
                <WriteButton />
              </>
            ) : (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            )}
          </section>
        </div>
      </div>

      <style jsx>{styles}</style>
    </header>
  )
}

GlobalHeader.fragments = {
  user: gql`
    fragment GlobalHeaderUser on User {
      ...MeDigestUser
      ...AnalyticsUser
    }
    ${MeDigest.fragments.user}
    ${AnalyticsListener.fragments.user}
  `
}
