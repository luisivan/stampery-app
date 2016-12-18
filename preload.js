const { ipcRenderer } = require('electron')

window.onload = () => {
  $('.top-bar.panel').css('-webkit-app-region', 'drag').css('-webkit-user-select', 'none')

  ipcRenderer.on('drop', (e, filename, data) => {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('drop', true, true)
    event.eventName = 'drop'
    const byteArray = new Uint8Array(data)
    const blob = new Blob([byteArray])
    const file = new File([blob], filename)
    Object.assign(event, {dataTransfer: { files: [file] } })
    window.dispatchEvent(event)
  })
}
