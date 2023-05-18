<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / RURAL HEALTH UNIT STAFF LIST" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">RURAL HEALTH UNIT STAFF LIST</div>
        </div>
        <UserTables :processing="processing.gettingListData" :content="values.userList"
                :currentPage="pagination.currentPage" :totalPage="pagination.totalPages" 
                :roleId="role" :approve="true" @ban="Ban" @unban="Unban"/>

        <!--BAN-->
        <MDBModal
            v-model="openBan"
            centered
            class="modal-lg"
        >
            <MDBModalHeader>
                <MDBModalTitle id="exampleModalScrollableTitle"> BAN USER </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody class="text-center"> 
                <strong>Are you sure you want to BAN this user?</strong>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="() => {
                    openBan = false
                    modalContent = ''
                    selectedUserData = []
                }" > Cancel </MDBBtn>
                <div v-if="processing.approvingUser">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="danger" type="submit" 
                    @click="() => {
                        isBan = false
                        BanUnbanUser()
                    }"> Yes </MDBBtn>
                </div>
            </MDBModalFooter>
        </MDBModal>

        <!--UNBAN-->
        <MDBModal
            v-model="openUnban"
            centered
            class="modal-lg"
        >
            <MDBModalHeader>
                <MDBModalTitle id="exampleModalScrollableTitle"> UNBAN USER </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody class="text-center"> 
                <strong>Are you sure you want to UNBAN this user?</strong>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="() => {
                    openUnban = false
                    modalContent = ''
                    selectedUserData = []
                }" > Cancel </MDBBtn>
                <div v-if="processing.approvingUser">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="danger" type="submit" 
                    @click="() => {
                        isBan = true
                        BanUnbanUser()
                    }"> Yes </MDBBtn>
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
    name: 'RescueList',
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
    data () {
        return{
            role: process.env.VUE_APP_RHU_ID,
            selectedUserData: [],
            openBan: false,
            openUnban: false,
            modalContent: "",
            isBan: false,
            toast: useToast(),
        }
    },
    methods: {
        Ban(dataValues){
            this.selectedUserData = dataValues
            this.modalContent = "Are you sure you want to ban this user?"
            this.openBan = true
        },
        Unban(dataValues){
            this.selectedUserData = dataValues
            this.modalContent = "Are you sure you want to unban this user?"
            this.openUnban = true
        },
        async BanUnbanUser(){
            await this.BanUnban(this.selectedUserData._id, this.isBan);

            if (this.response.approveResponse === "success"){
                var toastMessage = this.isBan ? "User Unban Successfully" : "User Ban Successfully"
                this.toast.open({
                    message: toastMessage,
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing.approvingUser = false;
                this.response.approveResponse = ""
                this.GetUserList(true, this.role)
                this.openBan = false
                this.openUnban = false
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
        }
    },
    setup(){

        const { values, processing, pagination, response, GetUserList, BanUnban } = Users()

        onMounted(() => {
            GetUserList(true, process.env.VUE_APP_RHU_ID)
        })

        return { values, processing, pagination, response, GetUserList, BanUnban }
    }
}
</script>

<style>

</style>
