<template>
  <!-- App -->
  <div id="dollar-rate" class="container">

    <!--Control Panel-->
    <div class="my-4">

      <div class="form-inline">
        <label for="search">搜尋幣別：</label>
        <input type="text" class="form-control" v-model="filteValue" @keyup="filter" />
      </div>

      <div class="form-inline mt-3">
        <label for="search">兌換試算：</label>
        <select class="form-control mr-3" v-model="cashType">
          <option value="cash">現金交易</option>
          <option value="recent">網路交易</option>
        </select>
        <select class="form-control" v-model.number="exchange.rate.from">
          <option value="1">台幣（NTD）</option>
          <option v-for="item in rateInfo.data"
            :key="'1'+item.title"
            :value="item[cashType].buy"
            :disabled="item[cashType].buy === '-'"
          >{{ item.title }}</option>
        </select>
        <input type="text" class="form-control" v-model.number="exchange.quality">
        -->
        <select class="form-control" v-model="exchange.rate.to">
          <option value="1">台幣（NTD）</option>
          <option v-for="item in rateInfo.data"
            :key="'2'+item.title"
            :value="item[cashType].sale"
            :disabled="item[cashType].sale === '-'"
          >{{ item.title }}</option>
        </select>
        <input type="text" class="form-control" v-model="exchangeResult">
      </div>

    </div>
    <!--Control Panel End-->

    <!--Loading-->
    <div v-if="loading">Now Loading...</div>
    <!--Loading End-->

    <!--Rate Table-->
    <div id="rate-table" v-if="!loading">
      <table class="table table-sm table-striped table-hover">
        <tr class="table-primary">
          <th>幣別</th><th>本行現金買入</th><th>本行現金賣出</th><th>本行即期買入</th><th>本行即期賣出</th>
        </tr>
        <tr class="dollar-row" v-for="item in rateInfo.data" :key="item.title">
          <td class="dollar-title">{{ item.title }}</td>
          <td>{{ item.cash.buy }}</td>
          <td>{{ item.cash.sale }}</td>
          <td>{{ item.recent.buy }}</td>
          <td>{{ item.recent.sale }}</td>
        </tr>
      </table>
    </div>
    <!--Rate Table End-->

  </div>
  <!-- App End -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      filteValue: '',
      cashType: 'cash',
      exchange: {
        rate: {
          from: 1,
          to: 1
        },
        quality: 0
      },
      rateInfo: {}
    }
  },
  computed: {
    exchangeResult() {
      const ex = this.exchange
      return ((ex.rate.from * ex.quality) / ex.rate.to).toFixed(2)
    }
  },
  methods: {
    ...mapActions('App', ['getRate']),
    search() {
      this.getRate()
        .then(res => {
          if (res.data.msg) return alert(res.data.msg);
          this.rateInfo = res.data
          this.loading = false
        });
    },
    filter(){
      const vm = this

      let rows = document.getElementsByClassName('dollar-row');
      let titles = document.getElementsByClassName('dollar-title');
      for (let i=0;i<rows.length;i++){
        if (titles[i].innerHTML.indexOf(vm.filteValue) === -1){
          rows[i].classList.add('unvisible');
        } else {
          rows[i].classList.remove('unvisible');
        }
      }
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style lang="scss" scoped>
.unvisible {
  display: none;
}
</style>