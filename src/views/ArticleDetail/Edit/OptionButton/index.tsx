import { FormattedMessage } from 'react-intl'

import IconDrawer from '@/public/static/icons/24px/drawer.svg'
import { toPath } from '~/common/utils'
import { Button, Icon, Media, TextIcon, useRoute } from '~/components'
import type { ButtonHeight } from '~/components/Button'

export const OptionButton = ({ onClick }: { onClick: () => void }) => {
  const { getQuery, router } = useRoute()
  const shortHash = getQuery('shortHash')
  const path = toPath({
    page: 'articleEdit',
    article: { shortHash },
  })
  const goToOptionsPage = () => {
    router.push(path.href + '?page=options')
  }
  return (
    <>
      <Media lessThan="md">
        <OptionButtonContent
          size="2.125rem"
          onClick={goToOptionsPage}
          showIcon={false}
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <OptionButtonContent
          size="2.375rem"
          onClick={onClick}
          showIcon={true}
        />
      </Media>
    </>
  )
}

const OptionButtonContent = ({
  size,
  onClick,
  showIcon = true,
}: {
  size: ButtonHeight
  onClick: () => void
  showIcon?: boolean
}) => (
  <Button
    size={[null, size]}
    spacing={[0, 14]}
    borderRadius={'0.75rem'}
    bgColor="white"
    borderColor="greyHover"
    borderActiveColor="black"
    borderWidth="sm"
    onClick={onClick}
    aria-haspopup="dialog"
  >
    <TextIcon
      color="black"
      size={14}
      weight="medium"
      icon={showIcon ? <Icon icon={IconDrawer} size={18} /> : undefined}
      spacing={8}
    >
      <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
    </TextIcon>
  </Button>
)
