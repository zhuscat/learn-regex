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
})
