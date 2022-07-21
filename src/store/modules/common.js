export default {
    namespaced: false,
    state: () => ({
        variables: () => ([]),
    }),
    mutations: { 
        setVariables(state, value) {
            state.variables = value;
        },
    },
    actions: {
        setVariables({ commit }, value) {
            commit('setVariables', value);
        },
    },
    getters: { 
        variables(state) {
            return state.variables
        },
    },
}