<template>
  <Sidebar />
</template>

<script>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

export default {
    components: { Header, Sidebar }
}
</script>

<style scoped>
  body {
    background: #fff !important;
  }
</style>