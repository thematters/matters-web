import { Button, ButtonProps, Media, Spinner, TextIcon } from '~/components'

type RightButtonProps = {
  text: string | React.ReactNode
  loading?: boolean
} & ButtonProps

export const RightButton: React.FC<RightButtonProps> = ({
  text,
  loading,
  ...buttonProps
}) => {
  return (
    <>
      <Media at="sm">
        <Button {...buttonProps}>
          <TextIcon
            color="green"
            size="md"
            weight="md"
            icon={loading && <Spinner size="sm" />}
          >
            {!loading ? text : null}
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          {...buttonProps}
          size={[null, '2rem']}
          spacing={[0, 'base']}
          bgColor="green"
        >
          <TextIcon
            color="white"
            size="md"
            weight="md"
            icon={loading && <Spinner size="sm" />}
          >
            {!loading ? text : null}
          </TextIcon>
        </Button>
      </Media>
    </>
  )
}
