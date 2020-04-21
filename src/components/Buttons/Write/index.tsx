import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  Icon,
  LanguageContext,
  LikeCoinDialog,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST, ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  routerPush,
  toPath,
  translate,
} from '~/common/utils'

import { CreateDraft } from './__generated__/CreateDraft'

interface Props {
  allowed: boolean
  isLarge?: boolean
  isInactive?: boolean
}

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const BaseWriteButton = ({
  onClick,
  loading,
  isLarge,
}: {
  onClick: () => any
  loading?: boolean
  isLarge?: boolean
}) => {
  const WriteIcon = loading ? (
    <Icon.Spinner size="sm" color="white" />
  ) : (
    <Icon.Pen size="sm" color="white" />
  )

  return (
    <>
      <Button
        size={isLarge ? ['5rem', '2.25rem'] : ['2rem', '2rem']}
        bgColor="gold"
        onClick={onClick}
        aria-label={TEXT.zh_hant.write}
      >
        <TextIcon icon={WriteIcon} weight="md" color="white">
          {isLarge && <Translate id="write" />}
        </TextIcon>
      </Button>
    </>
  )
}

export const WriteButton = ({ allowed, isLarge, isInactive }: Props) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
    },
  })

  if (!allowed) {
    return (
      <LikeCoinDialog>
        {({ open }) => <BaseWriteButton onClick={open} isLarge={isLarge} />}
      </LikeCoinDialog>
    )
  }

  return (
    <BaseWriteButton
      isLarge={isLarge}
      onClick={async () => {
        try {
          if (isInactive) {
            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
                detail: {
                  color: 'red',
                  content: <Translate id="FORBIDDEN" />,
                },
              })
            )
            return
          }

          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_WRITE_BUTTON)
          const result = await putDraft()
          const { slug, id } = result?.data?.putDraft || {}

          if (slug && id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            routerPush(path.href, path.as)
          }
        } catch (error) {
          const [messages, codes] = parseFormSubmitErrors(error, lang)
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: messages[codes[0]],
              },
            })
          )
        }
      }}
      loading={loading}
    />
  )
}
