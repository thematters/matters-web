import classNames from 'classnames'
import gql from 'graphql-tag'
import { ReactNode } from 'react'

import NoticeDate from './NoticeDate'
import styles from './styles.css'

import { NoticeDate as NoticeDateType } from './__generated__/NoticeDate'

const NoticeHead = ({
  children,
  hasDate = true,
  notice
}: {
  children: ReactNode
  hasDate?: boolean
  notice: NoticeDateType
}) => {
  const headWrapClasses = classNames({
    'head-wrap': true,
    'has-date': hasDate
  })

  return (
    <section className={headWrapClasses}>
      <h4>{children}</h4>
      {hasDate && <NoticeDate notice={notice} />}
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeHead.fragments = {
  date: gql`
    fragment NoticeHead on Notice {
      ...NoticeDate
    }
    ${NoticeDate.fragments.notice}
  `
}

export default NoticeHead
