

export function setByPath (obj: any, path: string, value: any, merge = false) {
  if (!path) return

  const parts = path.split('.')
  let cur = obj

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (typeof cur[key] !== 'object' || cur[key] === null) {
      cur[key] = {}
    }
    cur = cur[key]
  }

  const last = parts[parts.length - 1]

  if (merge && typeof cur[last] === 'object' && typeof value === 'object') {
    cur[last] = { ...cur[last], ...value }
  } else {
    cur[last] = value
  }
}
