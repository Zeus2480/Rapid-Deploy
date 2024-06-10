<template >
  <div class="tw-w-full tw-h-screen tw-bg-black">
    <div class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full">
      <div>
        <div
          class="tw-bg-[#0A0A0A] tw-text-white tw-border tw-p-8 tw-border-[#252525] tw-border[2px] tw-rounded tw-w-[600px]"
        >
          <h3 class="tw-font-bold tw-mb-12 tw-mt-4 tw-text-3xl tw-text-center">
            Log to Vercel
          </h3>

          <!-- <v-card subtitle="Subtitle" title="Title"></v-card> -->
          <v-form ref="loginForm">
            <v-text-field
              label="Email"
              v-model="formData.email"
              placeholder="john@example.com"
              prepend-inner-icon="mdi-email-outline"
              :rules="emailRules"
              variant="outlined"
              class="tw-mb-2"
            ></v-text-field>
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              placeholder="**********"
              v-model="formData.password"
              label="Password"
              :rules="passwordRules"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              class="tw-mb-2"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn
              :loading="isLoading"
              @click="submitForm"
              color="grey-lighten-2"
              block
              >Login</v-btn
            >
          </v-form>

          <p
            @click="redirectTo('register')"
            class="tw-text-right tw-my-4 tw-cursor-pointer tw-underline tw-underline-offset-4"
          >
            Register instead?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["getLoggedUser"]),
  },
  data() {
    return {
      isLoading: false,
      visible: false,
      formData: {
        email: "siddiquifaizan2480@gmail.com",
        password: "asd@1234",
      },
      emailRules: [
        (value) => !!value || "This field is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      passwordRules: [(value) => !!value || "This field is required"],
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    async submitForm() {
      let isValid = await this.$refs.loginForm.validate();
      console.log(isValid);
      isValid = isValid.valid;
      if (!isValid) return;
      this.isLoading = true;
      const resp = await this.login(this.formData);
      this.isLoading = false;
      if (resp) {
        this.$router.push("/dashboard");
      }
    },
    redirectTo(to) {
      this.$router.push("/" + to);
    },
  },
};
</script>

