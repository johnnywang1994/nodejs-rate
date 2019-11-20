<template>
  <!-- App -->
  <div id="view-stock" class="container">

    <!--Control Panel-->
    <div class="form-inline mt-4" style="max-width: 300px;">
      <input type="text" 
        class="form-control mr-2" 
        style="width: 230px;"
        v-model="searchStr"
        placeholder="請輸入代號，如2882,2887"
      >
      <button class="btn btn-primary" @click="search">刷新</button>
    </div>
    <!--Control Panel End-->

    <!--Loading-->
    <div v-if="loading">Now Loading...</div>
    <!--Loading End-->

    <div class="row my-5">
      <!--Stock Unit-->
      <div class="stock-unit col-md-3 col-sm-6 col-12" 
        v-for="item in stockInfo.data" 
        :key="item.name"
      >
        <table class="table table-sm">
          <tr class="table-active"><th>簡稱</th><td>{{ item.name }}</td></tr>
          <tr><th>單量</th><td>{{ item.unit }}</td></tr>
          <tr><th>成交價</th><td>{{ item.nowPrice }}</td></tr>
          <tr><th>昨收價</th><td>{{ item.yesterdayPrice }}</td></tr>
          <tr><th>最低價</th><td>{{ item.lowPrice }}</td></tr>
          <tr><th>最高價</th><td>{{ item.highPrice }}</td></tr>
          <tr><th>漲跌</th><td>{{ item.percent }}</td></tr>
          <tr><th>總量</th><td>{{ item.total }}</td></tr>
          <tr><th>開盤價</th><td>{{ item.openPrice }}</td></tr>
        </table>
      </div>
      <!--Stock Unit End-->
    </div>
    
  </div>
  <!-- App End -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      searchStr: '',
      stockInfo: {}
    };
  },
  methods: {
    ...mapActions('App', ['getStock']),
    search() {
      this.stockInfo = {}
      this.loading = true
      this.getStock(this.searchStr)
        .then(res => {
          this.stockInfo = res.data
          this.loading = false
        });
    }
  }
}
</script>

<style>

</style>