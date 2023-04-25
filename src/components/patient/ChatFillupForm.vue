<template>
    <MDBContainer class="px-0" style="background-color: aqua;">
        <div class="p-5 text-center bg-light rounded jumbotron">
            <form v-on:submit.prevent="onSubmit">
                <strong>FILL UP INCIDENT DETAILS</strong>
                <br><br>
                <MDBInput type="text" label="Nature of Incident" wrapperClass="mb-4" 
                    v-model="formData.natureOfIncident"/>
                <MDBInput type="text" label="Name of patient" wrapperClass="mb-4" 
                    v-model="formData.nameOfPatient"/>
                <MDBInput type="number" label="Contact Number" wrapperClass="mb-4" 
                    v-model="formData.contactNumber"/>
                <MDBRow>
                    <MDBCol>
                        <MDBInput type="text" label="Location of Incident" wrapperClass="mb-4" 
                            v-model="formData.location"/>
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
                        <MDBBtn color="primary" type="submit">REQUEST ASSISTANCE</MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        <MDBBtn color="success" @click="ExistingChat">GO TO EXISTING CHAT</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </form>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
import {useToast} from 'vue-toast-notification';
export default{
    name: 'PatientForm',
    data(){
        return{
            formData: {
                natureOfIncident: "",
                nameOfPatient: "",
                contactNumber: "",
                location: "",
                landmarks: ""
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
        MDBCol
    },
    methods:{
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