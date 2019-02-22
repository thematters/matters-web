import gql from 'graphql-tag'
import { useState } from 'react'

import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

import { Dropdown, Icon, PopperInstance, TextIcon } from '~/components'
import { Avatar } from '~/components/Avatar'
import DropdownMenu from './DropdownMenu'

import { MeDigestUser } from './__generated__/MeDigestUser'
import styles from './styles.css'

const MeDigest = ({ user }: { user: MeDigestUser }) => {
  const [
    dropdownInstance,
    setDropdownInstance
  ] = useState<PopperInstance | null>(null)
  const onCreate = (instance: any) => setDropdownInstance(instance)
  const hideDropdown = () => {
    if (!dropdownInstance) {
      return
    }
    dropdownInstance.hide()
  }

  return (
    <>
      <Dropdown
        content={<DropdownMenu hideDropdown={hideDropdown} />}
        zIndex={101}
        onCreate={onCreate}
      >
        <button type="button" className="container">
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
              text={user.status.MAT.total}
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
