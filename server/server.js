const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')

const isDev = process.env.NODE_ENV === 'development' // 服务端代码热更新
const app = express()

app.use(favicon(path.join(__dirname, '../favicon.ico'))) // icon

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    const Tem = template.replace('<div></div>', appString)
    res.send(Tem)
  })
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listening on 3333')
})
