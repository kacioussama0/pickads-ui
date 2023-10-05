import {createStore} from "vuex";

export const store =  createStore({
    state() {
        return {
            user: null
        }
    },
    mutations: {
        user(state,user) {
            state.user = user
        }
    },
    actions: {
        user(ctx,user){
            ctx.commit('user',user)
        }
    },
    getters: {
        user: (state)=> {
            return state.user
        }
    }
})