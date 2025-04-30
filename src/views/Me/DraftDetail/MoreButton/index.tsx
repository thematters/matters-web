import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { Button, Icon, Media, TextIcon } from '~/components'
import { EditMetaDraftFragment } from '~/gql/graphql'

type OptionButtonProps = {
  draft: EditMetaDraftFragment
  publishable?: boolean
  onClick?: () => void
}

export const MoreButton = ({
  draft,
  publishable,
  onClick = () => {},
}: OptionButtonProps) => {
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished
  return (
    <>
      <Media at="sm">
        <Button
          size={[null, '2.125rem']}
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
      </Media>
      <Media greaterThan="sm">
        <Button
          size={[null, '2.375rem']}
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
      </Media>
    </>
  )
}
