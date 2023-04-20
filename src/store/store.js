import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
    state() {
        return{
            stepIndex: 0,
            registerAccount: [],
            registerHospital: [],
            selectedVariants:[],
            currentSideBar: "",
            currentSubNav: ""
        }
    },
    mutations: {
        restartSignupStep(state, payload){
            state.stepIndex = payload
            state.registerAccount = []
            state.registerHospital = []
            state.selectedVariants = []
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
        addSelectedVariants(state, payload){
            state.selectedVariants = payload
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