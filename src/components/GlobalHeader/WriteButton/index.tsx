import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import { Button, Icon, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'
import { toPath, translate } from '~/common/utils'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'
import ICON_WRITE from '~/static/icons/write.svg?sprite'

import { CreateDraft } from './__generated__/CreateDraft'

interface Props {
  allowed: boolean
  CustomButton?: React.FC<{
    onClick: (event: React.MouseEvent<HTMLElement>) => void
  }>
}

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteIcon = ({ loading }: { loading: boolean }) => {
  const icon = loading ? ICON_SPINNER : ICON_WRITE

  return (
    <Icon
      id={icon.id}
      viewBox={icon.viewBox}
      className={loading && 'u-motion-spin'}
    />
  )
}

const WriteButton = ({ allowed, CustomButton }: Props) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({
        zh_hans: TEXT.zh_hans.untitle,
        zh_hant: TEXT.zh_hant.untitle,
        lang
      })
    }
  })

  if (!allowed) {
    return (
      <ModalSwitch modalId="likeCoinTermModal">
        {(open: any) => (
          <Button
            className="u-sm-down-hide"
            size="large"
            bgColor="gold"
            icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            onClick={open}
          >
            <Translate
              zh_hant={TEXT.zh_hant.write}
              zh_hans={TEXT.zh_hans.write}
            />
          </Button>
        )}
      </ModalSwitch>
    )
  }

  const onClick = () => {
    putDraft().then(({ data }) => {
      const { slug, id } = (data && data.putDraft) || {}

      if (slug && id) {
        const path = toPath({ page: 'draftDetail', slug, id })
        Router.push(path.as)
      }
    })
  }

  if (CustomButton) {
    return <CustomButton onClick={onClick} />
  }

  return (
    <>
      <Button
        className="u-sm-down-hide"
        size="large"
        bgColor="gold"
        aria-label="創作"
        icon={<WriteIcon loading={loading} />}
        onClick={onClick}
      >
        <Translate zh_hant="創作" zh_hans="创作" />
      </Button>

      <Button
        className="u-sm-up-hide"
        bgColor="gold"
        shape="circle"
        aria-label="創作"
        icon={<WriteIcon loading={loading} />}
        onClick={onClick}
      />
    </>
  )
}

export default WriteButton
