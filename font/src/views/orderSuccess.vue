<template>
  <div>
    <navHeader></navHeader>
    <bread name="order"></bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{id}}</span>
            <span>Order total：{{price | currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <a href="javascript:;" class="btn btn--m" @click="cartList">Cart List</a>
            </div>
            <div class="btn-r-wrap">
              <a href="javascript:;" class="btn btn--m" @click="goodList">Goods List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <navFooter></navFooter>
  </div>
</template>
<script>
  import navHeader from '../components/head.vue';
  import navFooter from '../components/footer.vue';
  import bread from '../components/bread.vue';
  import http from '../services/APIServer';
  import {currency} from '../assets/util/currency'

  export default {
    name: 'order',
    data() {
      return {
        id: '',
        price: ''
      }
    },
    components: {
      navHeader,
      navFooter,
      bread
    },
    filters: {
      currency(a, b) {
        return currency(a, b)
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      this.init();
    },
    methods: {
      init() {
//        let id = this.$route.query.id;
        let id = this.id;
        http.get('/order/getOrder', {id}).then((res) => {
          if (res.code == 0) {
            this.id = res.data.id;
            this.price = res.data.price;
          }
        })
      },
      cartList() {
        this.$router.push({path: '/cart'});
      },
      goodList() {
        this.$router.push({path: '/'});
      }
    }
  }
</script>

<style scoped>

</style>
