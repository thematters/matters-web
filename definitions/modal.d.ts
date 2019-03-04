interface ModalInstanceProps {
  close: () => void
  interpret: () => string
  closeable: boolean
  setCloseable: (value: boolean) => {}
}
