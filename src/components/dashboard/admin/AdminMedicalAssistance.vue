<template>
    <DashboardBreadcrumbs breadcrumbs="MEDICAL ASSISTANCE" />
    <MDBContainer class="px-0">
        <div v-if="currentMedAssitNav === 'list'">  
            
            <div class="list-title-bg">
            <div class="list-title">CHAT HISTORY</div>
            </div>
            <br>
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button"
                    @click="() => {
                        roomPagination.currentPage -= 1
                        GetRooms()
                    }" :disabled="roomPagination.currentPage <= 0">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">{{ roomPagination.currentPage + 1 }}</div>
                <button class="tc-pager" role="button" 
                    @click="() => {
                        roomPagination.currentPage += 1
                        GetRooms()
                    }" :disabled="roomPagination.currentPage >= roomPagination.totalPages - 1 ">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>

            <MDBTable responsive hover class="align-middle mb-0 bg-white text-center">
                <thead class="bg-dark table-dark text-center">
                    <tr>
                        <th scope="col">CHATROOM ID</th>
                        <th scope="col">HANDLER</th>
                        <th scope="col">PATIENT</th>
                        <th scope="col">CONTACT NUMBER</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-if="roomProcessing.gettingData">
                        <td colspan="6" class="">
                            <MDBSpinner />
                        </td>
                    </tr>
                    <tr v-else-if="roomValues.roomHistory.length <= 0">
                        <td colspan="6">No Data Yet!</td>
                    </tr>
                    <tr v-else v-for="dataVal in roomValues.roomHistory" :key="dataVal">
                        <td scope="row">
                            {{ dataVal._id }}
                        </td>
                        <td scope="row" v-if="dataVal.handler?.username !== undefined">
                            {{ dataVal.handler.username }}
                        </td>
                        <td scope="row" v-else>
                            THERE'S NO HANDLER YET
                        </td>
                        <td scope="row">
                            {{ dataVal.nameOfPatient }}
                        </td>
                        <td scope="row">
                            {{ dataVal.contactNumber }}
                        </td>
                        <td scope="row">
                            {{ dataVal.status }}
                        </td>
                        <td scope="row">
                            <MDBRow>
                                <MDBCol class="py-5">
                                    <MDBBtn color="primary" style="width: 100%;"
                                        @click="() => {
                                            selectedAssistance = dataVal
                                            openViewModal = true
                                    }">VIEW</MDBBtn>
                                </MDBCol>
                                <MDBCol class="py-5">
                                    <MDBBtn v-if="!roomProcessing.savingData" color="success" style="width: 100%;"
                                        @click="() => {
                                            selectedAssistance = dataVal
                                            if (dataVal.status === 'NOT YET APPROVE'){
                                                openAcceptModal = true
                                            }
                                            else{
                                                GoToChat()
                                            }
                                    }">CHAT</MDBBtn>
                                    <MDBSpinner v-else />
                                </MDBCol>
                            </MDBRow>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>

            <!--VIEW-->
            <MDBModal
            v-model="openViewModal"
            scrollable
            centered
            class="modal-lg"
            >
                <MDBModalHeader>
                    <MDBModalTitle id="exampleModalScrollableTitle"> VIEW SUMMARIZE DETAILS </MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody class="text-center"> 
                    <MDBInput type="text" label="Nature of Incident" wrapperClass="mb-4" 
                        v-model="selectedAssistance.natureOfAccident" readonly/>
                    <MDBInput type="text" label="Name of patient" wrapperClass="mb-4" 
                        v-model="selectedAssistance.nameOfPatient" readonly/>
                    <MDBInput type="number" label="Contact Number" wrapperClass="mb-4" 
                        v-model="selectedAssistance.contactNumber" readonly/>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput type="text" label="Location of Incident" wrapperClass="mb-4" 
                                v-model="selectedAssistance.location" readonly/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput type="text" label="Landmarks" wrapperClass="mb-4" 
                                v-model="selectedAssistance.landmarks" readonly/>
                        </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" @click="() => {
                        openViewModal = false
                    }" > Cancel </MDBBtn>
                </MDBModalFooter>
            </MDBModal>

            <!--ACCEPT-->
            <MDBModal
            v-model="openAcceptModal"
            scrollable
            centered
            class="modal-lg"
            >
                <MDBModalHeader>
                    <MDBModalTitle id="exampleModalScrollableTitle"> APPROVE CHAT </MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody class="text-center"> 
                    <strong>Are you sure you want to approve {{ selectedAssistance.nameOfPatient }}'s chat assistance 
                        request</strong>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" @click="() => {
                        selectedAssistance = []
                        openAcceptModal = false
                    }" > Cancel </MDBBtn>
                    <MDBBtn v-if="!roomProcessing.savingData" color="success" @click="ApproveChat">
                        Approve chat
                    </MDBBtn>
                    <MDBSpinner v-else />
                </MDBModalFooter>
            </MDBModal>
        </div>
        <div v-else-if="currentMedAssitNav === 'chat'">
            <ChatboxAssistance :patient="false"/>
        </div>
        
    </MDBContainer>
