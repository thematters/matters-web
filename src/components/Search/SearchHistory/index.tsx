import { toPath } from '~/common/utils'
import { Button, IconClose32, Menu, TextIcon, Translate } from '~/components'

interface SearchHistoryProps {
  data: string[]
  removeSearchHistoryItem: (value: string) => void
}
import EmptySearchHistory from './EmptySearchHistory'
import styles from './styles.css'

export const SearchHistory = ({
  data,
  removeSearchHistoryItem,
}: SearchHistoryProps) => {
  if (data.length <= 0) {
    return <EmptySearchHistory />
  }

  return (
    <section>
      <section className="title">
        <TextIcon size="xm" color="grey" weight="md">
          <Translate zh_hans="最近搜索" zh_hant="最近搜尋" en="History" />
        </TextIcon>
      </section>
      <Menu>
        {data.map((value, i) => (
          <Menu.Item
            key={i}
            {...toPath({
              page: 'search',
              q: value,
            })}
            spacing={['base', 'base']}
          >
            <section className="item">
              <span className="key">{value}</span>
              <Button
                onClick={(e) => {
                  e?.stopPropagation()
                  removeSearchHistoryItem(value)
                }}
              >
                <IconClose32 color="grey" size="md" />
              </Button>
            </section>
          </Menu.Item>
        ))}
      </Menu>
      <style jsx>{styles}</style>
    </section>
  )
}
