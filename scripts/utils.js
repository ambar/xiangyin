const unwrapQuote = (s) => s.replace(/^"(.*)"$/, '$1')

exports.csv2json = (values, opts = {}) => {
  const {skip} = {skip: 0, ...opts}
  const [th, ...rows] = values
    .slice(skip)
    .map((x) => x.split('\t').map(unwrapQuote))
  return rows.map((cells) =>
    Object.fromEntries(th.map((k, i) => [k, cells[i]?.trim() ?? '']))
  )
}
