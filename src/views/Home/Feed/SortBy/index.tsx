import { Button, ButtonProps, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface SortByProps {
  sortBy: 'hottest' | 'newest'
  setSortBy: (sortBy: 'hottest' | 'newest') => void
}

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const isHottest = sortBy === 'hottest'
  const isNewset = sortBy === 'newest'

  const buttonProps = {
    size: ['6rem', '2rem']
  } as ButtonProps

  return (
    <ul role="tablist">
      <li role="tab">
        <Button
          {...buttonProps}
          bgColor={isHottest ? 'green-lighter' : 'white'}
          bgActiveColor={isHottest ? 'grey-lighter-active' : 'grey-lighter'}
          onClick={() => setSortBy('hottest')}
        >
          <TextIcon
            size="md"
            color={isHottest ? 'green' : 'grey'}
            weight="semibold"
          >
            <Translate zh_hant="熱門作品" zh_hans="热门作品" />
          </TextIcon>
        </Button>
      </li>

      <li role="tab">
        <Button
          {...buttonProps}
          bgColor={isNewset ? 'green-lighter' : 'white'}
          bgActiveColor={isNewset ? 'grey-lighter-active' : 'grey-lighter'}
          onClick={() => setSortBy('newest')}
        >
          <TextIcon
            size="md"
            color={isNewset ? 'green' : 'grey'}
            weight="semibold"
          >
            <Translate zh_hant="最新作品" zh_hans="最新作品" />
          </TextIcon>
        </Button>
      </li>

      <style jsx>{styles}</style>
    </ul>
  )
}

export default SortBy
