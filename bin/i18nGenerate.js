const fs = require('fs')

const sort = (o) => {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {})
}

const generate = (source, target) => {
  const newTarget = { ...target }

  // Finding keys missing in target and copying them from source
  for (let key in source) {
    if (!target.hasOwnProperty(key)) {
      newTarget[key] = source[key]
    }
  }

  // Removing keys missing in source from target
  for (let key in target) {
    if (!source.hasOwnProperty(key)) {
      delete newTarget[key]
    }
  }

  return sort(newTarget)
}

// read source file
const source = JSON.parse(fs.readFileSync('./lang/default.json', 'utf8'))

// read target file
const locales = ['zh-Hant', 'zh-Hans', 'en']
const target = {}
for (let locale of locales) {
  target[locale] = JSON.parse(fs.readFileSync(`./lang/${locale}.json`, 'utf8'))
}

// genearte new target file
for (let locale of locales) {
  fs.writeFileSync(
    `./lang/${locale}.json`,
    JSON.stringify(generate(source, target[locale]), null, 2),
    'utf8'
  )
}
