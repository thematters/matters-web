import React from 'react'

import { BackToHomeButton, Error, Layout } from '~/components'

const Custom404 = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.BackButton />} />

      <Error statusCode={404} type="not_found">
        <BackToHomeButton />
      </Error>
    </Layout.Main>
  )
}

export default Custom404
