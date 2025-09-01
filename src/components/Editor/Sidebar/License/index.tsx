import classNames from 'classnames'
import { useCallback, useContext, useId, useState } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconUp from '@/public/static/icons/24px/up.svg'
import { LICENSE_TEXT, Z_INDEX } from '~/common/enums'
import { Dropdown, Icon, LanguageContext } from '~/components'
import Option from '~/components/Form/Select/Option'
import {
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
} from '~/gql/graphql'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarLicenseProps = {
  license: ArticleLicenseType
  circle?: DigestRichCirclePublicFragment | null
  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => void
  saving: boolean
}

const LICENSE_TYPES = [
  ArticleLicenseType.CcByNcNd_4,
  ArticleLicenseType.Cc_0,
  ArticleLicenseType.Arr,
] as const

const getCompatibleLicense = (license: ArticleLicenseType) =>
  license === ArticleLicenseType.CcByNcNd_2
    ? ArticleLicenseType.CcByNcNd_4
    : license

const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  {
    isEditing: boolean
    disabled?: boolean
  }
>(({ isEditing, disabled }, ref) => {
  const intl = useIntl()
  return (
    <button
      className={styles.rightButton}
      disabled={disabled}
      aria-label={intl.formatMessage(
        isEditing
          ? { defaultMessage: 'Save', id: 'rbrahO' }
          : { defaultMessage: 'Edit', id: '2/2yg+' }
      )}
      ref={ref}
    >
      <Icon icon={isEditing ? IconUp : IconDown} size={24} color="black" />
    </button>
  )
})
ToggleButton.displayName = 'ToggleButton'

const SidebarLicense: React.FC<SidebarLicenseProps> = ({
  license: rawLicense,
  circle,
  editAccess,
  saving,
}) => {
  const intl = useIntl()
  const fieldId = useId()
  const selectedOptionId = `${fieldId}-selected`
  const { lang } = useContext(LanguageContext)
  const [isEditing, setIsEditing] = useState(false)
  const isInCircle = !!circle
  const license = getCompatibleLicense(rawLicense)

  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev)
  }, [])

  const options = LICENSE_TYPES.map((value) => ({
    name: LICENSE_TEXT[value].title[lang],
    subtitle: LICENSE_TEXT[value].subtitle[lang],
    value,
    selected: license === value,
  }))

  const handleOptionClick = (optionValue: ArticleLicenseType) => {
    editAccess(
      isInCircle,
      isInCircle && optionValue === ArticleLicenseType.Arr,
      optionValue
    )
    setIsEditing(false)
  }

  const Options = ({ dropdown }: { dropdown?: boolean }) => (
    <ul
      tabIndex={0}
      className={classNames(styles.list, styles.options, {
        [styles.dropdown]: dropdown,
      })}
      role="listbox"
      aria-labelledby={fieldId}
      aria-activedescendant={selectedOptionId}
    >
      {options.map((option, index) => (
        <Option
          id={option.selected ? selectedOptionId : `${fieldId}-${index}`}
          name={option.name}
          subtitle={option.subtitle}
          onClick={() => handleOptionClick(option.value)}
          selected={option.selected}
          expanded
          size={14}
          key={index}
        />
      ))}
    </ul>
  )

  return (
    <Dropdown content={<Options dropdown />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ openDropdown, ref }) => (
        <button
          ref={ref}
          onClick={() => {
            openDropdown()
            handleToggleEdit()
          }}
          aria-label={intl.formatMessage(
            isEditing
              ? { defaultMessage: 'Save', id: 'rbrahO' }
              : { defaultMessage: 'Edit', id: '2/2yg+' }
          )}
          className={styles.dropdownButton}
        >
          <Box
            title={intl.formatMessage(
              {
                defaultMessage: 'License: {license}',
                id: 'B7QJw1',
              },
              {
                license: LICENSE_TEXT[license].title[lang],
              }
            )}
            subtitle={LICENSE_TEXT[license].subtitle[lang]}
            rightButton={
              <ToggleButton isEditing={isEditing} disabled={saving} />
            }
            disabled={saving}
          />
        </button>
      )}
    </Dropdown>
  )
}

export default SidebarLicense
