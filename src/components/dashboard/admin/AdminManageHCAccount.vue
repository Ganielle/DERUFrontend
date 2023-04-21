<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / MANAGE HEALTHCARE ACCOUNTS" />

    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">HEALTHCARE ACCOUNT APPROVAL</div>
        </div>
        <div class="list-table">
            <UserTables :processing="processing.gettingListData" :content="values.userList"
                :currentPage="pagination.currentPage" :totalPage="pagination.totalPages" 
                :roleId="role" :approve="false" @approve="Approve" @decline="Decline" />
        </div>

        <!--APPROVAL-->
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
                <div v-if="processing.approvingUser">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="primary" type="submit" 
                    @click="ApproveHC"> Yes </MDBBtn>
                </div>
            </MDBModalFooter>
        </MDBModal>

        <!--DECLINE-->
        <MDBModal
        v-model="declineModal"
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
                    declineModal = false
                    modalTitle = ''
                    modalMessage = ''
                    selectedUserData = []
                }" > Cancel </MDBBtn>
                <div v-if="processing.decliningUser">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="danger" type="submit" 
                    @click="DeclineHC"> Yes </MDBBtn>
                </div>
            </MDBModalFooter>
        </MDBModal>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBBtn, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle, MDBSpinner } from 'mdb-vue-ui-kit';
import { Users } from '../../../modules/Users';
import { onMounted } from 'vue';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import UserTables from '../tables/UserTables.vue';
import {useToast} from 'vue-toast-notification';
export default{
    name: 'ManageHCAccount',
    data () {
        return{
            role: process.env.VUE_APP_HEALTHCARE_STAFF,
            selectedUserData: [],
            approveModal: false,
            declineModal: false,
            modalTitle: "",
            toast: useToast(),
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
        MDBSpinner
    },
    methods: {
        Approve(dataValues){
            this.selectedUserData = dataValues
            this.modalTitle = "Approve User"
            this.modalMessage = "Are you sure you want to approve this user?"
            this.approveModal = true
        },
        Decline(dataValues){
            this.selectedUserData = dataValues
            this.modalTitle = "Decline User"
            this.modalMessage = "Are you sure you want to decline this user?"
            this.declineModal = true
        },
        async ApproveHC(){
            await this.ApproveUser(this.selectedUserData._id)

            if (this.response.approveResponse === "success"){
                this.toast.open({
                    message: "User Approve Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing.approvingUser = false;
                this.response.approveResponse = ""
                this.GetUserList(false, process.env.VUE_APP_HEALTHCARE_STAFF)
                this.approveModal = false
            }
            else if (this.response.approveResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your internet connection, please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        },
        async DeclineHC(){
            await this.DeclineUser(this.selectedUserData._id)

            if (this.response.declineResponse === "success"){
                this.toast.open({
                    message: "User Decline Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing.decliningUser = false;
                this.response.declineResponse = ""
                this.GetUserList(false, process.env.VUE_APP_HEALTHCARE_STAFF)
                this.declineModal = false
            }
            else if (this.response.declineResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your internet connection, please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        }
    },
    setup(){

        const { values, processing, pagination, response, ApproveUser, GetUserList, DeclineUser } = Users()

        onMounted(() => {
            GetUserList(false, process.env.VUE_APP_HEALTHCARE_STAFF)
        })

        return { values, processing, pagination, response, ApproveUser, GetUserList, DeclineUser }
    }
}
</script>

<style>
</style>
