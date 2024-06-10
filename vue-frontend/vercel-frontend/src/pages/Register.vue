<template>
  <div class="tw-w-full tw-h-screen tw-bg-black">
    <div class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-full">
      <div>
        <div
          class="tw-bg-[#0A0A0A] tw-text-white tw-border tw-p-8 tw-border-[#252525] tw-border[2px] tw-rounded tw-w-[600px]"
        >
          <h3 class="tw-font-bold tw-mb-12 tw-mt-4 tw-text-3xl tw-text-center">
            Register to Vercel
          </h3>
          <v-form ref="registerForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  ref="firstNameRef"
                  label="First Name"
                  placeholder="John"
                  v-model="formData.firstName"
                  :rules="[
                    () => !!formData.firstName || 'This field is required',
                  ]"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  class="tw-mb-2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  ref="lastNameRef"
                  v-model="formData.lastName"
                  :rules="[
                    () => !!formData.lastName || 'This field is required',
                  ]"
                  label="Last Name"
                  placeholder="King"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  class="tw-mb-2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              ref="emailRef"
              label="Email"
              v-model="formData.email"
              :rules="emailRules"
              placeholder="john@example.com"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              class="tw-mb-2"
            ></v-text-field>
            <v-text-field
              ref="passwordRef"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              placeholder="**********"
              v-model="formData.password"
              :rules="passwordRules"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              class="tw-mb-2"
              @click:append-inner="visible = !visible"
            ></v-text-field>
            <v-btn
              :loading="isLoading"
              color="grey-lighten-2"
              @click="submitForm"
              block
              >Register</v-btn
            >
          </v-form>
          <p
            @click="redirectTo('login')"
            class="tw-text-right tw-my-4 tw-cursor-pointer tw-underline tw-underline-offset-4"
          >
            Login instead?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
      visible: false,
      formData: {
        firstName: "",
        lastName: "Siddiqui",
        email: "siddiquifaizan2480@gmail.com",
        password: "asd@1234",
      },
      emailRules: [
        (value) => !!value || "This field is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      passwordRules: [
        (value) => !!value || "This field is required",
        (value) =>
          value.length >= 8 || "Password must be at least 8 characters",
      ],
    };
  },
  methods: {
    ...mapActions("user", ["register"]),
    async submitForm() {
      let isValid = await this.$refs.registerForm.validate().valid;
      if (!isValid) return;
      this.isLoading = true;
      const resp = await this.register(this.formData);
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
