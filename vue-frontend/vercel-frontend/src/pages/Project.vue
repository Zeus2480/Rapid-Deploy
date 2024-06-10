<template>
  <main-layout>
    <div class="tw-min-h-[calc(100vh-69px)]" v-if="project">
      <div class="tw-border-b-[1px] tw-border-solid tw-border-[#252525]">
        <v-container>
          <div
            class="tw-py-4 lg:tw-px-40 tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between"
          >
            <h3 class="tw-text-2xl tw-font-medium">
              {{ project.name }}
            </h3>
            <div class="tw-mt-4 md:tw-m-0">
              <v-btn @click="goToGithub"
                ><span class="tw-my-auto tw-mr-2">
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
                </span>
                Repository</v-btn
              >
              <v-btn @click="visitWebSite" class="tw-ml-4" color="white"
                >Visit</v-btn
              >
            </div>
          </div>
        </v-container>
      </div>
      <v-container>
        <div class="tw-py-8 tw-px-0 lg:tw-px-40">
          <h3 class="tw-text-2xl tw-font-semibold tw-mb-4">Deployment</h3>
          <div class="tw-inline-block">
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

          <div
            class="tw-my-4 tw-bg-[#0a0a0a] tw-p-6 tw-rounded-lg tw-border-[#252525] tw-flex tw-flex-col md:tw-flex-row tw-border"
          >
            <div class="iframe-container">
              <iframe
                :src="getIrameURL"
                frameborder="0"
                class="iframe-content"
              ></iframe>
            </div>
            <div class="tw-p-4">
              <div class="tw-mb-4">
                <h3 class="tw-text-[#a1a1a1]">Deployment</h3>
                <a :href="getIrameURL" class="hover:tw-underline tw-mt-2">{{
                  getIrameURL
                }}</a>
              </div>
              <div class="tw-mb-4 tw-flex">
                <div>
                  <h3 class="tw-text-[#a1a1a1]">Status</h3>
                  <div class="tw-flex tw-mt-1">
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
                <div class="tw-ml-8">
                  <h3 class="tw-text-[#a1a1a1]">
                    Created At
                    <v-tooltip :text="getDate" location="top">
                      <template v-slot:activator="{ props }">
                        <v-icon v-bind="props"
                          >mdi-information
                        </v-icon></template
                      >
                    </v-tooltip>
                  </h3>
                  <div class="tw-flex tw-mt-1">
                    <p class="tw-m-0 tw-my-auto">{{ timeAgo }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="(deployment, index) in project.deployments"
          :key="index"
          class="tw-py-8 tw-px-0 lg:tw-px-40"
        >
          <div
            class="tw-px-4 tw-py-4 tw-mb-4 tw-border-[#252525] tw-flex tw-border tw-rounded-lg tw-bg-[#0a0a0a]"
          >
            <v-row>
              <v-col cols="4"
                ><p class="tw-m-0">
                  {{ getDeploymentId(deployment.id) }}
                </p>
                <div
                  class="tw-bg-[#10233d] tw-text-[#52a8ff] tw-inline-block tw-px-2 tw-rounded-lg"
                >
                  <p class="tw-text-sm">Current</p>
                </div></v-col
              >
              <v-col cols="4">
                <div>
                  <div class="tw-flex tw-my-auto tw-h-full">
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
                <p>{{ getAgoTime(deployment.createdAt) }}</p>
              </v-col>
              <v-col cols="4">
                <div class="tw-flex tw-flex-row-reverse">
                  <v-btn @click="toggleLogs(deployment.id)" class="tw-my-auto">
                    View LOgs <v-icon>mdi-menu-down</v-icon></v-btn
                  >
                </div>
              </v-col>
              <v-col v-if="deployment.showLogs" cols="12">
                <transition name="fade">
                  <div>
                    <h3 class="tw-text-xl tw-font-semibold">Logs</h3>
                    <div class="tw-py-2 tw-px-4 tw-bg-black">
                      <div
                        class="tw-flex"
                        v-for="(log, index) in deployment.logs"
                        :key="log.id"
                      >
                        <div
                          class="tw-w-[40px] tw-mr-8 tw-border-gray-500 tw-border-r-2 tw tw-text-slate-400"
                        >
                          {{ index + 1 }}
                        </div>
                        <div>
                          {{ formatLog(log) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </v-col>
            </v-row>
          </div>
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
      timeOutvaraible: false,
      isNewProject: false,
      project: null,
      items: [
        { title: "Sort by name", key: "name" },
        { title: "Sort by activity", key: "activity" },
      ],
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
    try {
      if (this.getProject && this.$route.params.id == this.getProject.id) {
        this.project = this.getProject;
      } else if (
        this.getProjects &&
        Array.isArray(this.getProjects) &&
        this.getProjects.length
      ) {
        let project = this.getProjects.find((p) => {
          p.id = this.$route.params.id;
        });
        if (project) {
          this.project = project;
        } else {
          await this.fetchProject(this.$route.params.id);
          this.project = this.getProject;
        }
      } else {
        await this.fetchProject(this.$route.params.id);
        this.project = this.getProject;
      }
      if (this.$route?.query?.type === "newproject") {
        setTimeout(() => {
          this.isNewProject = true;
          this.checkDeploymentStatus();
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters("project", ["getProjects", "getProject"]),
    getIrameURL() {
      return `http://${this.project.name}.localhost:8000`;
    },
    getDate() {
      if (this.project) {
        const date = new Date(this.project.updatedAt);
        const options = { day: "2-digit", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("en-GB", options).format(date);
      } else {
        return "";
      }
    },
    timeAgo() {
      const dateString = this.project.updatedAt;
      if (!dateString) return "";
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
  },
  beforeDestroy() {
    if (this.timeOutvaraible) {
      clearInterval(this.timeOutvaraible);
    }
  },
  methods: {
    ...mapActions("project", ["fetchProjects", "fetchProject"]),
    async checkDeploymentStatus() {
      if (this.project) {
        this.toggleLogs(this.project.deployments[0].id);
      }
      this.timeOutvaraible = setInterval(async () => {
        await this.fetchProject(this.$route.params.id);
        this.project = this.getProject;
        const deployment = this.project.deployments[0];
        this.toggleLogs(this.project.deployments[0].id);
        if (deployment.status === "FAIL" || deployment.status === "READY") {
          this.$nextTick(() => {
            document.querySelector(
              "iframe"
            ).src = `http://${this.project.name}.localhost:8000`;
          });
          clearInterval(this.timeOutvaraible);
        }
      }, 10000);
    },
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
    goToGithub() {
      window.open(this.project.gitURL, "_blank");
    },
    visitWebSite() {
      let domain = this.getProjectDomain(this.project.name);
      window.open(domain, "_blank");
    },
    getDeploymentId(id) {
      let ids = id.split("-");
      return ids[0] + "-" + ids[1];
    },
    formatLog(log) {
      const date = new Date(log.createdAt);
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return time + ":  " + log.message;
    },
    getProjectDomain(subDomain) {
      return `http://${subDomain}.localhost:8000`;
    },
    toggleLogs(deploymentId) {
      const deployment = this.project.deployments.find(
        (d) => d.id === deploymentId
      );
      if (deployment) {
        deployment.showLogs = !deployment.showLogs;
      }
    },
    getAgoTime(dateString) {
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
.iframe-container {
  width: 500px;
  aspect-ratio: 16/9;
  height: auto;
  overflow: hidden; /* Ensure no scrollbars appear */
  position: relative; /* Required for iframe positioning */
}

.iframe-content {
  width: 200%; /* Adjust to scale the content down */
  height: 200%;
  border: none; /* Remove default border */
  transform: scale(0.5); /* Scale down the content */
  transform-origin: top left; /* Ensure scaling from top left corner */
  position: absolute; /* Ensure it stays within the container */
  top: 0;
  left: 0;
}

/* Media query for responsiveness */
@media (max-width: 768px) {
  .iframe-container {
    width: 100%;
  }
  .iframe-content {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
  }
}

@media (max-width: 480px) {
  .iframe-container {
    width: 100%;
  }
  .iframe-content {
    width: 300%;
    height: 300%;
    transform: scale(0.33);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  max-height: 0;
}
</style>