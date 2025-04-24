export const getFileId = (file: File) =>
  `${file.name}-${file.size}-${file.type}-${file.lastModified}`
