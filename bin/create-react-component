#!/usr/bin/env node

/* eslint-env node */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ncp = require('ncp').ncp

const log = msg => console.log(`
${msg}`)

const [,, ...args] = process.argv
const [componentName, ...parts] = args[0].split('/').reverse()
const componentPath = path.resolve(parts.reverse().join('/'))

try {
  fs.accessSync(componentPath)
} catch (e) {
  log(chalk.red(`The directory "${chalk.underline(componentPath)}" does not exist.`))
  process.exit(1)
}

try {
  const doesExist = !fs.accessSync(path.join(componentPath, componentName))
  if (!fs.accessSync(path.join(componentPath, componentName))) {
    log(chalk.red(`The directory "${chalk.underline(componentPath)}" already exists.`))
    process.exit(1)
  }
} catch (e) {

}

const source = path.join(path.dirname(__dirname), 'src', 'Demo')
const destination = path.resolve(args[0])

log(chalk.blue(`Creating a new component in ${args[0]}...`))

fs.mkdirSync(destination)

ncp(source, destination, (err) => {
  if (err) {
    return log(err)
  }

  log(`${chalk.green(`The component <${componentName} /> was created!`)}

Include it in your application:

<YourApp>
  <${componentName} />
</YourApp>

And tweak the components at your convenience. Enjoy building awesome React apps!
  `)
})
