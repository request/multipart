'use strict'

var uuid = require('node-uuid')
  , BulkStream = require('bulk-stream')
var formdata = require('./form-data')


function multipart (options) {
  var boundary = getBoundary(options)

  return {
    contentType: setContentType(options, boundary),
    body: build(options, boundary)
  }
}

function getBoundary (options) {
  var header = options.contentType
    , boundary = options.boundary || uuid()

  if (header && header.indexOf('boundary') !== -1) {
    boundary = header.replace(/.*boundary=([^\s;]+).*/, '$1')
  }

  return boundary
}

function setContentType (options, boundary) {
  var header = options.contentType
    , type = (Array.isArray(options.multipart)) ? 'related' : 'form-data'

  if (!header) {
    header = 'multipart/' + type + '; boundary=' + boundary
  }
  if (header.indexOf('multipart') === -1) {
    header = 'multipart/' + type + '; ' + header
  }
  if (header.indexOf('boundary') === -1) {
    header = header + '; boundary=' + boundary
  }

  return header
}

function build (options, boundary) {
  var multipart = (Array.isArray(options.multipart))
    ? options.multipart
    : formdata.generate(options)
  var body = new BulkStream()

  if (options.preambleCRLF) {
    body.append('\r\n')
  }

  multipart.forEach(function (part) {
    var preamble = '--' + boundary + '\r\n'

    var headers = ''
    Object.keys(part).forEach(function (key) {
      if (key !== 'body') {
        headers += key + ': ' + part[key] + '\r\n'
      }
    })

    body.append(preamble + headers + '\r\n')
    body.append(part.body)
    body.append('\r\n')
  })
  body.append('--' + boundary + '--')

  if (options.postambleCRLF) {
    body.append('\r\n')
  }

  return body
}

module.exports = multipart
