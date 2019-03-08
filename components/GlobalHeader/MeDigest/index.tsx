import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'

import { Dropdown, Icon, PopperInstance, TextIcon } from '~/components'
import { Avatar } from '~/components/Avatar'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

import { MeDigestUser } from './__generated__/MeDigestUser'
import DropdownMenu from './DropdownMenu'
import styles from './styles.css'

const MeDigest = ({ user }: { user: MeDigestUser }) => {
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
          <Avatar size="small" user={user} />
          <section className="info u-text-truncate">
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
