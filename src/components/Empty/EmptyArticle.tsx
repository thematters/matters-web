import { Empty, IconEmptyWarning72, Translate } from '~/components'

export const EmptyArticle = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<IconEmptyWarning72 size="xxl" />}
    description={
      description || (
        <Translate
          zh_hant="還沒有創作"
          zh_hans="还没有创作"
          en="No articles."
        />
      )
    }
  />
)
