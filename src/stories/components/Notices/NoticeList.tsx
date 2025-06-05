/* eslint-disable @typescript-eslint/no-explicit-any */

import { List, Notice } from '~/components'

import { MOCK_NOTICE_LIST } from './mock'

const NoticeList = () => {
  return (
    <List spacing={['xloose', 'base']}>
      {MOCK_NOTICE_LIST.map((notice, index) => (
        <List.Item key={index}>
          <Notice notice={notice as any} />
        </List.Item>
      ))}
    </List>
  )
}

export default NoticeList
