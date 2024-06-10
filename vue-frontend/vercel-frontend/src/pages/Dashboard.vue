<template>
  <main-layout>
    <div class="tw-min-h-[calc(100vh-69px)]">
      <v-dialog v-model="createDialog" width="auto">
        <div
          class="tw-bg-black tw-w-[700px] tw-rounded-lg tw-max-h-[90vh] tw-overflow-y-auto"
        >
          <div class="tw-bg-[#0a0a0a] tw-border-b tw-border-[#313131]">
            <h1 class="tw-text-xl tw-font-medium tw-p-4">Create Project</h1>
          </div>
          <div class="tw-bg-black">
            <div class="tw-px-6 tw-mt-8 tw-mb-4">
              <v-form ref="createProjectForm">
                <v-text-field
                  v-model="githubURL"
                  label="GitHub URL"
                  :rules="urlRules"
                  variant="outlined"
                ></v-text-field>
                <v-btn
                  @click="addEnv"
                  class="tw-my-4"
                  size="small"
                  color="white"
                  ><v-icon>mdi-plus</v-icon> ADD ENV Varaibles</v-btn
                >
                <div v-if="envVarialbles" class="tw-mt-6">
                  <v-row v-for="(env, index) in envVarialbles" :key="index">
                    <v-col cols="5">
                      <v-text-field
                        v-model="env.key"
                        density="compact"
                        :rules="envRules"
                        label="Key"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="env.value"
                        density="compact"
                        :rules="envRules"
                        label="Value"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        @click="removeEnv(env)"
                        size="small"
                        icon="mdi-delete"
                      ></v-btn>
                    </v-col>
                  </v-row>
                </div>
                <div class="tw-flex tw-flex-row-reverse">
                  <v-btn
                    color="white"
                    class="tw-ml-6"
                    :loading="isLoading"
                    @click="createProject"
                    >Create</v-btn
                  >
                  <v-btn @click="createDialog = !createDialog" class=""
                    >cancel</v-btn
                  >
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </v-dialog>
      <v-container>
        <div class="tw-py-8">
          <v-row v-if="!projects">
            <v-col cols="3">
              <v-skeleton-loader
                :loading="true"
                height="240"
                width="340"
                type="image, list-item-two-line"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
              <v-skeleton-loader
                :loading="true"
                height="240"
                width="440"
                type="image, list-item-two-line"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
              <v-skeleton-loader
                :loading="true"
                height="240"
                width="440"
                type="image, list-item-two-line"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
              <v-skeleton-loader
                :loading="true"
                height="240"
                width="440"
                type="image, list-item-two-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="projects">
            <v-col cols="12" md="8">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search projects"
                density="compact"
                variant="outlined"
                placeholder="Search projects"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    Sort by <v-icon>mdi-menu-down</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item
                    class="tw-cursor-pointer"
                    v-for="(item, i) in items"
                    :key="i"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                @click="createDialog = !createDialog"
                class="tw-ml-4"
                color="white"
                >Create New</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-if="projects">
            <v-col
              v-for="(project, index) in projects"
              :key="index"
              cols="12"
              md="4"
              lg="4"
            >
              <div
                @click="goTo(project)"
                class="tw-border tw-py-4 tw-px-8 box tw-border-[#252525] tw-border[2px] tw-rounded-lg hover:tw-border-white"
              >
                <h3 class="tw-text-white tw-text-base">{{ project.name }}</h3>
                <h3 class="tw-text-[#a1a1a1] tw-text-base hover:tw-underline">
                  <a
                    class="tw-cursor-pointer"
                    :href="getProjectDomain(project.name)"
                    target="_blank"
                    @click.stop
                    >{{ project.name }}.localhost:8000</a
                  >
                </h3>

                <div
                  @click.stop="goToRepo(project)"
                  class="tw-my-4 tw-px-4 tw-py-1 tw-bg-[#1a1a1a] tw-cursor-pointer tw-inline-block tw-rounded-xl"
                >
                  <div class="tw-flex">
                    <div class="tw-my-auto tw-mr-2">
                      <svg
                        aria-label="github"
                        height="16"
                        viewBox="0 0 14 14"
                        width="16"
                        style="flex-shrink: 0"
                      >
                        <path
                          d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                          fill="#fff"
                          fill-rule="nonzero"
                        ></path>
                      </svg>
                    </div>
                    <p class="tw-m-0 tw-text-sm tw-my-auto tw-font-medium">
                      {{ getGithubHeading(project.gitURL) }}
                    </p>
                  </div>
                </div>
                <div class="tw-flex tw-justify-between">
                  <p class="tw-text-[#a1a1a1] tw-m-0">
                    {{ timeAgo(project.updatedAt) }}
                  </p>
                  <div
                    class="tw-px-3 tw-py-1 tw-border-[#252525] tw-flex tw-border tw-rounded-lg"
                  >
                    <div
                      v-if="project.deployments[0].status === 'READY'"
                      class="tw-h-4 tw-w-4 tw-rounded-full tw-my-auto tw-mr-2 tw-bg-[#50e3c2]"
                    ></div>
                    <div
                      v-else-if="project.deployments[0].status === 'FAIL'"
                      class="tw-h-4 tw-w-4 tw-rounded-full tw-my-auto tw-mr-2 tw-bg-[#F16953]"
                    ></div>
                    <div
                      v-else
                      class="tw-h-4 tw-w-4 tw-rounded-full tw-my-auto tw-mr-2 tw-bg-[#F09F10]"
                    ></div>
                    <p class="tw-text-sm tw-m-0">
                      {{ getStatus(project.deployments[0].status) }}
                    </p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </main-layout>
