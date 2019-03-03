import _get from 'lodash/get'
import Link from 'next/link'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import { toPath } from '~/common/utils'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

const BackToAggregate = ({ q }: { q: string }) => {
  const viewAllPath = toPath({
    page: 'search',
    q
  })

  return (
    <Link {...viewAllPath}>
      <a>
        <TextIcon
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN.id}
              viewBox={ICON_ARROW_RIGHT_GREEN.viewBox}
              style={{ width: 12, height: 6 }}
            />
          }
          color="green"
        >
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
