import { forwardRef, useEffect, useState } from 'react'

import { KEYVALUE } from '~/common/enums'
import {
  Menu,
  SpinnerBlock,
  useNativeEventListener,
  UserDigest,
} from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export const MentionList = forwardRef(
  ({
    users,
    onClick,
    loading,
    onHide,
  }: {
    users: UserDigestMiniUserFragment[]
    onClick: (user: UserDigestMiniUserFragment) => void
    loading?: boolean
    onHide: () => void
  }) => {
    const [activeItem, setActiveItem] = useState('')
    const resetActiveItem = () => setActiveItem('')
    const items = users.map((user) => user.id)

    useNativeEventListener('keydown', (event: KeyboardEvent) => {
      const keyCode = event.code.toLowerCase()

      if (keyCode === KEYVALUE.arrowUp) {
        event.preventDefault()
        const activeIndex = items.indexOf(activeItem)
        if (activeIndex === 0) return

        setActiveItem(items[activeIndex - 1])
      }

      if (keyCode === KEYVALUE.arrowDown) {
        event.preventDefault()
        const activeIndex = items.indexOf(activeItem)
        if (activeIndex === items.length - 1) return

        setActiveItem(items[activeIndex + 1])
      }
    })

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const keyCode = event.code.toLowerCase()

      if (keyCode === KEYVALUE.escape) {
        onHide()
      }

      if (keyCode === KEYVALUE.enter) {
        event.preventDefault()
      }
    }

    useEffect(() => {
      resetActiveItem()
    }, [items.join(' ')])

    if (loading) {
      return (
        <section className={styles.mention}>
          <Menu width="md">
            <Menu.Item>
              <SpinnerBlock noSpacing />
            </Menu.Item>
          </Menu>
        </section>
      )
    }

    if (!users.length || users.length === 0) {
      return null
    }

    return (
      <section className={styles.mention} onKeyDown={handleKeyDown}>
        <Menu width="md">
          {users.map((user) => (
            <Menu.Item
              spacing={[8, 16]}
              onClick={() => {
                onClick(user)
              }}
              bgActiveColor="greyHover"
              isActive={activeItem === user.id}
              key={user.id}
            >
              <UserDigest.Mini
                user={user}
                direction="column"
                hasAvatar
                hasDisplayName
                hasUserName
                disabled
              />
            </Menu.Item>
          ))}
        </Menu>
      </section>
    )
  }
)

MentionList.displayName = 'MentionList'
