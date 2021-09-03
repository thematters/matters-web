import { Empty, Translate, withIcon } from '~/components'

import { ReactComponent as IconEmptyTopic } from '@/public/static/icons/64px/empty-topic.svg'

export const EmptyTopic = () => (
  <Empty
    icon={withIcon(IconEmptyTopic)({ size: 'xxl' })}
    description={
      <>
        <Translate
          zh_hant="還沒有建立主題"
          zh_hans="还没有建立主题"
          en="No topics"
        />
        <br />
        <Translate
          zh_hant="點擊＋新增，運用主題策展佈置個人空間"
          zh_hans="点击＋新增，运用主题策展布置个人空间"
          en="Click + to add a new topic"
        />
      </>
    }
  />
)
