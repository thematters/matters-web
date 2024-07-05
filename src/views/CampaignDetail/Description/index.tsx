import styles from './styles.module.css'

const Description = ({ description }: { description: string }) => {
  return (
    <section
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
}

export default Description
