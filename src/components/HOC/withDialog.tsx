export const withDialog = <D extends object>(
  WrappedComp: React.ComponentType<any>,
  DialogComp: React.ComponentType<any>,
  dialogCompProps: D,
  getWrappedCompProps: ({ openDialog }: { openDialog: () => void }) => any
) => {
  const WithDialogComp = (props: any) => (
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
