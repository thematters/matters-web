import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { DropdownDialog, Translate, ViewerContext } from '~/components'
import { Avatar } from '~/components/Avatar'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { Z_INDEX } from '~/common/enums'

import DropdownMenu from './DropdownMenu'
import styles from './styles.css'

import { MeDigestUser } from './__generated__/MeDigestUser'

const MeDigest = ({ user }: { user: MeDigestUser }) => {
  const viewer = useContext(ViewerContext)
  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'
  const containerClasses = classNames({
    container: true,
    inactive: viewer.isInactive,
    'u-sm-down-hide': isDraft
  })

  return (
    <DropdownDialog
      dropdown={{
        content: <DropdownMenu isInDropdown />,
        trigger: 'mouseenter focus click',
        appendTo: process.browser ? document.body : undefined,
        zIndex: Z_INDEX.OVER_GLOBAL_HEADER
      }}
      dialog={{
        content: <DropdownMenu />,
        title: '我的'
      }}
    >
      {({ open, ref }) => (
        <button
          type="button"
          className={containerClasses}
          aria-label="我的"
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <Avatar size="lg" user={viewer.isInactive ? undefined : user} />

          <section className="info">
            {(viewer.isActive || viewer.isOnboarding) && (
              <span className="username">{user.displayName}</span>
            )}
            {viewer.isFrozen && <Translate id="accountFrozen" />}
            {viewer.isArchived && <Translate id="accountArchived" />}
            {viewer.isBanned && <Translate id="accountBanned" />}
          </section>

          <style jsx>{styles}</style>
        </button>
      )}
    </DropdownDialog>
  )
}

MeDigest.fragments = {
  user: gql`
    fragment MeDigestUser on User {
      id
      displayName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

export default MeDigest
