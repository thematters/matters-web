const pattern = /^(:?\/\/|https?:\/\/)?([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/;

export const extractDomain = (url: string) => {
  const parts = url.match(pattern) || [];
  return parts[3];
};
