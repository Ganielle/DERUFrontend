<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / RESCUE TEAM STAFF LIST" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">RESCUE TEAM STAFF LIST</div>
        </div>
        <UserTables :processing="processing.gettingListData" :content="values.userList"
                :currentPage="pagination.currentPage" :totalPage="pagination.totalPages" 
                :roleId="role" :approve="true" />
    </MDBContainer>
</template>

<script>
import { MDBContainer } from 'mdb-vue-ui-kit';
import { Users } from '../../../modules/Users';
import { onMounted } from 'vue';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import UserTables from '../tables/UserTables.vue';
export default{
    name: 'RescueList',
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        UserTables
    },
    data () {
        return{
            role: process.env.VUE_APP_RESCUE_TEAM_ID
        }
    },
    setup(){

        const { values, processing, pagination, GetUserList } = Users()

        onMounted(() => {
            GetUserList(true, process.env.VUE_APP_RESCUE_TEAM_ID)
        })

        return { values, processing, pagination, GetUserList }
    }
}
</script>

<style>

</style>
