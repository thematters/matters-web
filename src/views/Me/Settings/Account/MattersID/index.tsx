import { useContext } from 'react'

import { Form, ViewerContext } from '~/components'

const MattersID = () => {
  const viewer = useContext(ViewerContext)

  return <Form.List.Item title="Matters ID" rightText={`@${viewer.userName}`} />
}

export default MattersID
