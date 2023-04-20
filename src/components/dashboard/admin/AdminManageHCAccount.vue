<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / MANAGE HEALTHCARE ACCOUNTS" />

    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">HEALTHCARE ACCOUNT APPROVAL</div>
        </div>
        <div class="list-table">
            <UserTables :processing="processing.gettingListData" :content="values.userList"
                :currentPage="pagination.currentPage" :totalPage="pagination.totalPages" 
                :roleId="role" :approve="false" @approve="Approve" />
        </div>

        <MDBModal
        v-model="approveModal"
        scrollable
        centered
        class="modal-lg"
        >
            <MDBModalHeader>
                <MDBModalTitle id="exampleModalScrollableTitle"> {{modalTitle}} </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody class="text-center"> 
                <strong>{{modalMessage}}</strong>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="() => {
                    approveModal = false
                    modalTitle = ''
                    modalMessage = ''
                    selectedUserData = []
                }" > Cancel </MDBBtn>
                <MDBBtn color="primary" type="submit" 
                    > Yes </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBBtn, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle } from 'mdb-vue-ui-kit';
import { Users } from '../../../modules/Users';
import { onMounted } from 'vue';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import UserTables from '../tables/UserTables.vue';
export default{
    name: 'ManageHCAccount',
    data () {
        return{
            role: process.env.VUE_APP_HEALTHCARE_STAFF,
            selectedUserData: [],
            approveModal: false,
            modalTitle: "",
            modalMessage: ""
        }
    },
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        UserTables,
        MDBBtn,
        MDBModal,
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter,
        MDBModalTitle,
    },
    methods: {
        Approve(dataValues){
            this.selectedUserData = dataValues
            this.modalTitle = "Approve User"
            this.modalMessage = "Are you sure you want to approve this user?"
            this.approveModal = true
        }
    },
    setup(){

        const { values, processing, pagination, GetUserList } = Users()

        onMounted(() => {
            GetUserList(false, process.env.VUE_APP_HEALTHCARE_STAFF)
        })

        return { values, processing, pagination, GetUserList }
    }
}
</script>

<style>
</style>
