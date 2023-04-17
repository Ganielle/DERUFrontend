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
            <MDBContainer fluid class="px-0">
                <div v-if="currentSideBar === 'dashboard'">
                    <AdminDashboardMenu />
                </div>
                <div v-else-if="currentSideBar === 'hospitalmanage'">
                    <ManageHospital />
                </div>
                <div v-else-if="currentSideBar === 'variant'">
                    <HospitalVariant />
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
export default{
    name: 'AdminDashboard',
    data() {
        return{
            currentLink: this.currentSideBar,
            innerWidth: window.innerWidth,
            didToggle: true,
            subToggle: false
        }
    },
    components: {
        AdminNavigation,
        AdminDashboardMenu,
        ManageHospital,
        HospitalVariant,
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
        }
    }
}
</script>

<style>
.admin-view{
    background-color: rgb(168, 173, 173);
    width: 100%;
    height: 100vh;
}
</style>
