var app = new Vue({
  el: '#app',
  data: {
    bpi: null,
    hasError: false,
    loading: true
  },
  mounted: function () {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(function (response) {
        // console.log(this)
        // console.log(response.data.bpi.USD.rate_float)
        this.bpi = response.data.bpi
      }.bind(this))
      .catch(function (error) {
        console.log(error)
        this.hasError = true
      }.bind(this))
      .finally(function () {
        this.loading = false
      }.bind(this))
  },
  filters: {
    currencyDecimal(value) {
      return value.toFixed(2)
    }
  }
})

// **thisの考え方**
// https://uxmilk.jp/30476
// https://qiita.com/takkyun/items/c6e2f2cf25327299cf03

// thisを含む関数がグローバルスコープ（functionなどの外）で呼ばれた場合、
// thisはグローバルオブジェクトを参照する。（ここではブラウザのwindowオブジェクト）
// （function内のthisはグローバルオブジェクトであるwindowオブジェクトを参照している。）
// bindメソッドでfunction内のthisが参照する先を変更している。
// .bind(this)のthisはVueインスタンスのこと。つまりthis.bpiのthisは通常であれば、
// グローバルオブジェクトであるwindowオブジェクトを参照してしまうが、.bind(this)の
// 記述でVueインスタンス内のdataオプションのbpiと紐づくことが出来る。