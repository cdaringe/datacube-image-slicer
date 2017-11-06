var fs = require('fs')
var brain = require('./brain.pretty.json')
fs.writeFileSync('./brain.pretty.unpretty.json', JSON.stringify(brain))
