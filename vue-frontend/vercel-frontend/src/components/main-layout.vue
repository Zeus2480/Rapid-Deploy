<template>
  <div
    v-if="!loggedUser"
    class="tw-h-screen tw-flex tw-justify-center tw-items-center tw-w-full"
  >
    <v-progress-circular indeterminate :size="52"></v-progress-circular>
  </div>
  <div v-else>
    <div
      class="tw-w-full tw-p-4 tw-bg-[#0a0a0a] tw-border-b tw-border-[#313131]"
    >
      <div class="tw-flex tw-justify-between">
        <div @click="goTo('/dashboard')">
          <p class="tw-text-gray-100 tw-text-lg tw-font-medium">Dashboard</p>
        </div>
        <div>
          <v-btn @click="logout">Logout</v-btn>
        </div>
      </div>
    </div>
    <div v-if="loggedUser" class="tw-bg-black">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loggedUser: null,
      overlay: true,
    };
  },
  computed: {
    ...mapGetters("user", ["getLoggedUser"]),
  },
  methods: {
    ...mapActions("user", ["fetchUser"]),
    logout() {
      localStorage.removeItem("auth_toke");
      this.$router.push("/login");
    },
    goTo(to) {

      if (this.$router.path != to) {
        this.$router.push("/dashboard");
      }
    },
  },
  async created() {
    try {
      if (!this.getLoggedUser) {
        await this.fetchUser();
        this.loggedUser = this.getLoggedUser;
        this.overlay = false;
      } else {
        this.loggedUser = this.getLoggedUser;
        this.overlay = false;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>