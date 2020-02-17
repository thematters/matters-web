import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'

import { SearchBar, SignUpButton, useResponsive } from '~/components'

import { PATHS, SIGNUP_TYPE, TEXT } from '~/common/enums'

import { Translate } from '../Language'
import { ViewerContext } from '../Viewer'
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

import { GlobalHeaderUser } from './__generated__/GlobalHeaderUser'

export const GlobalHeader = ({ user }: { user: GlobalHeaderUser }) => {
  const viewer = useContext(ViewerContext)
  const { headerState } = useContext(HeaderContext)
  const isMediumUp = useResponsive({ type: 'md-up' })()
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
                {isMediumUp ? <SearchBar /> : <SearchButton />}
                <NotificationButton />
                <MeDigest user={user} />
                {isDraft && !viewer.isInactive && (
                  <PublishButton allowed={!viewer.shouldSetupLikerID} />
                )}
                {!isDraft && !viewer.isInactive && (
                  <WriteButton allowed={!viewer.shouldSetupLikerID} />
                )}
              </>
            )}

            {!isAbout && (!viewer.isAuthed || !user) && !isLogin && !isSignUp && (
              <>
                {!isLogin && <LoginButton />}
                {!isSignUp && (
                  <SignUpButton trackType={SIGNUP_TYPE.GENERAL}>
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
