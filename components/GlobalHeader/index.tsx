import classNames from 'classnames'

import LoginButton from './LoginButton'
import Logo from './Logo'
import MeDigest from './MeDigest'
import NotificationButton from './NotificationButton'
import SearchButton from './SearchButton'
import SignUpButton from './SignUpButton'
import WriteButton from './WriteButton'

import styles from './styles.css'

export const GlobalHeader = () => {
  const isAuthed = true
  const rightClasses = classNames({
    right: true,
    me: isAuthed
  })

  return (
    <header>
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
                <MeDigest />
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
