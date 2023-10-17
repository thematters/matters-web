import { useContext } from 'react'

import { TableView, ViewerContext } from '~/components'

const MattersID = () => {
  const viewer = useContext(ViewerContext)

  return <TableView.Cell title="Matters ID" rightText={`@${viewer.userName}`} />
}

export default MattersID
