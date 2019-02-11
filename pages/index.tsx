import Link from 'next/link'

import { toPath } from '~/common/utils'

const TEST_ARTICLE_DETAIL_PATHS = toPath({
  page: 'articleDetail',
  userName: 'matty',
  slug: '佳禾-繁體中文電子書短期內有機會出現-game-changer-嗎',
  mediaHash: 'Qme3jGoqJWSr9eNiwMxiNonFtEHLgPeANaHtJ2GoEXhWhT'
})

export default () => (
  <div>
    <p>Homepage</p>
    <Link
      href={TEST_ARTICLE_DETAIL_PATHS.fs}
      as={TEST_ARTICLE_DETAIL_PATHS.url}
    >
      <a>Goto: 《佳禾: 繁體中文電子書短期內有機會出現 game changer 嗎？》</a>
    </Link>
  </div>
)
