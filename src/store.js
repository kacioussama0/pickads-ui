import {createStore} from "vuex";
import {ClientJS} from "clientjs";
let client = new ClientJS()
export const store =  createStore({
    state() {
        return {
            user: null,
            fingerprint: client.getFingerprint(),
            userAgent: client.getUserAgent()
        }
    },
    mutations: {
        user(state,user) {
            state.user = user
        },
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