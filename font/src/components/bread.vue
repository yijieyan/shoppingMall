<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <span>{{name}}</span>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name
    },
    name: 'bread',
    data() {
      return {}
    }
  }
</script>

<style scoped></style>
