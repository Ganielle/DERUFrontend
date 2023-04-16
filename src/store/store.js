import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
    state() {
        return{
            stepIndex: 0,
            registerAccount: [],
            registerHospital: [],
            currentSideBar: "",
            currentSubNav: ""
        }
    },
    mutations: {
        restartSignupStep(state, payload){
            state.stepIndex = payload
            state.registerAccount = []
            state.registerHospital = []
        },
        addSignupStep(state, payload){
            state.stepIndex += payload
        },
        reduceSignupStep(state, payload){
            state.stepIndex -= payload
        },
        addRegisterAccount(state, payload){
            state.registerAccount = payload
        },
        addRegisterHospital(state, payload){
            state.registerHospital = payload
        },
        restartDashboardLink(state, payload){
            state.currentSideBar = payload
            state.currentSubNav = payload
        },
        setSidebarLink(state, payload){
            state.currentSideBar = payload
        },
        setSubLink(state, payload){
            state.currentSubNav = payload
        }
    },
    plugins: [createPersistedState()]
})