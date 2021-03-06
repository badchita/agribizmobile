import md5 from 'md5'
import moment from 'moment'
export default {
  parseError(err) {
    const errors = err && err.response && err.response.data ? err.response.data.errors : []
    if (errors && errors[0] && errors[0].title) {
      return Object.values(errors)
    }
    console.log(err)
    return [{
      title: 'Unknown Error, Reload the page and try again.'
    }]
  },
  initUser() {
    const user = this.$store.getters['user/user']
    if (user && user.id) {
      return Promise.resolve()
    }
    return this.$store.dispatch('user/fetchUser', this.$store.getters['auth/userId'])
      .catch(err => Promise.reject(err))
  },
  firstLetterUpper(s) {
    return !s || !s.length || s[0].toUpperCase()
  },
  hash(s) {
    return md5(s)
  },
  isEqualObjects(o1, o2) {
    return JSON.stringify(o1) === JSON.stringify(o2)
  },
  displayAddress(addr1, addr2 = '', addr3 = '', addr4 = '', postal = '', country = '') {
    var addr = ''
    if (addr1 != '') addr = addr1

    if (addr2 != '') {
      if (addr) addr += ' '
      addr += addr2
    }

    if (addr3 != '') {
      if (addr) addr += ' '
      addr += addr3
    }

    if (addr4 != '') {
      if (addr) addr += ' '
      addr += addr4;
    }

    if (country != '') {
      if (addr) addr += ' '
      addr += country;
    }

    if (postal != '') {
      if (addr) addr += ' '
      addr += postal
    }

    return addr
  },
  numberWithCommaFormatt(number) {
    var n = parseFloat(number).toFixed(2)
    var withComma = Number(n).toLocaleString('en')
    return withComma
  },
  anonymousWord(word) {
    if (word.length < 3) return word
    return word.substring(0, 2) + '*'.repeat(word.length - 2)
  },
  formatDate(value, format) {
    if (value) {
      var date = moment.unix(value)
      if (!date.isValid()) {
        date = moment(value)
      }
      if (format) {
        return moment(date).format(format)
      } else {
        return moment(date).format('MM/DD/YYYY hh:mm A')
      }
    }
    return ''
  },
}