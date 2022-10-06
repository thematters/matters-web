import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  getErrorCodes,
  IconExternalLink16,
  IconLikeCoin40,
  IconSpinner16,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import CurrencyFormatter from './CurrencyFormatter/index'
import styles from './styles.css'

import { ViewerLikeBalance } from './__generated__/ViewerLikeBalance'

const VIEWER_LIKE_BALANCE = gql`
  query ViewerLikeBalance {
    viewer {
      id
      liker {
        total
        rateUSD
      }
    }
  }
`

export const LikeCoin = () => {
  const viewer = useContext(ViewerContext)

  const likerId = viewer.liker.likerId
  const { data, loading, error } = useQuery<ViewerLikeBalance>(
    VIEWER_LIKE_BALANCE,
    {
      errorPolicy: 'none',
      skip: typeof window === 'undefined',
    }
  )

  const errorCodes = getErrorCodes(error)
  const shouldReAuth = errorCodes.some((code) => code === 'OAUTH_TOKEN_INVALID')

  const liker = data?.viewer?.liker
  const total = liker?.total || 0

  return (
    <section className="assetsItem">
      <TextIcon
        icon={<IconLikeCoin40 size="xl-m" />}
        size="md"
        spacing="xtight"
      >
        <Translate zh_hant="LikeCoin" zh_hans="LikeCoin" en="LikeCoin" />
      </TextIcon>
      <section>
        {loading ? (
          <IconSpinner16 color="grey-light" size="sm" />
        ) : shouldReAuth ? (
          <Button
            spacing={['xxtight', 'tight']}
            borderColor="black"
            borderWidth="md"
            borderRadius="5rem"
            htmlHref={`${process.env.NEXT_PUBLIC_OAUTH_URL}/likecoin`}
            htmlTarget="_blank"
          >
            <TextIcon
              color="black"
              size="xs"
              icon={<IconExternalLink16 color="black" size="xs" />}
              textPlacement="left"
            >
              <Translate
                zh_hant="重新綁定 Liker ID"
                zh_hans="重新绑定 Liker ID"
                en="Connect Liker ID"
              />
            </TextIcon>
          </Button>
        ) : likerId ? (
          <CurrencyFormatter currency={total} currencyCode={'LIKE'} />
        ) : (
          <Button
            spacing={['xxtight', 'tight']}
            borderColor="black"
            borderWidth="md"
            borderRadius="5rem"
            htmlHref={`https://like.co/in/matters/redirect`}
            htmlTarget="_blank"
          >
            <TextIcon
              color="black"
              size="xs"
              icon={<IconExternalLink16 color="black" size="xs" />}
              textPlacement="left"
            >
              <Translate
                zh_hant="設置 Liker ID"
                zh_hans="设置 Liker ID"
                en="Set Liker ID"
              />
            </TextIcon>
          </Button>
        )}
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}
