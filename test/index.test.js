'use strict'

const validator = require('../index')
const format = require('util').format
// const assert = require('assert')
// const path = require('path')
// const fs = require('fs')

function test (options) {
  var args = options.args || []
  args.unshift(null)
  if (options.valid) {
    options.valid.forEach(function (valid) {
      args[0] = valid
      if (validator[options.validator](...args) !== true) {
        var warning = format('validator.%s(%s) failed but should have passed',
          options.validator, args.join(', '))
        throw new Error(warning)
      }
    })
  }
  if (options.invalid) {
    options.invalid.forEach(function (invalid) {
      args[0] = invalid
      if (validator[options.validator](...args) !== false) {
        var warning = format('validator.%s(%s) passed but should have failed',
          options.validator, args.join(', '))
        throw new Error(warning)
      }
    })
  }
}

// function repeat (str, count) {
//   var result = ''
//   while (count--) {
//     result += str
//   }
//   return result
// }

describe('Validators', () => {
  it('should validate domain name', () => {
    test({
      validator: 'isDomainName',
      valid: [
        'zhangmin.name',
        'zhangmin510.name',
        'a-9.0-z.nn',
        'aZsd.nn'
      ],
      invalid: [
        '-233.com',
        'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.x',
        'a-.xx',
        '-.xx',
        '#2.xx',
        '￥.com',
        '中国.cn'
      ]
    })
  })

  it('should validate SOA', () => {
    test({
      validator: 'isSOA',
      valid: [
        'ns1.dns.cn-east-1.internal hostmaster.zhangmin.name. 1 7200 1800 86400 60'
      ],
      invalid: [
        'ns1.dns.cn-east-1.internal hostmaster.zhangmin.name. 1 7200 1800 86400 xx'
      ]
    })
  })

  it('should validate A', () => {
    test({
      validator: 'isA',
      valid: [
        '127.0.0.1'
      ],
      invalid: [
        '256.1.23.257'
      ]
    })
  })

  it('should validate AAAA', () => {
    test({
      validator: 'isAAAA',
      valid: [
        '::1'
      ],
      invalid: [
        'xxxdd'
      ]
    })
  })

  it('should validate MX', () => {
    test({
      validator: 'isMX',
      valid: [
        '10 mail.example.com'
      ],
      invalid: [
        'mail.example.com'
      ]
    })
  })
})
