import axios from "../../plugins/axios";

const state = {
    loggedUser: null,
    toast: {
        message: '',
        type: '',
        show: false,
        timeout: 3000,
    },
};

const getters = {
    getLoggedUser: (state) => state.loggedUser,
    getToast: (state) => state.toast,
};

const actions = {
    async register({ commit }, payload) {
        try {
            const response = await axios.post('/api/v1/user/register', payload);
            if (response.success) {
                commit("setLoggedUser", response.data.newUser);
                localStorage.setItem('auth_token', response.data.token);
                commit("setToast", {
                    message: 'User registered successfully',
                    type: 'success',
                    show: true,
                });
                return response.data;
            } else {
                commit("setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            commit("setToast", {
                message: 'An error occurred during login',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
    async login({ commit }, payload) {
        try {
            const response = await axios.post('/api/v1/user/login', payload);
            console.log(response);
            if (response.success) {
                localStorage.setItem('auth_token', response.data.token);
                commit("setToast", {
                    message: 'Logged in successfully',
                    type: 'success',
                    show: true,
                });
                return 1;
            } else {
                commit("setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            commit("setToast", {
                message: 'An error occurred during registration',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
    async fetchUser({ commit }) {
        try {
            const response = await axios.get('/api/v1/user/me');
            console.log(response);
            if (response.success) {
                commit("setLoggedUser", response.data);
                return 1;
            } else {
                commit("setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            commit("setToast", {
                message: 'Something went wrong',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
};

const mutations = {
    setLoggedUser(state, payload) {
        state.loggedUser = payload;
    },
    setToast(state, payload) {
        state.toast = payload;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
