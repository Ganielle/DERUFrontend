<template>
    <div class="bg">
        <br>
        <MDBBtn color="primary" @click="() => {
            this.$router.push({name: 'home'})
        }" style="margin-left: 5vw;">RETURN TO LOGIN</MDBBtn>
        <div v-if="currentPatientChatNav === 'form'" class="centerpanel">
            <PatientForm @requestChat="GoChat" :chatroomId="createdRoomId"/>
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
                    console.log("leave room", data)
                    if (data.message === "success"){
                        socket.emit("join_room", { roomId: this.roomValues?.createdRoom?._id, 
                            name: formData.nameOfPatient })
                        socket.on("response-approve-chat", (data) => {
                            if (data.message === "success" && data.data === "active"){
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
            }
            else{
                this.toast.open({
                    message: "There's a problem with your connection! Please try again later",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
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

        return { roomValues, roomProcessing, 
            roomResponse, CreateRoom }
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
