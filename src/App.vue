<template>
  <div class="box">
    <p class="text">{{ message }}</p>
    <p>less 生效了</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<style scoped lang="less">
@fontSize: 20px;
@color: #090;

.box {
  color: @color;
  .flex(row);
  justify-content: space-between;
}
</style>
