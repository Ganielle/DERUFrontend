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
            currentSubNav: "",
            currentPatientChatNav: "",
            currentMedAssitNav: "",
            chatId: ""
        }
    },
    mutations: {
        restartSignupStep(state, payload){
            state.stepIndex = payload
            state.registerAccount = []
            state.registerHospital = []
            state.selectedVariants = []
        },
        restartPatientNavLink(state, payload){
            state.currentPatientChatNav = payload
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
        },
        setPatientNavLink(state, payload){
            state.currentPatientChatNav = payload
        },
        setMedAssitanceNav(state, payload){
            state.currentMedAssitNav = payload
        },
        setChatId(state, payload){
            state.chatId = payload
        }
    },
    plugins: [createPersistedState()]
})