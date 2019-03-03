import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext, useState } from 'react'
import { Mutation } from 'react-apollo'

import { Button, Icon, LanguageContext, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath, translate } from '~/common/utils'
import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'
import ICON_WRITE from '~/static/icons/write.svg?sprite'

import { CreateDraft } from './__generated__/CreateDraft'

export const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteButton = () => {
  const { lang } = useContext(LanguageContext)

  const [showLoader, setLoader] = useState(false)

  const placeholder = translate({
    zh_hans: TEXT.zh_hans.untitle,
    zh_hant: TEXT.zh_hant.untitle,
    lang
  })
  return (
    <Mutation mutation={CREATE_DRAFT} variables={{ title: placeholder }}>
      {putDraft => {
        const icon = showLoader ? ICON_SPINNER : ICON_WRITE
        return (
          <div
            onClick={() => {
              setLoader(true)
              putDraft().then(result => {
                const { data } = result as { data: CreateDraft }
                const { slug, id } = data.putDraft
                const path = toPath({ page: 'draftDetail', slug, id })
                Router.push(path.as)
              })
            }}
          >
            <Button
              className="u-sm-down-hide"
              size="large"
              bgColor="gold"
              icon={<Icon id={icon.id} viewBox={icon.viewBox} />}
            >
              <Translate zh_hant="創作" zh_hans="创作" />
            </Button>
            <Button
              className="u-sm-up-hide"
              bgColor="gold"
              shape="circle"
              icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            />
          </div>
        )
      }}
    </Mutation>
  )
}

export default WriteButton
