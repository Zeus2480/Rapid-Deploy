<template>
  <v-app>
    <div
      :class="{ active: showToast }"
      class="tw-fixed toast tw-bottom-8 tw-right-8"
    >
      <div
        class="tw-pr-6 tw-py-3 tw-bg-[#0A0A0A] t tw-border-[#252525] tw-border[1px] tw-border tw-rounded-lg tw-flex"
      >
        <SucessToastIcon
          v-if="toastType === 'success'"
          class="tw-h-10 tw-w-auto"
        />
        <ErrorToastIcon
          v-if="toastType === 'error'"
          class="tw-h-10 tw-w-auto"
        />
        <WarningToastIcon
          v-if="toastType === 'warning'"
          class="tw-h-10 tw-w-auto"
        />
        <h1
          class="tw-text-lg tw-my-auto tw-ml-4 tw-font-semibold tw-text-white"
        >
          {{ toastMessage }}
        </h1>
      </div>
    </div>
    <RouterView />
    <div></div>
  </v-app>
</template>

<script>
import Toast from "./components/Toast.vue";
import { mapGetters } from "vuex";
import SucessToastIcon from "./assets/SucessToastIcon.vue";
import ErrorToastIcon from "./assets/ErrorToastIcon.vue";
import WarningToastIcon from "./assets/WarningToastIcon.vue";
export default {
  data() {
    return {
      showToast: false,
      toastMessage: "",
      toastDuration: 3000,
      toastType: "",
    };
  },
  components: {
    Toast,
    SucessToastIcon,
    ErrorToastIcon,
    WarningToastIcon,
  },
  computed: {
    ...mapGetters("user", ["getToast"]),
  },
  watch: {
    getToast(newValue) {
      if (newValue && newValue.show) {
        this.showToastMessage(newValue);
      }
    },
  },
  methods: {
    showToastMessage(newValue) {
      this.toastMessage = newValue.message;
      this.showToast = true;
      this.toastType = newValue.type;
      setTimeout(() => {
        this.showToast = false;
      }, this.toastDuration);
    },
  },
};
</script>
<style scoped>
.toast {
  /* display: none; */
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.5s, transform 0.3s;
}
.toast.active {
  /* display: block; */
  opacity: 1;
  transform: translateY(0);
}
</style>