import { useContext } from 'react'

import { Button, Icon } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { PATHS } from '~/common/enums'

const SearchButton = () => {
  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'

  return (
    <Button
      spacing={['xxtight', 'xxtight']}
      bgHoverColor="grey-lighter"
      {...PATHS.SEARCH}
      aria-label="搜尋"
      hidden={isDraft}
    >
      <Icon.SearchLarge size="md" />
    </Button>
  )
}

export default SearchButton
