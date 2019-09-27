import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'

import { Dropdown, PopperInstance } from '~/components'
import { Avatar } from '~/components/Avatar'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums/text'

import { MeDigestUser } from './__generated__/MeDigestUser'
import DropdownMenu from './DropdownMenu'
import styles from './styles.css'

const MeDigest = ({ user }: { user: MeDigestUser }) => {
  const viewer = useContext(ViewerContext)
  const { headerState } = useContext(HeaderContext)
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }
  const isDraft = headerState.type === 'draft'
  const containerClasses = classNames({
    container: true,
    inactive: viewer.isInactive,
    'u-sm-down-hide': isDraft
  })

  return (
    <>
      <Dropdown
        content={<DropdownMenu hideDropdown={hideDropdown} />}
        onCreate={setInstance}
      >
        <button type="button" className={containerClasses}>
          <Avatar size="small" user={viewer.isInactive ? undefined : user} />
          <section className="info">
            {(viewer.isActive || viewer.isOnboarding) && (
              <span className="username">{user.displayName}</span>
            )}
            {viewer.isFrozen && (
              <Translate
                zh_hant={TEXT.zh_hant.accountFrozen}
                zh_hans={TEXT.zh_hans.accountFrozen}
              />
            )}
            {viewer.isArchived && (
              <Translate
                zh_hant={TEXT.zh_hant.accountArchived}
                zh_hans={TEXT.zh_hans.accountArchived}
              />
            )}
            {viewer.isBanned && (
              <Translate
                zh_hant={TEXT.zh_hant.accountBanned}
                zh_hans={TEXT.zh_hans.accountBanned}
              />
            )}
          </section>
        </button>
      </Dropdown>
      <style jsx>{styles}</style>
    </>
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
