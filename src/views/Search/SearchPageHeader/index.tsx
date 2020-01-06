import Link from 'next/link'

import { Icon, TextIcon, Translate } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

const BackToAggregate = ({ q }: { q: string }) => {
  const viewAllPath = toPath({
    page: 'search',
    q
  })

  return (
    <Link {...viewAllPath}>
      <a>
        <TextIcon icon={<Icon.ArrowRightGreen size="md" />} color="green">
          <Translate zh_hant="全部結果" zh_hans="全部结果" />
        </TextIcon>
      </a>
    </Link>
  )
}

const SearchPageHeader = ({
  q,
  isAggregate
}: {
  q: string
  isAggregate: boolean
}) => (
  <header className="l-row">
    <div className="l-col-4 l-col-md-5 l-col-lg-8">
      <div className="container">
        <section>
          <span className="keyword">{q}&nbsp;</span>
          <Translate zh_hant="的搜尋結果" zh_hans="的搜索结果" />
        </section>

        <section>{!isAggregate && <BackToAggregate q={q} />}</section>
      </div>
    </div>

    <style jsx>{styles}</style>
  </header>
)

export default SearchPageHeader
