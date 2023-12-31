

export default {
    state: {
        username: "王琳的公司",
        role: null, //orgnazationer、member
        usePhoto: '',
        account_id: "",
    },
    getters: {
    },
    mutations: {
        setAccountId(state, accountId) {
            state.account_id = accountId;
        },
    },
    actions: {

    },
    modules: {
    }
}
