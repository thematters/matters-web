interface ModalInstanceProps {
  close: () => void
  closeable: boolean
  setCloseable: (value: boolean) => {}
  setModalClass: (value: string) => {}
}
