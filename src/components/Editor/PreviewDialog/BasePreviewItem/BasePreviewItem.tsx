import classNames from 'classnames'
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
  draftId?: string
  eventDetail?: Record<string, string | number>
  closeDialog: () => void
  withBackground?: boolean
}

export const BasePreviewItem = ({
  title,
  names,
  eventType,
  draftId: draftIdProp,
  eventDetail = {},
  closeDialog,
  withBackground = true,
}: BasePreviewItemProps) => {
  const { getQuery, router, isInPath } = useRoute()
  const draftId = getQuery('draftId') || draftIdProp
  const shortHash = getQuery('shortHash')
  const isInArticleEdit = isInPath('ARTICLE_DETAIL_EDIT')
  const isInDrafts = isInPath('ME_DRAFTS')

  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const path = isInArticleEdit
    ? toPath({
        page: 'articleEdit',
        article: { shortHash },
      })
    : isInDrafts && isSmUp
      ? toPath({
          page: 'draftDetail',
          id: draftId || '',
        })
      : toPath({
          page: 'draftDetailOptions',
          id: draftId || '',
        })

  const goToOptionsPage = () => {
    if (isInArticleEdit) {
      router.push(path.href + `?page=options&type=${eventType}`)
    } else {
      router.push(path.href + `?type=${eventType}`)
    }
  }

  const onClick = () => {
    closeDialog()
    if (isSmUp && !isInDrafts) {
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

    if (isSmUp && isInDrafts) {
      router.push(path.href + `?page=options&type=${eventType}`)
      return
    }

    goToOptionsPage()
  }

  const nameClasses = classNames(styles.name, {
    [styles.withBackground]: withBackground,
  })

  return (
    <button className={styles.container} onClick={onClick}>
      <section className={styles.left}>
        <span className={styles.title}>{title}</span>
        <section className={styles.names}>
          {names.map((name, index) => (
            <div className={nameClasses} key={name || index}>
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
