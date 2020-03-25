import userFragments from '~/components/GQL/fragments/user'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  user: userFragments.block,
}

export const BlockUser = {
  fragments,
  Dialog,
  Button,
}
