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
      <Media lessThan="md">
        <Button {...buttonProps}>
          <TextIcon
            color="green"
            size={16}
            weight="medium"
            icon={loading && <Spinner size={14} />}
          >
            {!loading ? text : null}
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThanOrEqual="md">
        <Button
          {...buttonProps}
          size={[null, '2rem']}
          spacing={[0, 16]}
          bgColor="green"
        >
          <TextIcon
            color="white"
            size={16}
            weight="medium"
            icon={loading && <Spinner size={14} />}
          >
            {!loading ? text : null}
          </TextIcon>
        </Button>
      </Media>
    </>
  )
}
