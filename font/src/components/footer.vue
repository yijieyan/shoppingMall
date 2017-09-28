<template>
  <div class="footer">
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__region">
            <span>Region</span>
            <select class="footer__region__select">
              <option value="en-US">USA</option>
              <option value="zh-CN">China</option>
              <option value="in">India</option>
            </select>
          </div>
          <div class="footer__secondary__nav">
            <span>Copyright © 2017 IMooc All Rights Reserved.</span>
            <a href="https://nodejs.org/en/">
              nodejs
            </a>
            <a href="https://cn.vuejs.org/">
              vue
            </a>
            <a href="http://www.imooc.com/">
              慕课网
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'navFooter',
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
