const assert = require('power-assert')

suite('Ch 3', () => {
  test('url pattern regex', () => {
    const urlPatternRegex = /^\/[a-z]+(\/[a-z]+(_[a-z]+)?\.php)?$/
    assert(urlPatternRegex.test('/foo/bar_qux.php') === true)
    assert(urlPatternRegex.test('/foo') === true)
    assert(urlPatternRegex.test('/foo/bar.php') === true)
    assert(urlPatternRegex.test('/foo/bar_.php') === false)
    assert(urlPatternRegex.test('/foo.php') === false)
  })

  test('email regex', () => {
    const emailRegex = /^[-\w.]{0,64}@([-a-zA-Z0-9]{1,63}\.)*[-a-zA-Z0-9]{1,63}$/
    assert(emailRegex.test('abc@somehost') == true)
    assert(emailRegex.test('abc@somehost.com') == true)
    assert(emailRegex.test('abc@some-host.com') == true)
    assert(emailRegex.test('i$@some-host.com') == false)
  })

  test('ip part regex', () => {
    const partRegex = /^((00)?[0-9]|0?[0-9]{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    assert(partRegex.test('192') == true)
    assert(partRegex.test('8') == true)
    assert(partRegex.test('256') == false)
    assert(partRegex.test('249') == true)
    assert(partRegex.test('99') == true)
  })

  test('tag regex', () => {
    const tagRegex = /^<('[^']*'|"[^"]*"|[^'">])+>$/
    assert(tagRegex.test("<img src=\"//mock.mock\">") == true)
    assert(tagRegex.test("<img src=\"\"\">") == false)
  })

  // `|` 的优先级比 `^` 和 `$` 低

  test('group', () => {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/
    const matches = dateRegex.exec('2018-12-24')
    assert(matches[1] === '2018')
    assert(matches[2] === '12')
    assert(matches[3] === '24')

    // 分组的编号是根据开括号的顺序进行编号的
    const nestedDateRegex = /^(((\d{4})-(\d{2}))-(\d{2}))$/
    const matches2 = nestedDateRegex.exec('2018-12-24')
    assert(matches2[1] === '2018-12-24')
    assert(matches2[2] === '2018-12')

    const hrefTagRegex = /^<a\s+href\s*=\s*['"]?([^"'\s]+)['"]?>([^<]+)<\/a>$/
    assert(hrefTagRegex.test("<a href='zhuscat.com'>Link</a>"))
    const matches3 = hrefTagRegex.exec("<a href='zhuscat.com'>Link</a>")
    assert(matches3[1] === 'zhuscat.com')
    assert(matches3[2] === 'Link')

    // 用 $1, $2...表达分组
    assert('2018-12-24'.replace(dateRegex, '$1年$2月$3日'), '2018年12月24日')

    // 3.3.1 反向引用
    assert(/^([a-z])$1$/.test('aa') == true)
    assert(/^([a-z])$1$/.test('ab') == false)

    // 忽略优先级量词 *？
  })
})
