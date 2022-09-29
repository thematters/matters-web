import { Form, IconLikeCoin40, TextIcon, Translate } from '~/components'

import CurrencyFormatter from './CurrencyFormatter'

interface Props {
  balanceLike: number
}

export const LikeCoin: React.FC<Props> = ({ balanceLike }) => {
  return (
    <Form.List.Item
      title={
        <TextIcon
          icon={<IconLikeCoin40 size="xl-m" />}
          size="md"
          spacing="xtight"
        >
          <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
        </TextIcon>
      }
      bold
      rightText={
        <CurrencyFormatter currency={balanceLike} currencyCode={'LIKE'} />
      }
    />
  )
}
  