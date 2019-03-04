import _get from 'lodash/get'

import { Drawer, DrawerConsumer } from '~/components/Drawer'

import Header from './Header'
import Main from './Main'

const SideComments = () => (
  <Drawer>
    <Header />
    <DrawerConsumer>
      {({ opened }) => (opened ? <Main /> : null)}
    </DrawerConsumer>
  </Drawer>
)

export default SideComments
