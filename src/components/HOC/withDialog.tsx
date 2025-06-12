export const withDialog = <D extends object>(
  WrappedComp: React.ComponentType<object>,
  DialogComp: React.ComponentType<
    D & { children: (props: { openDialog: () => void }) => React.ReactNode }
  >,
  dialogCompProps: D,
  getWrappedCompProps: ({ openDialog }: { openDialog: () => void }) => object
) => {
  const WithDialogComp = (props: object) => (
    <DialogComp {...dialogCompProps}>
      {({ openDialog }: { openDialog: () => void }) => (
        <WrappedComp {...props} {...getWrappedCompProps({ openDialog })} />
      )}
    </DialogComp>
  )

  WithDialogComp.displayName = `withDialog(${
    WrappedComp.displayName || WrappedComp.name
  })`

  return WithDialogComp
}
