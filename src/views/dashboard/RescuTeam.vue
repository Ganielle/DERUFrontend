<template>
    <MDBContainer fluid class="px-0 admin-view">
        <div v-if="innerWidth < 768" :style="{margin: '3vw'}">
            <MDBIcon
                fas
                icon="bars"
                size="2x"
                class="text-primary side-menu-toggle"
                role="button"
                @click="() => {
                    didToggle = !didToggle
                }"
            />
        </div>
        <main class="d-flex main-container"
        :style="{paddingLeft: innerWidth > 768 ? didToggle ? innerWidth < 768 ?
            '0rem' : '4.5rem' : '20rem' : '0rem'}">
            <ResponseTeamNavigation :didToggle="didToggle" :subToggle="subToggle" @sidebarToggle="ToggleSidebar" 
                @sideSubToggle="SideSubToggle" role="RESPONSE TEAM"/>
            <MDBContainer fluid class="px-0 py-5 fill-space">
                <div v-if="currentSideBar === 'hospitalmanage'">
                    <ResponseTeamHospital />
                </div>
                <div v-else-if="currentSideBar === 'referralmanage'">
                    <ResponseTeamReferral />
                </div>
                <div v-else-if="currentSideBar === 'pcr'">
                    <PCRReport />
                </div>
                <div v-else-if="currentSideBar === 'assistance'">
                    <MedicalAssistance />
                </div>
            </MDBContainer>
        </main>
    </MDBContainer>
</template>

<script>
import { mapState } from 'vuex';
import { MDBContainer, MDBIcon } from 'mdb-vue-ui-kit';
import ResponseTeamNavigation from '@/components/dashboard/ResponseTeam/ResponseTeamNav.vue';
import ResponseTeamHospital from '@/components/dashboard/ResponseTeam/ResponseTeamHospitalManage.vue';
import ResponseTeamReferral from '@/components/dashboard/ResponseTeam/ResponseTeamReferral.vue'
import PCRReport from '@/components/dashboard/admin/AdminPCRList.vue'
import MedicalAssistance from '@/components/dashboard/admin/AdminMedicalAssistance.vue'

export default{
    name: 'ResponseTeamDashboard',
    data() {
        return{
            currentLink: this.currentSideBar,
            innerWidth: window.innerWidth,
            didToggle: true,
            subToggle: false,
        }
    },
    components: {
        ResponseTeamNavigation,
        ResponseTeamHospital,
        ResponseTeamReferral,
        PCRReport,
        MedicalAssistance,
        MDBContainer,
        MDBIcon
    },
    computed:{
        ...mapState(["currentSideBar", "currentMedAssitNav"])
    },
    methods: {
        ToggleSidebar(){
            this.didToggle = !this.didToggle
            this.subToggle = false;
        },
        SideSubToggle(){
            this.subToggle = !this.subToggle
            if (this.subToggle === true){
                this.didToggle = false
            }
        },
        CheckToken(){
        const auth = JSON.parse(localStorage.getItem("userCreds"))
        if (!auth){
            this.$router.push({name: "home"})
        }
      }
    },
    created: function() {
      this.CheckToken()
    }
}
</script>

<style>
.admin-view{
    background-color: rgb(168, 173, 173);
    width: 100%;
    min-height: 100vh;
}
.list-title-bg {
  background-color: rgb(2, 107, 206);
  font-weight: bold;
  color: rgb(209, 209, 209);
  font-size: 2rem;
}
.list-title{
    margin-left: 2vw;
}
.tc-pager,
.tc-page {
  background-color: #3d4e65;
  color: #f9b948;
  padding: 0.25rem 0.8rem;
  margin: 0 0.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
}
.list-table{
    margin-top: 3vh;
}
</style>
