import React from 'react'

import {
  IconDonate24,
  IconExpand16,
  IconExternalLink16,
  IconPin24,
  TextIcon,
  Translate,
} from '~/components'

const Toasts = () => (
  <section>
    <ul>
      <li>
        <TextIcon icon={<IconPin24 size="md" />} size="md" spacing="base">
          <Translate id="stickyArticle" />
        </TextIcon>
      </li>

      <li>
        <TextIcon
          icon={<IconDonate24 size="md-s" />}
          weight="md"
          spacing="xtight"
          size="sm"
        >
          100
        </TextIcon>
      </li>

      <li>
        <TextIcon icon={<IconExternalLink16 color="grey" size="sm" />} />
      </li>

      <li>
        <TextIcon
          icon={<IconExpand16 size="xs" />}
          textPlacement="left"
          weight="normal"
          color="grey"
        >
          <Translate zh_hant="打開" zh_hans="展开" />
        </TextIcon>
      </li>

      <li>
        <TextIcon
          color="grey-dark"
          size="sm"
          weight="normal"
          textPlacement="left"
          textDecoration="underline"
        >
          <Translate
            zh_hant="改使用 Google 搜尋關鍵字"
            zh_hans="改使用 Google 搜索关键字"
          />
        </TextIcon>
      </li>
    </ul>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        padding: var(--spacing-base);
      }
    `}</style>
  </section>
)

export default Toasts
