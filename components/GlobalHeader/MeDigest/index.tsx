import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'

import { Dropdown, Icon, PopperInstance, TextIcon } from '~/components'
import { Avatar } from '~/components/Avatar'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums/text'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

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
        zIndex={101}
        onCreate={i => setInstance(i)}
      >
        <button type="button" className={containerClasses}>
          <Avatar size="small" user={viewer.isInactive ? undefined : user} />
          <section className="info">
            {viewer.isActive && (
              <>
                <span className="username">{user.displayName}</span>
                <TextIcon
                  icon={
                    <Icon
                      size="xsmall"
                      id={ICON_MAT_GOLD.id}
                      viewBox={ICON_MAT_GOLD.viewBox}
                    />
                  }
                  color="gold"
                  weight="semibold"
                  text={_get(user, 'status.MAT.total')}
                  size="xs"
                  spacing="0"
                />
              </>
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
      status {
        MAT {
          total
        }
      }
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

export default MeDigest
