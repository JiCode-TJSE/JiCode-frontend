

export default {
    state: {
        username: "王琳的公司",
        role: null, //orgnazationer、member
        usePhoto: '',
        account_id: "1",//"f41b48b9-64cc-4271-92fd-f59ac5f2efe8",
        organizationId:"1",
        project_id:"1",
    },
    getters: {
    },
    mutations: {
        setAccountId(state, accountId) {
            state.account_id = accountId;
        },
        SET_PROJECT_ID(state, payload) {
            state.project_id = payload;
          },
    },
    actions: {
        setProjectId({ commit }, project_id) {
            commit('SET_PROJECT_ID', project_id);
          },
    },
    modules: {
    }
}