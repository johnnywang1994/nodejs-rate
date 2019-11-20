<template>
  <!--App-->
  <div id="money-news" class="container mt-4">
    <!--Type Navbar-->
    <div class="btn-group d-flex justify-content-center my-3">
      <button class="btn btn-success" 
        :class="{'active': breakType === type}"
        v-for="type in breakNewsTypes" 
        :key="'type_'+type"
        @click="breakType = type"
      >{{ type }}</button>
    </div>
    <!--Type Navbar End-->

    <!--News Block-->
    <div class="row">
      <!--Left-->
      <div class="first-news col-md-6 col-12">

        <div v-if="loading.first">Now Loading...</div>

        <a class="card" :href="firstNews.link" target="_blank" v-if="!loading.first">
          <img class="card-image-top" :src="firstNews.imageUrl" :alt="firstNews.title">
          <div class="card-body">
            <h4 class="card-title">{{ firstNews.title }}</h4>
          </div>
        </a>

        <div class="btn-group d-flex justify-content-center mt-3" v-if="!loading.break">
          <button class="btn btn-primary" @click="changePage(false)">上一頁</button>
          <button class="btn btn-primary" @click="changePage">下一頁</button>
        </div>

      </div>

      <!--Right-->
      <div class="break-news col-md-6 col-12 mt-md-0 my-4" style="height: 600px;overflow: auto;">

        <div v-if="loading.break">Now Loading...</div>

        <ul class="list-group" v-if="!loading.break">
          <li class="list-group-item" style="padding-bottom: 0;" v-for="news in breakTypeFilter" :key="news.title">
            <a :href="news.link" target="_blank">
              <h5>{{ news.title }}</h5>
              <p class="text-secondary">{{ news.type + '-' + news.datetime }}</p>
            </a>
          </li>
        </ul>

      </div>
    </div>
    <!--News Block End-->
  </div>
  <!--App End-->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: {
        first: true,
        break: true
      },
      firstNews: {},
      breakNews: [],
      page: 1,
      breakType: '不分類'
    };
  },
  computed: {
    breakTypeFilter() {
      if (this.breakType === '不分類') return this.breakNews;

      return this.breakNews.filter(news => {
        return news.type === this.breakType;
      })
    },
    breakNewsTypes() {
      let types = []

      this.breakNews.forEach(news => {
        return types.push(news.type)
      })

      return ['不分類', ...new Set(types)]
    }
  },
  methods: {
    ...mapActions('App', ['getFirstMoneyNews', 'getBreakMoneyNews']),
    getFirst() {
      this.getFirstMoneyNews()
        .then((res) => {
          this.firstNews = res.data.data
          this.loading.first = false
        })
    },
    getBreak(page) {
      this.loading.break = true
      this.getBreakMoneyNews(page)
        .then(res => {
          this.breakNews = res.data.data
          this.loading.break = false
        })
    },
    changePage(next = true) {
      if (!next && this.page === 1) return alert('已經無上一頁');
      next ? this.page++ : this.page--;
      this.getBreak(this.page)
    }
  },
  mounted() {
    this.getFirst()
    this.getBreak(this.page)
  }
}
</script>

<style>

</style>