<template>
  <div class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1"
            d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2"
            d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3"
            d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4"
            d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="../assets/images/logo.png" style="width:200px;height:80px;"></a>
      </div>
      <div class="navbar-right-container">
        <div class="navbar-menu-container">
          <a href="javascript:void(0)" class="navbar-link" @click="clickSignIn" v-if="!username">Login</a>
          <a href="javascript:void(0)" class="navbar-link" v-show="username" :a="getUserInfo" style="color: #ff6500">{{username}} </a>
          <a href="javascript:void(0)" class="navbar-link" @click="signOut" v-if="username">Logout</a>
          <div class="navbar-cart-container">
            <a class="navbar-link navbar-cart-link parent" href="/#/cart">
              <span class="child" v-if="count> 0">{{count}}</span>
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>


    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <label for="account" class="label">
              <span>账号:</span>
              <input type="text" name="account" id="account" placeholder="请输入您的邮箱或手机号" class="input" v-model="account"/>
            </label>
            <label for="password" style="display: block;">
              <span>密码:</span>
              <input type="password" name="password" id="password" placeholder="请输入您的密码" class="input"
                     v-model="password"/>
            </label>
          </div>
          <div class="btn-wrap">
            <button class="bt" @click="signIn">登陆</button>
            <button class="bt" @click="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>


</template>

<script>
  import http from '../services/APIServer.js';
  import {
    deleteSessionStorage,
    getSessionStorage,
    checkEmail,
    checkPhone,
    setSessionStorage
  } from '../assets/util/currency.js'

  export default {
    name: 'navHeader',
    data() {
      return {
        account: '',
        password: '',
        username: '',
        mdShow: false
      }
    },
    mounted() {
      this.username ? this.getCartCount() : '';
    },
    computed: {
      getUserInfo() {
        this.username = this.$store.state.user.info.username || getSessionStorage('shopToken').username;
      },
      count() {
        return this.$store.state.user.count;
      }
    },
    methods: {
      clickSignIn() {
        this.mdShow = true;
      },
      signIn() {
        let that = http;
        let account = this.account;
        let password = this.password;
        let phone, email;
        if (checkPhone(account)) {
          phone = account;
        } else if (checkEmail(account)) {
          email = account;
        } else {
          alert('你输入的账号不合法');
        }
        http.post('/public/signIn', {phone, email, password}).then((res) => {
          if (res.code == 0) {
            this.mdShow = false;
            this.$store.dispatch('setUser', res.data);
            that.setDefaultHeader(res.data.token);
            setSessionStorage('shopToken', res.data)
            this.getCartCount();
          }
        })
      },
      signOut() {
        http.post('/users/signOut').then((res) => {
          if (res.code == 0) {
            this.$store.dispatch('removeUser');
            this.$store.dispatch('setCount', 0);
            deleteSessionStorage('shopToken');
          }
        })
      },
      signUp() {
        let account = this.account;
        let password = this.password;
        let phone, email;
        if (checkPhone(account)) {
          phone = account;
        } else if (checkEmail(account)) {
          email = account;
        } else {
          alert('你输入的账号不合法');
        }
        http.post('/public/signUp', {phone, email, password}).then((res) => {
          if (res.code == 0) {
            this.mdShow = false;
          }
        })
      },
      getCartCount() {
        http.get('/users/getCartCount').then((res) => {
          if (res.code == 0) {
            this.$store.dispatch('setCount', res.data.count);
          }
        })
      },
      closeModal() {
        this.mdShow = false;
      }
    }
  }
</script>

<style scoped>
  .navbar {
    position: relative;
    height: 80px;
  }

  .navbar-left-container {
    position: absolute;
    left: 20px;
  }

  img {
    display: block;
  }

  .navbar-menu-container {
    position: absolute;
    right: 20px;
    height: 80px;
    padding-top: 20px;
  }

  a {
    display: inline-block;
    width: 100px;
    vertical-align: middle;
  }

  .navbar-cart-container {
    display: inline-block;
  }

  svg {
    height: 30px;
    width: 100px;
    display: block;
  }

  .parent {
    position: relative;
  }

  .child {
    position: absolute;
    top: -9px;
    right: 28px;
    vertical-align: top;
    display: block;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    color: #f5f7fc;
    opacity: 0.7;
    line-height: 20px;
    text-align:center;
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
