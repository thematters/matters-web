import { IconSettings24, Switch, Translate } from '~/components'

import { SetPublishISCNProps } from '../..'
import ListItem from '../../ListItem'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import Box from '../Box'
import styles from './styles.css'

export type SidebarManagementProps = ToggleAccessProps & SetPublishISCNProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box icon={<IconSettings24 size="md" />} title="articleManagement">
      <section className="container">
        <ToggleAccess {...props} inSidebar />

        {false && (
          <ListItem
            title={<Translate id="publishToISCN" />}
            subTitle={<Translate id="publishToISCNHint" />}
            onClick={() => console.log('publishISCN switch')}
          >
            <Switch
              checked={!!props?.iscnPublish}
              onChange={() => {
                // console.log('toogle change')
                props?.togglePublishISCN(!props?.iscnPublish)
              }}
              loading={props?.iscnPublishSaving}
            />
          </ListItem>
        )}

        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default SidebarManagement
