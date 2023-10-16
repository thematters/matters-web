import React from 'react'

import { BackToHomeButton, Error, Layout } from '~/components'

const Custom404 = () => {
  return (
    <Layout.Main>
      <Error statusCode={404} type="not_found">
        <BackToHomeButton />
      </Error>
    </Layout.Main>
  )
}

export default Custom404
