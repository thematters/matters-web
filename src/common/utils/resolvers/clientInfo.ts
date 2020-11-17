const clientInfoResolver = () => {
  return {
    id: 'local',
    viewportSize: {
      width: null,
      height: null,
      __typename: 'ViewportSize',
    },
    __typename: 'ClientInfo',
  }
}

export default clientInfoResolver
