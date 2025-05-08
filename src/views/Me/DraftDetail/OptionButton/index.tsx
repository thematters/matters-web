import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDrawer } from '@/public/static/icons/24px/drawer.svg'
import { toPath } from '~/common/utils'
import { Button, Icon, Media, TextIcon, useRoute } from '~/components'

export const OptionButton = ({ onClick }: { onClick: () => void }) => {
  const { getQuery, router } = useRoute()
  const draftId = getQuery('draftId')
  const path = toPath({
    page: 'draftDetailOptions',
    id: draftId,
  })
  const goToOptionsPage = () => {
    router.push(path.href)
  }
  return (
    <>
      <Media at="sm">
        <Button
          size={[null, '2.125rem']}
          spacing={[0, 14]}
          borderRadius={'0.75rem'}
          bgColor="white"
          borderColor="greyHover"
          borderActiveColor="black"
          borderWidth="sm"
          onClick={goToOptionsPage}
          aria-haspopup="dialog"
        >
          <TextIcon color="black" size={14} weight="medium" spacing={8}>
            <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          size={[null, '2.375rem']}
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
            icon={<Icon icon={IconDrawer} size={18} />}
            spacing={8}
          >
            <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
          </TextIcon>
        </Button>
      </Media>
    </>
  )
}
