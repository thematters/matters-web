import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'

import { Responsive, SearchBar } from '~/components'
import SignUpButton from '~/components/Button/SignUp'

import { PATHS, SIGNUP_TYPE, TEXT } from '~/common/enums'

import { Translate } from '../Language'
import { ViewerContext } from '../Viewer'
import { GlobalHeaderUser } from './__generated__/GlobalHeaderUser'
import { HeaderContext } from './Context'
import Hint from './Hint'
import LoginButton from './LoginButton'
import Logo from './Logo'
import MeDigest from './MeDigest'
import Nav from './Nav'
import NotificationButton from './NotificationButton'
import PublishButton from './PublishButton'
import SearchButton from './SearchButton'
import styles from './styles.css'
import WriteButton from './WriteButton'

export const GlobalHeader = ({ user }: { user: GlobalHeaderUser }) => {
  const viewer = useContext(ViewerContext)
  const { headerState } = useContext(HeaderContext)
  const { type: headerType } = headerState
  const isDraft = headerType === 'draft'
  const isLogin = headerType === 'login'
  const isSignUp = headerType === 'signUp'
  const isAbout = headerType === 'about'

  const headerClass = classNames({
    transparent:
      isAbout &&
      'bgColor' in headerState &&
      headerState.bgColor === 'transparent'
  })
  const rightClass = classNames({
    right: true,
    me: viewer.isAuthed
  })

  return (
    <header className={headerClass}>
      <div className="l-row">
        <div className="container">
          <section className="left">
            <Logo />
            {!isAbout && isDraft && <Hint />}
            {!isAbout && !isDraft && <Nav />}
          </section>

          <section className={rightClass}>
            {!isAbout && viewer.isAuthed && user && (
              <>
                <Responsive.MediumUp>
                  {(match: boolean) =>
                    match ? <SearchBar /> : <SearchButton />
                  }
                </Responsive.MediumUp>
                <NotificationButton />
                <MeDigest user={user} />
                {isDraft && (viewer.isActive || viewer.isOnboarding) && (
                  <PublishButton allowed={viewer.isActive} />
                )}
                {!isDraft && (viewer.isActive || viewer.isOnboarding) && (
                  <WriteButton allowed={viewer.isActive} />
                )}
              </>
            )}

            {!isAbout &&
              (!viewer.isAuthed || !user) &&
              (!isLogin && !isSignUp) && (
                <>
                  {!isLogin && <LoginButton />}
                  {!isSignUp && (
                    <SignUpButton
                      extraStyle={{ minWidth: '5rem' }}
                      type={SIGNUP_TYPE.GENERAL}
                    >
                      <Translate
                        zh_hant={TEXT.zh_hant.register}
                        zh_hans={TEXT.zh_hans.register}
                      />
                    </SignUpButton>
                  )}
                </>
              )}

            {isAbout && (
              <Link {...PATHS.HOME}>
                <a className="u-link-green">
                  <Translate
                    zh_hant={TEXT.zh_hant.backToDiscover}
                    zh_hans={TEXT.zh_hans.backToDiscover}
                  />
                </a>
              </Link>
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
      id
      ...MeDigestUser
    }
    ${MeDigest.fragments.user}
  `
}
