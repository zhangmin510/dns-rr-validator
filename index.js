'use strict'

const debug = require('debug')('dns-rr-validator')

module.exports = {
  isDomainName,
  isFQDN,
  isA,
  isAAAA,
  isMX,
  isCNAME,
  isSOA,
  isNS
}

function isDomainName (name, opts) {
  opts = opts || {}

  debug('domain name: ', name, opts)

  if (!name) {
    return false
  }

  const len = name.length
  if (len > 255) {
    return false
  }

  if (opts.allowTrailingDot && name[len - 1] === '.') {
    name = name.substring(0, len - 1)
  }

  const labels = name.split('.')
  debug('labels: ', labels)
  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    if (label[0] === '-' || label[label.length - 1] === '-') {
      return false
    }

    if (!/^[a-zA-Z0-9-]{0,63}$/.test(label)) {
      return false
    }
  }

  return true
}

function isFQDN (name) {
  return true
}

function isAAAA (ipv6) {
  return true
}

function isA (ipv4) {
  return true
}

function isMX (mx) {
  return true
}

function isSOA (mx) {
  return true
}

function isNS (mx) {
  return true
}

function isCNAME (mx) {
  return true
}
