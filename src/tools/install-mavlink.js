/* Download and decompress automatically generated MAVLink bindings */

/* eslint-disable @typescript-eslint/no-var-requires */
const https = require('follow-redirects').https
const unzip = require('node-unzip-2')

const urlRelease =
  'https://github.com/wut-daas/oblot-embedded/releases/latest/download/mavlink-oblot-ts.zip'

https.get(urlRelease, function(response) {
  console.log(response.statusCode)
  response.pipe(unzip.Extract({ path: 'src' }))
})
