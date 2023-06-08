import { Button, IconExternalLink16, TextIcon } from '~/components'

import styles from './styles.module.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <section className={styles.container}>
      <Button
        htmlHref={url}
        htmlTarget="_blank"
        textColor="greyDark"
        textActiveColor="green"
      >
        <TextIcon
          size="xs"
          spacing="xxtight"
          weight="normal"
          textPlacement="left"
          icon={<IconExternalLink16 size="xs" />}
        >
          {desc}
        </TextIcon>
      </Button>
    </section>
  )
}

export default About
