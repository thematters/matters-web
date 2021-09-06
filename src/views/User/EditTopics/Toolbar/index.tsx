import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  IconDelete24,
  IconHide24,
  IconLock24,
  IconMove24,
  IconUnlock24,
  LanguageContext,
  Translate,
} from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

type ToolbarProps = {
  editing: boolean
  selected: boolean
  onEdit: () => void
  onCancel: () => void
  onHide: () => void
  onPaywalled: () => void
  onPublic: () => void
  onMove: () => void
  onDelete: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  editing,
  selected,
  onEdit,
  onCancel,
  onHide,
  onPaywalled,
  onPublic,
  onMove,
  onDelete,
}) => {
  const { lang } = useContext(LanguageContext)

  if (editing) {
    return (
      <header>
        <Button
          bgColor="grey-lighter"
          spacing={['xxtight', 'tight']}
          onClick={onEdit}
        >
          <Translate id="edit" />
        </Button>

        <style jsx>{styles}</style>
      </header>
    )
  }

  const actionButtonProps: ButtonProps = {
    spacing: ['xtight', 'xtight'],
    bgActiveColor: 'grey-lighter-active',
    disabled: !selected,
  }

  return (
    <header>
      <Button
        bgColor="grey-lighter"
        spacing={['xxtight', 'tight']}
        onClick={onCancel}
      >
        <Translate id="cancel" />
      </Button>

      <section className="actions">
        <Button
          {...actionButtonProps}
          onClick={onHide}
          aria-label={translate({
            zh_hant: '隱藏主題',
            zh_hans: '隐藏主题',
            en: 'Hide topics',
            lang,
          })}
        >
          <IconHide24 size="md" />
        </Button>
        <Button
          {...actionButtonProps}
          onClick={onPaywalled}
          aria-label={translate({
            zh_hant: '上鎖作品',
            zh_hans: '上锁作品',
            en: 'Paywall articles',
            lang,
          })}
        >
          <IconLock24 size="md" />
        </Button>
        <Button
          {...actionButtonProps}
          onClick={onPublic}
          aria-label={translate({
            zh_hant: '公開作品',
            zh_hans: '公开作品',
            en: 'Public articles',
            lang,
          })}
        >
          <IconUnlock24 size="md" />
        </Button>
        <Button
          {...actionButtonProps}
          onClick={onMove}
          aria-label={translate({
            zh_hant: '移動作品',
            zh_hans: '移动作品',
            en: 'Move articles',
            lang,
          })}
        >
          <IconMove24 size="md" />
        </Button>
        <Button
          {...actionButtonProps}
          onClick={onDelete}
          aria-label={translate({
            zh_hant: '移出作品',
            zh_hans: '移出作品',
            en: 'Remove articles from topics',
            lang,
          })}
        >
          <IconDelete24 size="md" />
        </Button>
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

export default Toolbar
