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
            <AdminNavigation :didToggle="didToggle" :subToggle="subToggle" @sidebarToggle="ToggleSidebar" 
                @sideSubToggle="SideSubToggle"/>
            <MDBContainer fluid class="px-0 py-5 fill-space">
                <div v-if="currentSideBar === 'dashboard'">
                    <AdminDashboardMenu />
                </div>
                <div v-else-if="currentSideBar === 'hospitalmanage'">
                    <ManageHospital />
                </div>
                <div v-else-if="currentSideBar === 'variant'">
                    <HospitalVariant />
                </div>
                <div v-else-if="currentSideBar === 'manageprovider'">
                    <ManageHCAccount />
                </div>
                <div v-else-if="currentSideBar === 'rescue'">
                    <RescueList />
                </div>
                <div v-else-if="currentSideBar === 'provider'">
                    <HealthCareList />
                </div>
                <div v-else-if="currentSideBar === 'rural'">
                    <RuralList />
                </div>
                <div v-else-if="currentSideBar === 'create'">
                    <CreateUsers />
                </div>
                <div v-else-if="currentSideBar === 'referralmanage'">
                    <ReferralManage />
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
import AdminNavigation from '@/components/dashboard/admin/AdminNavigation.vue';
import AdminDashboardMenu from '@/components/dashboard/admin/AdminMenuDashboard.vue'
import ManageHospital from '@/components/dashboard/admin/AdminManageHospital.vue';
import HospitalVariant from '@/components/dashboard/admin/AdminHospitalVariant.vue';
import ManageHCAccount from '@/components/dashboard/admin/AdminManageHCAccount.vue';
import RescueList from '@/components/dashboard/admin/AdminRescueList.vue';
import HealthCareList from '@/components/dashboard/admin/AdminHealthCareList.vue';
import RuralList from '@/components/dashboard/admin/AdminRuralList.vue';
import CreateUsers from '@/components/dashboard/admin/AdminCreateUser.vue';
import ReferralManage from '@/components/dashboard/admin/AdminReferralManage.vue'
import PCRReport from '@/components/dashboard/admin/AdminPCRList.vue'
import MedicalAssistance from '@/components/dashboard/admin/AdminMedicalAssistance.vue'
export default{
    name: 'AdminDashboard',
    data() {
        return{
            currentLink: this.currentSideBar,
            innerWidth: window.innerWidth,
            didToggle: true,
            subToggle: false,
        }
    },
    components: {
        AdminNavigation,
        AdminDashboardMenu,
        ManageHospital,
        HospitalVariant,
        ManageHCAccount,
        RescueList,
        HealthCareList,
        RuralList,
        CreateUsers,
        ReferralManage,
        PCRReport,
        MedicalAssistance,
        MDBContainer,
        MDBIcon
    },
    computed:{
        ...mapState(["currentSideBar"])
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
