import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'
import Actions from '../Actions'

import { toPath } from '~/common/utils'
import styles from './styles.css'

const Feed = () => {
  const cover = 'https://via.placeholder.com/600.png'
  const path = toPath({
    page: 'articleDetail',
    userName: 'matty',
    slug: '2019-02-14',
    mediaHash: 'Qme3jGoqJWSr9eNiwMxiNonFtEHLgPeANaHtJ2GoEXhWhT'
  })

  return (
    <section>
      {/* <div className="header">

      </div> */}

      <div className="content">
        <div className="title">
          <Title type="feed" is="h2">
            <Link href={path.fs} as={path.url}>
              <a>區塊鏈是否可以解決內容產業的版權問題？</a>
            </Link>
          </Title>
        </div>
        <div className="description">
          <p>
            <Link href={path.fs} as={path.url}>
              <a>
                發個蠻meta的Matters帖。一邊試驗alpha的影像呈現及運用，一邊腦力激盪：要吸引像我這樣的影像作者，Matters該有怎樣的影像支持？
              </a>
            </Link>
          </p>

          <Actions />
        </div>

        <Link href={path.fs} as={path.url}>
          <a>
            <div
              className="cover"
              style={{
                backgroundImage: `url(${cover})`
              }}
            />
          </a>
        </Link>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

// Feed.fragment = gql``

export default Feed
