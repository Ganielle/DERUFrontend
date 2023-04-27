<template>
    <MDBContainer class="px-0">
        <MDBBtn @click="LeavingRoom" color="primary">BACK TO LIST</MDBBtn>
        <div class="p-2 bg-light rounded jumbotron">
            <strong>Patient: {{ nameOfPatient }} </strong><br>
            <strong>Handler: {{ handlerName }}  </strong>
            <MDBContainer class="px-0">
                <div class="parent-chat" ref="parentChat">
                    <div v-for="dataVal in history" :key="dataVal" class="mx-2 child-chat">
                        <br>
                        <MDBRow >
                            <MDBCol v-if="dataVal.sender === formData.sender">
                                <div class="left-chat px-2">
                                    <p>{{ dataVal.sender }}:</p>
                                    <p>{{ dataVal.content }}</p>
                                    <p>sent: {{ dataVal.time }}</p>
                                </div>
                            </MDBCol>
                            <MDBCol v-else>
                                <div  class="right-chat px-2">
                                    <p>{{ dataVal.sender }}:</p>
                                    <p>{{ dataVal.content }}</p>
                                    <p>sent: {{ dataVal.time }}</p>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
                <MDBRow>
                    <MDBCol sm="10" class="py-5">
                        <MDBTextarea row="2" v-model="message" :disabled="chatProcessing.saveData"/>
                    </MDBCol>
                    <MDBCol sm="2" class="py-5">
                        <MDBBtn color="primary" class="text-center" style="width: 100%; height: 100%;"
                        @click="Send" :disabled="chatProcessing.saveData">
                        <MDBSpinner v-if="chatProcessing.saveData" />
                        <p v-else>SEND CHAT</p>
                    </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBBtn, MDBTextarea, MDBRow, MDBCol, MDBSpinner } from 'mdb-vue-ui-kit';
import { Chat } from '@/modules/chat'
import { mapMutations, mapState } from 'vuex';
import {useToast} from 'vue-toast-notification';
import { socket } from '@/socket'
export default{
    name: 'ChatboxAssistance',
    props:{
        patient: Boolean,
        patientName: String,
    },
    data(){
        return{
            nameOfPatient: "",
            handlerName: "",
            history: [],
            message: "",
            formData: {
                sender: "",
                content: "",
                time: ""
            },
            toast: useToast(),
        }
    },
    computed:{
        ...mapState(["chatId", "chatPatientName"])
    },
    components:{
        MDBContainer,
        MDBBtn,
        MDBTextarea,
        MDBRow,
        MDBCol,
        MDBSpinner
    },
    methods: {
        ...mapMutations(["setMedAssitanceNav", "setPatientNavLink"]),
        async CheckChat(){
            if (this.chatId === ''){
                this.setMedAssitanceNav('list')
            }
            else{
                if (!this.patient){
                    const auth = JSON.parse(localStorage.getItem("userCreds"))
                    this.formData.sender = auth.fname
                }
                else{
                    this.formData.sender = this.chatPatientName
                }
                await this.GetHistory(this.chatId)

                this.history = this.chatValues.chatHistories[0].history
                this.nameOfPatient = this.chatValues.chatHistories[0].chatroom_id.nameOfPatient
                this.handlerName = this.chatValues.chatHistories[0].chatroom_id.handler.fname
                this.$refs.parentChat.scrollTop = this.$refs.parentChat.scrollHeight;

                socket.connect();
                socket.emit("join_lobby", { roomId: this.chatId, name: this.formData.sender})
                console.log("lobby joined")
                socket.on("receive-message", (data) => {
                    this.history.push(data.data)
                })
            }
        },
        async Send(){

            if (this.message === ''){
                this.toast.open({
                    message: "Please enter content first!",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }
            const now = new Date();
            const options = {
                timeZone: 'Asia/Manila',
                hour12: false,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            this.formData.time = now.toLocaleString('en-US', options);
            this.formData.content = this.message
            await this.SendMessage(this.chatId, this.formData)
            
            if (this.chatResponse.sendResponse === "success"){
                this.message = ""
                const temp = {
                    sender: this.formData.sender,
                    content: this.formData.content,
                    time: this.formData.time
                }
                this.history.push(temp)
                socket.emit("send-message", { roomId: this.chatId, content: temp })
            }
            else if (this.chatResponse.sendResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your connection! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        },
        LeavingRoom(){
            socket.emit("leave-room", { roomId: this.chatId })
                socket.on("leave-room-response", (data) => {
                    if (data.message === "success"){
                        //  leave room here
                        if (this.patient){
                            this.setPatientNavLink('form')
                            window.location.reload();
                        }
                        else{
                            this.setMedAssitanceNav('list')
                            window.location.reload();
                        }
                    }
                })
            
        }
    },
    created: function(){
        this.CheckChat()
    },
    watch: {
        history: function(){
            this.$nextTick(() => {
                this.$refs.parentChat.scrollTop = this.$refs.parentChat.scrollHeight;
            });
        }
    },
    setup(){
        const {
            chatProcessing,
            chatValues,
            chatResponse,
            GetHistory,
            SendMessage
        } = Chat()

        return{
            chatProcessing,
            chatValues,
            chatResponse,
            GetHistory,
            SendMessage
        }
    }
}
</script>

<style>
.left-chat{
    background-color: azure; 
    width: 40%; 
    clear: both; 
    float: left;
    word-wrap:break-word;
}
.right-chat{
    background-color: azure;
    width: 40%; 
    clear: both; 
    float: right;
    word-wrap:break-word;
}
.parent-chat{
    background-color: #7e7c7c; 
    height: 60vh; 
    overflow-y: auto; 
    overflow-x: hidden;
}
.child-chat{
    margin-bottom: 10px;
}
</style>