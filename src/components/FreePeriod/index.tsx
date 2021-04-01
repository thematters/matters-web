import { Translate } from '~/components'

export const FreePeriod = ({ period }: { period: number }) => {
  switch (period) {
    case 1: {
      return <Translate zh_hant="一個月" zh_hans="一个月" en="1 month" />
    }
    case 3: {
      return <Translate zh_hant="三個月" zh_hans="三个月" en="3 months" />
    }
    case 6: {
      return <Translate zh_hant="六個月" zh_hans="六个月" en="6 months" />
    }
    case 12: {
      return <Translate zh_hant="一年" zh_hans="一年" en="1 year" />
    }
    default: {
      return <></>
    }
  }
}
