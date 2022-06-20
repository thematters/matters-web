import { IconSettings24, Switch, Translate } from '~/components'

import { SetPublishISCNProps } from '../..'
import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import Box from '../Box'
import styles from './styles.css'

export type SidebarManagementProps = ToggleAccessProps & SetPublishISCNProps

const SidebarManagement: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box icon={<IconSettings24 size="md" />} title="articleManagement">
      <section className="container">
        <ToggleAccess {...props} inSidebar />

        <section className="iscn">
          <div className="d-flex">
            <h3 className="title">
              <Translate id="publishToISCN" />
            </h3>
            <Switch
              checked={!!props?.iscnPublish}
              onChange={() => {
                // console.log('toogle change')
                props?.togglePublishISCN(!props?.iscnPublish)
              }}
              loading={props?.iscnPublishSaving}
            />
          </div>
          <p className="detail">
            <Translate id="publishToISCNHint_1" />
            <a href="#" target="_blank">
              ISCN
            </a>
            <Translate id="publishToISCNHint_2" />
          </p>
        </section>
        {/* <section className="inSidebar">
          <section className="widget">
            <section className="iscn">
              <section className="left">
                <h3><Translate id="publishToISCN" /></h3>
                <p className="subtitle"><Translate id="publishToISCNHint_1" /><a href="#" target="_blank">ISCN</a><Translate id="publishToISCNHint_2" /></p>
              </section>
              <section className="right">
                <Switch
                  checked={!!props?.iscnPublish}
                  onChange={() => {
                    // console.log('toogle change')
                    props?.togglePublishISCN(!props?.iscnPublish)
                  }}
                  loading={props?.iscnPublishSaving}
                />
              </section>
            </section>
          </section>
        </section> */}

        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default SidebarManagement
