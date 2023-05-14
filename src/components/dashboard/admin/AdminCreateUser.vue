<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / CREATE USER ACCOUNTS" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">CREATE USER ACCOUNTS</div>
        </div>
        <div class="p-5 text-center bg-light jumbotron rounded">
            <form v-on:submit.prevent="onSubmit">
                <MDBInput
                    type="text"
                    label="Username"
                    id="username"
                    v-model="username"
                    wrapperClass="mb-4"
                />
                <MDBRow >
                    <MDBCol col="7">
                        <MDBInput
                            type="password"
                            label="Password"
                            id="password"
                            v-model="password"
                            wrapperClass="mb-4"
                            disabled
                        />
                    </MDBCol>
                    <MDBCol col="1">
                        <MDBBtn color="warning" size="md"
                            @click="CopyToClipboard"
                            :disabled="password == '' ? true : false">
                            <MDBIcon fas class="fa-clipboard-list" />
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        <MDBBtn block color="primary" size="md" @click="GeneratePassword">
                            Generate password
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <br/>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                        type="text"
                        label="First Name"
                        id="fname"
                        v-model="fname"
                        wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name (Optional)"
                            id="mname"
                            v-model="mname"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Last Name"
                            id="lname"
                            v-model="lname"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    wrapperClass="mb-4"
                />
                <div class="d-flex flex-wrap my-3">
                    <div class="flex-grow-1 mx-1 mb-3">
                        <select class="form-select cua-input-select-2" name="role" v-model="type">
                            <option value="">CHOOSE ACCOUNT TYPE</option>
                            <option :value="rhuID">Rural Health Staff</option>
                            <option :value="rescueID">Rescue Team Staff</option>
                        </select>
                    </div>
                </div>
                <div v-if="processing.createUser">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="primary" block class="mb-4" type="submit" @click="CreateHigherUser"> CREATE ACCOUNT </MDBBtn>
                </div>
            </form>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn, MDBRow, MDBCol, MDBSpinner, MDBIcon } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { Users } from '../../../modules/Users'
import {useToast} from 'vue-toast-notification';
export default{
    name: 'CreateUsers',
    data() {
        return {
            username: "",
            password: "",
            fname: "",
            mname: "",
            lname: "",
            email: "",
            type: "",
            toast: useToast(),
            rhuID: process.env.VUE_APP_RHU_ID,
            rescueID: process.env.VUE_APP_RESCUE_TEAM_ID
        }
    },
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        MDBInput,
        MDBBtn,
        MDBRow,
        MDBCol,
        MDBSpinner,
        MDBIcon
    },
    methods: {
        async CreateHigherUser(){

            if (this.username == "" || this.password == "" || this.fname == "" || this.lname == "" ||
            this.email == "" || this.type === ""){
                this.toast.open({
                    message: "Please fill up the form first!",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }
            await this.HigherAccount(this.type, this.username, this.password,
            this.email, this.fname, this.mname, this.lname)

            if (this.response.createAccountResponse === "success"){
                this.toast.open({
                    message: "User Approve Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing.createUser = false;
                this.response.createAccountResponse = ""
                this.username = ""
                this.password = ""
                this.fname = ""
                this.mname - ""
                this.lname = ""
                this.email = ""
                this.type = ""
            }
            else if (this.response.createAccountResponse === "bad-request"){
                this.toast.open({
                    message: "Duplicate User account ! Please try again.",
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
        CopyToClipboard(){
            navigator.clipboard.writeText(this.password)
            .then(() => {
                this.toast.open({
                    message: "password copied to clipboard!",
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
        },
        GeneratePassword(){
            var randomstring = Math.random().toString(36).slice(-8)
            this.password = randomstring
        }
    },  
    setup(){
        const { processing, response, HigherAccount } = Users()


        return {  processing, response, HigherAccount }
    }
}
</script>

<style>
.jumbotron{
    margin-top: 4vh;
}
.cua-input-select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: transparent !important;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
  color: rgb(255, 255, 255) !important;
}

</style>
