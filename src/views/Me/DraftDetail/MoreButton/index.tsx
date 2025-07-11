import IconDown from '@/public/static/icons/24px/down.svg'
import { Button, Icon, Media, TextIcon } from '~/components'
import type { ButtonHeight } from '~/components/Button'
import { EditMetaDraftFragment } from '~/gql/graphql'

interface MoreButtonProps {
  draft: EditMetaDraftFragment
  onClick: () => void
  publishable: boolean
}

export const MoreButton = ({
  onClick,
  draft,
  publishable,
}: MoreButtonProps) => {
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  return (
    <>
      <Media at="sm">
        <MoreButtonContent
          size="2.125rem"
          onClick={onClick}
          disabled={disabled}
        />
      </Media>
      <Media greaterThan="sm">
        <MoreButtonContent
          size="2.375rem"
          onClick={onClick}
          disabled={disabled}
        />
      </Media>
    </>
  )
}

const MoreButtonContent = ({
  size,
  onClick,
  disabled,
}: {
  size: ButtonHeight
  onClick: () => void
  disabled?: boolean
}) => (
  <Button
    size={[null, size]}
    spacing={[0, 14]}
    borderRadius={'0.75rem'}
    bgColor="black"
    onClick={onClick}
    disabled={disabled}
  >
    <TextIcon
      color="white"
      icon={<Icon icon={IconDown} size={18} />}
      spacing={8}
    />
  </Button>
)
