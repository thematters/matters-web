import IconTimes from '@/public/static/icons/24px/times.svg'
import { analytics, toPath } from '~/common/utils'
import { Button, Icon, Menu, TextIcon, Translate } from '~/components'

interface SearchHistoryProps {
  data: string[] | undefined
  removeSearchHistoryItem: (value: string) => void
}
import EmptySearchHistory from './EmptySearchHistory'
import styles from './styles.module.css'

export const SearchHistory = ({
  data,
  removeSearchHistoryItem,
}: SearchHistoryProps) => {
  if (!data || data.length <= 0) {
    return <EmptySearchHistory />
  }

  return (
    <section>
      <section className={styles.title}>
        <TextIcon size={18} color="grey" weight="medium">
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
            spacing={[16, 16]}
            onClick={() => {
              analytics.trackEvent('click_feed', {
                type: 'search_history',
                contentType: 'key',
                location: i,
                searchKey: value,
              })
            }}
          >
            <section className={styles.item}>
              <span className={styles.key}>{value}</span>
              <Button
                onClick={(e) => {
                  e?.stopPropagation()
                  removeSearchHistoryItem(value)
                }}
              >
                <Icon icon={IconTimes} color="grey" size={24} />
              </Button>
            </section>
          </Menu.Item>
        ))}
      </Menu>
    </section>
  )
}
