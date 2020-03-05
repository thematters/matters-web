import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import {
  Button,
  Icon,
  LanguageContext,
  LikeCoinDialog,
  TextIcon,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import { useResponsive } from '~/components/Hook'

import { ADD_TOAST, ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  toPath,
  translate
} from '~/common/utils'

import { CreateDraft } from './__generated__/CreateDraft'

interface Props {
  allowed: boolean
}

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteButton = ({
  onClick,
  loading
}: {
  onClick: () => any
  loading?: boolean
}) => {
  const isMediumUp = useResponsive('md-up')
  const WriteIcon = loading ? (
    <Icon.Spinner size="sm" color="white" />
  ) : (
    <Icon.Pen size="sm" color="white" />
  )

  return (
    <>
      <Button
        spacing={isMediumUp ? [0, 'base'] : undefined}
        size={isMediumUp ? [null, '2rem'] : ['2rem', '2rem']}
        bgColor="gold"
        onClick={onClick}
        aria-label={TEXT.zh_hant.write}
      >
        <TextIcon icon={WriteIcon} weight="md" color="white">
          {isMediumUp && <Translate id="write" />}
        </TextIcon>
      </Button>
    </>
  )
}

const WriteButtonWithEffect = ({ allowed }: Props) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang })
    }
  })

  if (!allowed) {
    return (
      <LikeCoinDialog>
        {({ open }) => <WriteButton onClick={open} />}
      </LikeCoinDialog>
    )
  }

  return (
    <WriteButton
      onClick={async () => {
        try {
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_WRITE_BUTTON)
          const { data } = await putDraft()
          const { slug, id } = data?.putDraft || {}

          if (slug && id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            Router.push(path.as)
          }
        } catch (error) {
          const [messages, codes] = parseFormSubmitErrors(error, lang)
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: messages[codes[0]]
              }
            })
          )
        }
      }}
      loading={loading}
    />
  )
}

export default WriteButtonWithEffect
