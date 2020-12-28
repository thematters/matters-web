import { Button, TextIcon, Translate } from '~/components'

type PriceProps = {
  // circle: PriceCircle
  circle: any
}

const Price: React.FC<PriceProps> = ({ circle }) => {
  const price = circle.prices && circle.prices[0]
  const isMonthly = price.billingCycle === 'monthly'

  if (!price) {
    return null
  }

  return (
    <Button size={[null, '2rem']} spacing={[0, 'base']} bgColor="gold">
      <TextIcon weight="md" size="sm" color="white">
        {price.amount} {price.currency} /{' '}
        <Translate id={isMonthly ? 'month' : 'year'} />
      </TextIcon>
    </Button>
  )
}

export default Price
