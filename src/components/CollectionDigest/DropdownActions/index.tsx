import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Dropdown,
  IconMore16,
  LanguageContext,
  Menu,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import { DropdownActionsCollectionFragment } from '~/gql/graphql'

import DeleteCollection from './DeleteCollection'
import { fragments } from './gql'
import PinButton from './PinButton'
import styles from './styles.module.css'

type DropdownActionsProps = {
  collection: DropdownActionsCollectionFragment
}

interface DialogProps {
  openDeleteDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  collection,
  openDeleteDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = () => (
    <Menu>
      <PinButton collection={collection} />
      <Menu.Divider />
      <DeleteCollection.Button openDialog={openDeleteDialog} />
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <button
          onClick={(e) => {
            e.preventDefault()
            openDropdown()
          }}
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="listbox"
          ref={ref}
          className={styles.moreButton}
        >
          <IconMore16 size="mdS" />
        </button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { collection } = props
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    toast.error({
      message: <Translate id="FORBIDDEN_BY_STATE" />,
    })
  }

  return (
    <DeleteCollection.Dialog collection={collection}>
      {({ openDialog: openDeleteDialog }) => (
        <BaseDropdownActions
          {...props}
          openDeleteDialog={viewer.isFrozen ? forbid : openDeleteDialog}
        />
      )}
    </DeleteCollection.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