</template>
<script>
import mainLayout from "../components/main-layout.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      projects: [],
      githubURL: "",
      isLoading: false,
      createDialog: false,
      items: [
        { title: "Sort by name", key: "name" },
        { title: "Sort by activity", key: "activity" },
      ],
      envVarialbles: [],
      urlRules: [
        (v) => !!v || "GitHub URL is required",
        (v) =>
          /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(
            v
          ) || "Must be a valid GitHub URL",
      ],
      envRules: [(v) => !!v || "This field is required"],
    };
  },
  watch: {
    getProjects: {
      deep: true,
      handler(val) {
        if (val) {
          this.projects = val;
        }
      },
    },
  },
  async created() {
    if (this.getProjects) {
      this.projects = this.getProjects;
    } else {
      await this.fetchProjects();
      this.projects = this.getProjects;
    }
  },
  computed: {
    ...mapGetters("project", ["getProjects"]),
  },
  methods: {
    ...mapActions("project", ["fetchProjects", "createNewProject"]),
    getStatus(status) {
      switch (status) {
        case "NOT_STARTED":
          return "Not Started";
        case "QUEUED":
          return "Queued";
        case "IN_PROGRESS":
          return "In Progress";
        case "READY":
          return "Ready";
        case "FAIL":
          return "Failed";
        default:
          return "Unknown";
      }
    },
    async createProject() {
      let isValid = await this.$refs.createProjectForm.validate();
      isValid = isValid.valid;
      if (!isValid) return;
      let payload = {
        gitURL: this.githubURL,
      };
      if (this.envVarialbles.length) {
        payload.envVariables = this.envVarialbles;
      }
      this.isLoading = true;
      let resp = await this.createNewProject(payload);
      this.isLoading = false;
      console.log(resp)
      if (resp) {
        this.$router.push(`/project/${resp.id}?type=newproject`);
      }
    },
    getProjectDomain(subDomain) {
      return `http://${subDomain}.localhost:8000`;
    },
    removeEnv(env) {
      let index = this.envVarialbles.indexOf(env);
      this.envVarialbles.splice(index, 1);
    },
    addEnv() {
      this.envVarialbles.push({
        key: "",
        value: "",
      });
    },
    timeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now - date;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      if (diffInYears > 0) {
        return rtf.format(-diffInYears, "year");
      } else if (diffInMonths > 0) {
        return rtf.format(-diffInMonths, "month");
      } else if (diffInWeeks > 0) {
        return rtf.format(-diffInWeeks, "week");
      } else if (diffInDays > 0) {
        return rtf.format(-diffInDays, "day");
      } else if (diffInHours > 0) {
        return rtf.format(-diffInHours, "hour");
      } else if (diffInMinutes > 0) {
        return rtf.format(-diffInMinutes, "minute");
      } else {
        return rtf.format(-diffInSeconds, "second");
      }
    },
    getGithubHeading(gitUrl) {
      try {
        const parts = gitUrl.split("/").filter(Boolean);
        const owner = parts[parts.length - 2];
        const repo = parts[parts.length - 1];
        return `${owner}/${repo}`;
      } catch (err) {
        return "";
      }
    },
    goTo(project) {
      console.log(project);
      this.$router.push(`/project/${project.id}`);
    },

    goToRepo(project) {
      window.open(project.gitURL, "_blank");
    },
  },
  components: {
    mainLayout,
  },
};
</script>
<style scoped>
.box {
  border: 2px solid #252525; /* Initial border color */
  transition: border-color 0.3s ease; /* Smooth transition effect */
}

.box:hover {
  border-color: white; /* Border color on hover */
}
</style>