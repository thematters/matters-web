import { Empty, Icon, Translate } from '~/components'

const EmptyArticle: React.FC<{ description?: React.ReactNode }> = ({
  description,
  children
}) => (
  <Empty
    icon={<Icon.EmptyWarning size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有創作" zh_hans="还没有创作" />
    }
  >
    {children}
  </Empty>
)

export default EmptyArticle
