<template>
    <div class="bg">
        <br>
        <MDBBtn color="primary" @click="() => {
            this.$router.push({name: 'home'})
        }" style="margin-left: 5vw;">RETURN TO LOGIN</MDBBtn>
        <div v-if="currentPatientChatNav === 'form'" class="centerpanel">
            <PatientForm @requestChat="GoChat" :chatroomId="createdRoomId" 
            :requestingChat="requesting" @oldChat="GoOldChat"/>
        </div>
        <div v-else-if="currentPatientChatNav === 'chat'" class="centerpanel">
            <Chatbox :patient="true" :patientName="formData.nameOfPatient" />
        </div>
    </div>
    
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit';
import { mapState, mapMutations } from 'vuex';
import { socket } from '@/socket'
import PatientForm from '@/components/patient/ChatFillupForm.vue'
import { Room } from '@/modules/room'
import { Chat } from '@/modules/chat'
import {useToast} from 'vue-toast-notification';
import Chatbox from '@/components/dashboard/cards/Chatbox.vue'
export default{
    name: 'PatientChat',
    data(){
        return{
            formData: [],
            createdRoomId: "",
            approve: "",
            toast: useToast(),
            requesting: false
        }
    },
    components:{
        PatientForm,
        MDBBtn,
        Chatbox
    },
    computed:{
        ...mapState(["currentPatientChatNav"])
    },
    methods: {
        ...mapMutations(["setPatientNavLink", "setChatId", "setChatPatientName"]),
        async GoChat(formData){
            this.requesting = true
            this.formData = formData
            await this.CreateRoom(this.formData)

            if (this.roomResponse.saveResponse === "success"){
                this.toast.open({
                    message: "Chat Assistance Requested Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.createdRoomId = this.roomValues.createdRoom._id

                socket.emit("create-room", { data: this.formData })
                socket.emit("leave-lobby")
                socket.on("leave-lobby-response", (data) => {
                    if (data.message === "success"){
                        socket.emit("join_room", { roomId: this.roomValues?.createdRoom?._id, 
                            name: formData.nameOfPatient })
                        socket.on("response-approve-chat", (data) => {
                            if (data.message === "success" && data.data === "active"){
                                this.requesting = false
                                this.setChatPatientName(this.formData.nameOfPatient)
                                this.setChatId(this.createdRoomId)
                                this.setPatientNavLink('chat')
                            }
                        })
                    }
                })
            }
            else if (this.roomResponse.saveResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.requesting = false
            }
            else{
                this.toast.open({
                    message: "There's a problem with your connection! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.requesting = false
            }

            
        },
        async GoOldChat(roomID){
            this.requesting = true
            this.createdRoomId = roomID
            await this.GetHistory(roomID)
            if (this.chatResponse.getResponse === "success"){
                socket.emit("join_room", { roomId: roomID, 
                    name: this.chatValues.chatHistories[0].chatroom_id.nameOfPatient })
                if (this.chatValues.chatHistories[0].chatroom_id.handler === null ||
                this.chatValues.chatHistories[0].chatroom_id.handler === undefined){
                    socket.on("response-approve-chat", (data) => {
                        if (data.message === "success" && data.data === "active"){
                            this.requesting = false
                            this.setChatPatientName(this.chatValues.chatHistories[0].chatroom_id.nameOfPatient)
                            this.setChatId(roomID)
                            this.setPatientNavLink('chat')
                        }
                    })
                }
                else{
                    this.setChatPatientName(this.chatValues.chatHistories[0].chatroom_id.nameOfPatient)
                    this.setChatId(roomID)
                    this.setPatientNavLink('chat')
                }
            }
            else if (this.chatResponse.getResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with server! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.requesting = false
            }
            else{
                this.toast.open({
                    message: "There's a problem with network! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.requesting = true
            }
        },
        ConnectToLobby(){
            socket.connect();
            socket.on('connect', () => {
                socket.emit("join_lobby", { roomId: "lobby"})
            })
        }
    },
    mounted: function(){
        this.ConnectToLobby()
    },
    setup() {
        const { roomValues, roomProcessing, 
            roomResponse, CreateRoom } = Room()

        const {
                chatProcessing,
                chatValues,
                chatResponse,
                GetHistory,
            } = Chat()

        return { roomValues, roomProcessing, 
            roomResponse, CreateRoom, 
            chatProcessing,
                chatValues,
                chatResponse,
                GetHistory, }
    }
}
</script>

<style>
.bg{
    width: 100vw;
    min-height: 100vh;
    background-color: aqua;
    margin-top: 0%;
}
.centerpanel{
    padding-top: 10vh;
}
</style>
