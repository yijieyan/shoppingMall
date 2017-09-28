<template>
  <div>
    <nav-header></nav-header>
    <nav-bread name="Goods"></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" @click="sort($event)" :class="flag == '0'? 'cur': ''">Default</a>
          <a href="javascript:void(0)" class="price" @click="sort($event)" :class="flag == '1' ? 'cur' : ''">Price</a>
          <!--<svg class="icon icon-arrow-short">-->
          <!--<use xlink:href="#icon-arrow-short"></use>-->
          <!--</svg>-->
          <!--</a>-->
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd v-for="(item , index) in priceRange" :key="index">
                <a href="javascript:void(0)" @click="selectPrice($event, index)"
                   :class="index == selectPriceIndex ?  'selectPriceClass' : '' ">{{item}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goods" :key="index">
                  <div class="pic">
                    <a href="#"><img :src="'static/' + item.pic" :alt="item.productName"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.price | currency('￥')}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="jumpCart(item._id, index)"
                         :class="index == selectCartIndex? 'selectCartClass': '' ">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
                 class="view-more-normal">
              <img src="../assets/loading-spinning-bubbles.svg" alt="loading" v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal v-if="cartModal" :mdShow="cartModal" @closeModal="closeCart">
      <p slot="message" style="ont-size: 20px;font-weight: 900;">
        加入购物车成功
      </p>
      <div slot="btnGroup">
        <button class="btn" @click="closeCart">继续购物</button>
        <button class="btn" @click="confirmJoinCart">去购物车</button>
      </div>
    </modal>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import http from '../services/APIServer';
  import navHeader from '../components/head';
  import navFooter from '../components/footer';
  import navBread from '../components/bread';
  import modal from '../components/modal';
  import {currency} from '../assets/util/currency.js'
  import {checkPhone, checkEmail, setSessionStorage, getSessionStorage} from '../assets/util/currency.js'

  export default {
    name: 'goodList',
    data() {
      return {
        goods: [],
        flag: 0,
        priceRange: ['All', '0 - 100', '100 - 500', '500 - 2500', '2500 - 10000'],
        selectIndex: 0,
        selectPriceIndex: 0,
        selectCartIndex: 'a',
        loginModal: false,
        busy: false,
        loading: false,
        account: '',
        password: '',
        cartModal: false,
        cartId: ''
//        page: 1
      }
    },
    components: {
      navHeader,
      navFooter,
      navBread,
      modal
    },
    mounted() {
      this.init();
      String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, '');
      };
    },
    filters: {
      currency(a, b) {
        return currency(a, b)
      }
    },
//    computed: {
//      loginState() {
//        let flag = this.$store.state.login.flag;
//        if(flag) {
//          this.loginModal = true;
//        }else {
//          this.loginModal = false;
//        }
//      }
//    },
    methods: {
      init(flag = 0, range, page, load) {
        let sortBy;
        let gte;
        let lt;
        if (flag == 0) {
          sortBy = 'createdAt'
        } else if (flag == 1) {
          sortBy = 'price';
        }
        if (range && range.length != 0 && range[0] != 'All') {
          gte = range[0].trim();
          lt = range[1].trim();
        }

        let params = {sortBy, gte, lt, page};
        http.get('/good/productList', params).then(res => {
          if (load) {
            this.goods = this.goods.concat(res.data);
            this.loading = false;
            if (this.busy) { //如果滚动加载被禁止，则打开
              this.busy = false;
            }
            if (res.data.length < 4) { //如果返回的数据小于4条，说明是最后一次请求，没数据了,把禁止滚动加载
              this.busy = true;
            }
          } else {
            this.goods = res.data;
          }

        })
      },
      sort(e) {
        if (e.target.innerText == 'Default') {
          this.flag = 0;
          this.init(0);
        } else if (e.target.innerText == 'Price') {
          this.init(1);
        }
      },
      selectPrice(e, index) {
        let flag = this.flag;
        this.selectIndex = index;
        this.selectPriceIndex = index;
        let range = e.target.innerText.split('-');
        this.init(flag, range);
      },
      jumpCart(id, index) {
        let count = this.$store.state.user.count;
        this.$store.dispatch('setCount', ++count);
        this.selectCartIndex = index;
        this.cartId = id;
        this.cartModal = true;
      },
      loadMore: function () {
        this.busy = true;
//        this.loading = true;
//        this.page++;
//        let page = this.page;
//        console.log(page);
        setTimeout(() => {
//          this.init(this.flag, '', page, 'load');
//          this.busy = false;
        }, 1000);
      },
      close() {
        this.loginModal = false;
        this.$store.dispatch('clickLogin', false);
      },
      closeCart() {
        http.post('/users/addGood', {id: this.cartId}).then((res) => {
          if (res.code == 0) {
            this.cartModal = false;
          }
        });
      },
      confirmJoinCart() {
        http.post('/users/addGood', {id: this.cartId}).then((res) => {
          if (res.code == 0) {
            this.cartModal = false;
            this.$router.push({path: '/cart', query: {id: this.cartId}});
          }
        });

      }
    }
  }
</script>

<style scoped>
  .nav-breadcrumb-wrap {
    text-align: left;
  }

  .selectPriceClass {
    color: #ef8b35;
  }

  .selectCartClass {
    background: #faa363;
  }

  .bt {
    width: 80px;
    height: 40px;
    font-size: 14px;
    border: 1px solid blue;
    border-radius: 5px;
    margin-right: 10px;
  }

  .input {
    width: 80%;
    margin-left: 20px;
    margin-top: 10px
  }

  .label {
    display: block;
  }

</style>
