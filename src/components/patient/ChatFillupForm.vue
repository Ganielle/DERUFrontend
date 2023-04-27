<template>
    <MDBContainer class="px-0" style="background-color: aqua;">
        <div class="p-5 text-center bg-light rounded jumbotron">
            <form v-on:submit.prevent="onSubmit">
                <strong>FILL UP INCIDENT DETAILS</strong>
                <br><br>
                <MDBInput type="text" label="Nature of Incident" wrapperClass="mb-4" 
                    v-model="formData.natureOfAccident" required/>
                <MDBInput type="text" label="Name of patient" wrapperClass="mb-4" 
                    v-model="formData.nameOfPatient" required/>
                <MDBInput type="number" label="Contact Number" wrapperClass="mb-4" 
                    v-model="formData.contactNumber" required/>
                <MDBRow>
                    <MDBCol>
                        <MDBInput type="text" label="Location of Incident" wrapperClass="mb-4" 
                            v-model="formData.location" required/>
                    </MDBCol>
                    <MDBCol>
                        <MDBInput type="text" label="Landmarks" wrapperClass="mb-4" 
                            v-model="formData.landmarks"/>
                    </MDBCol>
                </MDBRow>
                <MDBInput type="text" label="Old Chat ID" wrapperClass="mb-4" 
                    v-model="roomID"/>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBBtn :hidden="requestingChat" color="primary" @click="ToChatRoom">REQUEST ASSISTANCE</MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        <MDBBtn :hidden="requestingChat" color="success" @click="ExistingChat">GO TO EXISTING CHAT</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </form>
            <br>
            <div v-if="requestingChat" class="text-center">
                <strong>Your chatroom ID is {{ chatroomId }}</strong> <MDBBtn color="warning" size="sm"
                    @click="CopyToClipboard">
                    <MDBIcon fas class="fa-clipboard-list" />
                </MDBBtn>
                <br><strong>Please take note of your chatroom ID for future reference</strong>
                <br><strong>Awaiting request confirmation</strong>
            </div>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdb-vue-ui-kit';
import {useToast} from 'vue-toast-notification';
import { mapMutations } from 'vuex';
export default{
    name: 'PatientForm',
    props:{
        chatroomId: String,
        requestingChat: Boolean
    },
    data(){
        return{
            formData: {
                natureOfAccident: "",
                nameOfPatient: "",
                contactNumber: "",
                location: "",
                landmarks: "",
                status: "NOT YET APPROVE"
            },
            roomID: "",
            toast: useToast(),
        }
    },
    components: {
        MDBContainer,
        MDBInput,
        MDBBtn,
        MDBRow,
        MDBCol,
        MDBIcon
    },
    methods:{
        ...mapMutations(["setPatientNavLink"]),
        async ExistingChat(){
            if (this.roomID === ""){
                this.toast.open({
                    message: "Please fill up the old chat ID first",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }
            else if (this.requestingChat){
                this.toast.open({
                    message: "There's a current chat request going on! Please wait for a bit to be approve",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }

            this.$emit("oldChat", this.roomID)
        },
        async ToChatRoom(){
            if (this.formData.natureOfIncident === "" || this.formData.nameOfPatient === "" ||
                this.formData.contactNumber === "" || this.formData.location === ""){
                    this.toast.open({
                        message: "Please fill up the form first",
                        type: 'error',
                        position: 'top',
                        duration: 3000,
                        dismissible: true
                    })
                return;
            }
            else if (this.requestingChat){
                this.toast.open({
                    message: "There's a current chat request going on! Please wait for a bit to be approve",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }
            this.$emit("requestChat", this.formData)
        },
        CopyToClipboard(){
            navigator.clipboard.writeText(this.chatroomId)
            .then(() => {
                this.toast.open({
                    message: "Room ID copied to clipboard!",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            })
            .catch((error) => {
                this.toast.open({
                    message: "Error copying to clipboard: " + error,
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            })
        }
    }
}
</script>

<style>
.jumbotron{
    width: auto; /* Can be in percentage also. */
    height: auto;
    margin: 0 auto;
    position: relative;
}
</style>