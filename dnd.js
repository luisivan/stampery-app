const fs = require('fs')
const path = require('path')

class DnDHandler {
  constructor(app, win) {
    app.on('open-file', (e, p) => {
      e.preventDefault()
      fs.readFile(p, (err, data) => {
        if (err) throw err
        win.webContents.send('drop', path.basename(p), data)
      })
    })
  }
}

module.exports = DnDHandler
