/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const mavlinkPath = 'src/assets/mavlink/'
const messagePath = mavlinkPath + 'messages/'
const registryPath = mavlinkPath + 'message-registry.ts'
const outFile = fs.createWriteStream(mavlinkPath + 'strict-messages.ts')

const regexName = /export class (?<msgClass>\w+) extends MAVLinkMessage[^]*public _message_name: string = '(?<msgName>\w+)';/
const regexImport = /(import {[\w]*} from '.\/messages\/[\w-]*';)/g

async function parseMessages(messageDir) {
  const filenames = await fs.promises.readdir(messageDir)
  const messages = await Promise.all(
    filenames.map(fname => {
      return fs.promises
        .readFile(messagePath + fname, { encoding: 'utf-8' })
        .then(text => {
          return { ...regexName.exec(text).groups }
        })
    })
  )
  return messages
}

const importLines = [
  ...fs.readFileSync(registryPath, 'utf-8').matchAll(regexImport),
]
for (const line of importLines) {
  outFile.write(line[0] + '\n')
}
outFile.write('\n')

outFile.write('export interface StrictMessages {\n')
parseMessages(messagePath).then(messages => {
  for (const msg of messages) {
    outFile.write(`  ${msg.msgName}: ${msg.msgClass}\n`)
  }
  outFile.write('}\n')
  outFile.end()
  console.log(`Written ${messages.length} messages to StrictMessages`)
})
