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
  // TODO: fqdn, punny code
  return true
}

function isAAAA (ipv6) {
  const ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i
  return ipv6Regex.test(ipv6)
}

function isA (ipv4) {
  const ip4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
  return ip4Regex.test(ipv4)
}

function isMX (mx) {
  if (!mx) {
    return false
  }

  const parts = mx.split(/\s+/)
  if (!/\d/.test(parts[0])) {
    return false
  }

  return isDomainName(parts[1])
}

function isSOA (soa) {
  if (!soa) {
    return false
  }
  const parts = soa.split(/\s+/)

  for (let i = 0, len = parts.length; i < len; i++) {
    if (i === 0 || i === 1) {
      if (!isDomainName(parts[i])) {
        return false
      }
    } else {
      if (!/\d+/.test(parts[i])) {
        return false
      }
    }
  }
  return true
}

function isNS (ns) {
  return isDomainName(ns)
}

function isCNAME (cname) {
  return isDomainName(cname)
}