</template>

<script>
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
import { MDBContainer, MDBTable, MDBIcon, MDBSpinner, MDBRow, MDBCol, MDBInput,
    MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalTitle, } from 'mdb-vue-ui-kit';
import { socket } from '@/socket'
import { Room } from '@/modules/room'
import { onMounted } from 'vue';
import {useToast} from 'vue-toast-notification';
import { mapMutations, mapState } from 'vuex';
import ChatboxAssistance from '@/components/dashboard/cards/Chatbox.vue'
export default{
    name: 'MedicalAssistance',
    components: {
        DashboardBreadcrumbs,
        MDBContainer,
        MDBTable,
        MDBIcon,
        MDBSpinner,
        MDBRow,
        MDBCol,
        MDBBtn,
        MDBModal, 
        MDBModalHeader, 
        MDBModalBody, 
        MDBModalFooter, 
        MDBModalTitle,
        MDBInput,
        ChatboxAssistance
    },
    data(){
        return{
            openViewModal: false,
            openAcceptModal: false,
            selectedAssistance: [],
            toast: useToast(),
        }
    },
    computed:{
        ...mapState(["currentMedAssitNav"])
    },
    methods: {
        ...mapMutations(["setMedAssitanceNav", "setChatId"]),
        ConnectToLobby(){
            socket.connect();
            socket.on('connect', () => {
                socket.emit("join_lobby", { roomId: "lobby"})
                socket.on("create-room-data", (data) => {
                    if (data.message === "success"){
                        this.GetRooms();
                    }
                })
            })
        },
        AcceptModal(){
            this.openAcceptModal = true
        },
        async ApproveChat(){
            const auth = JSON.parse(localStorage.getItem("userCreds"))

            await this.UpdateRoom(this.selectedAssistance._id, auth._id, "ON GOING CHAT")
            
            if (this.roomResponse.saveResponse === "success"){
                this.toast.open({
                    message: "Chat Assistance Approved Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                socket.emit("leave-lobby")
                socket.on("leave-lobby-response", (data) => {
                    if (data.message === "success"){
                        this.setChatId(this.selectedAssistance._id)
                        socket.emit("approve-chat", { _id: this.selectedAssistance._id})
                        //  GOTO CHAT BOX HERE
                        this.setMedAssitanceNav('chat')
                    }
                })
            }
            else if (this.roomResponse.saveResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.roomProcessing.savingData = false
            }
            else{
                this.toast.open({
                    message: "There's a problem with your connection! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.roomProcessing.savingData = false
            }
        },
        GoToChat(){
            this.setChatId(this.selectedAssistance._id)
            this.setMedAssitanceNav('chat')
        }
    },
    created: function(){
        this.ConnectToLobby()
    },
    setup() {
        const {
            roomValues,
            roomProcessing,
            roomPagination,
            roomResponse,
            GetRooms,
            UpdateRoom
        } = Room()

        onMounted(() => {
            GetRooms()
        })

        return{
            roomValues,
            roomProcessing,
            roomPagination,
            roomResponse,
            GetRooms,
            UpdateRoom
        }
    }
}
</script>

<style>
</style>
