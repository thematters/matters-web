import { Button, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const EditModeHeader = ({
  setEditMode,
}: {
  setEditMode: (enable: boolean) => any
}) => {
  return (
    <>
      <p>
        <Translate
          zh_hant="作品已發佈到 IPFS，無法被修改，但你可以編輯關聯作品和標籤。"
          zh_hans="作品已发布到 IPFS，无法被修改，但你可以编辑关联作品和标签。"
        />
      </p>

      <Button
        size={['4rem', '2rem']}
        bgColor="green"
        onClick={() => setEditMode(false)}
        aria-haspopup="true"
      >
        <TextIcon color="white" size="md" weight="md">
          <Translate id="done" />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </>
  )
}

export default EditModeHeader
