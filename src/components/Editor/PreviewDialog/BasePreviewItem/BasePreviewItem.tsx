import { ReactNode } from 'react'

import IconRight from '@/public/static/icons/24px/right.svg'
import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, useMediaQuery, useRoute } from '~/components'

import styles from './styles.module.css'

export interface BasePreviewItemProps {
  title: ReactNode
  names: string[]
  eventType: string
  eventDetail?: Record<string, string | number>
  closeDialog: () => void
}

export const BasePreviewItem = ({
  title,
  names,
  eventType,
  eventDetail = {},
  closeDialog,
}: BasePreviewItemProps) => {
  const { getQuery, router } = useRoute()
  const draftId = getQuery('draftId')
  const path = toPath({
    page: 'draftDetailOptions',
    id: draftId,
  })

  const goToOptionsPage = () => {
    router.push(path.href + `?type=${eventType}`)
  }

  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const onClick = () => {
    closeDialog()
    if (isSmUp) {
      window.dispatchEvent(
        new CustomEvent('open-drawer', {
          detail: {
            type: eventType,
            ...eventDetail,
          },
        })
      )
      return
    }

    goToOptionsPage()
  }

  return (
    <button className={styles.container} onClick={onClick}>
      <section className={styles.left}>
        <span className={styles.title}>{title}</span>
        <section className={styles.names}>
          {names.map((name, index) => (
            <div className={styles.name} key={name || index}>
              {name}
            </div>
          ))}
        </section>
      </section>
      <section className={styles.right}>
        <Icon icon={IconRight} size={14} color="black" />
      </section>
    </button>
  )
}
