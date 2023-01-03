export const interpolate = (params: { [key: string]: string }, str: string): string => {
  return new Function(...Object.keys(params), `return \`${str}\`;`)(...Object.values(params))
}
