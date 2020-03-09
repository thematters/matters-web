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

import { ADD_TOAST, ANALYTICS_EVENTS } from '~/common/enums'
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
  const WriteIcon = loading ? (
    <Icon.Spinner size="sm" color="white" />
  ) : (
    <Icon.Pen size="sm" color="white" />
  )

  return (
    <>
      <Button
        spacing={[0, 'base']}
        size={[null, '2.25rem']}
        bgColor="gold"
        onClick={onClick}
        className="u-sm-down-hide"
        aria-label="創作"
      >
        <TextIcon icon={WriteIcon} weight="md" color="white">
          <Translate id="write" />
        </TextIcon>
      </Button>

      <Button
        className="u-sm-up-hide"
        size={['2rem', '2rem']}
        bgColor="gold"
        aria-label="創作"
        onClick={onClick}
      >
        {WriteIcon}
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
            Router.push(path.as).then(() => window.scrollTo(0, 0))
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
