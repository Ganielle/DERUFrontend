import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return{
            stepIndex: 0
        }
    },
    mutations: {
        restartSignupStep(state, payload){
            state.stepIndex = payload
        },
        addSignupStep(state, payload){
            state.stepIndex += payload
        },
        reduceSignupStep(state, payload){
            state.stepIndex -= payload
        }
    }
})