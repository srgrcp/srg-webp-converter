export const dropEventPayloadMock = {
  dataTransfer: {
    clearData: () => {},
    items: {
      clear: () => {},
      length: 1,
      0: {
        kind: 'file',
        type: 'image/png',
        getAsFile: () => ({
          path: 'test.png',
          size: 123123,
        }),
      },
    },
  },
}
