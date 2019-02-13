<template>
  <p class="name">My name is {{ name }}!</p>
</template>

<script>
module.exports = {
  data () {
    return {
      name: 'Test'
    }
  }
}
</script>

<style>
.name {
  font-size: 12px;
  text-align: center;
}
</style>