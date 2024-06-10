import { createStore } from "vuex";
import UserStore from "./modules/user";
import ProjectStore from "./modules/project";

export default createStore({
  modules: {
    user: UserStore,
    project: ProjectStore,
  },
});
