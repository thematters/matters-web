import { Empty, Icon, Translate } from '~/components'

const EmptyHistory = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.HistoryMedium color="grey-lighter" size="xxl" />}
    description={
      description || (
        <Translate zh_hant="還沒有瀏覽內容" zh_hans="还没有浏览内容" />
      )
    }
  />
)
export default EmptyHistory
