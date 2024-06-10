<!-- Toast.vue -->
<template>
  <div v-if="isVisible" class="toast">
    {{ message }}
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      isVisible: true,
      message: "",
      timeout: null,
    };
  },
  methods: {
    showToast(message, duration = 3000) {
      this.isVisible = true;
      this.message = message;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.isVisible = false;
      }, duration);
    },
  },
};
</script>
  
  <style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 0;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 9999;
}
</style>