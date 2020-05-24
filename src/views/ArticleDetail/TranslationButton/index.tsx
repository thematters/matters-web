import { FC } from 'react'

import { Button, Icon, TextIcon, Translate } from '~/components'

const TranslationButton: FC<{
  translate: boolean
  setTranslate: (translate: boolean) => void
}> = ({ translate, setTranslate }) => {
  const color = translate ? 'green' : 'grey'
  return (
    <Button
      onClick={() => {
        setTranslate(!translate)
      }}
    >
      <TextIcon
        icon={<Icon.World color={color} stroke={color} />}
        size="xs"
        spacing="xxtight"
        color={color}
      >
        <Translate id="translate" />
      </TextIcon>
    </Button>
  )
}

export default TranslationButton
