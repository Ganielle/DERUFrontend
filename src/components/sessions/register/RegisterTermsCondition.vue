<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
            <h1>TERMS AND CONDITION</h1>
            <h4>Agree to the terms and condition in order to signup</h4>
            <br>
            <div class="p-5 jumbotron-content rounded">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
                <br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.</p>
            </div>
            <form v-on:submit.prevent="onSubmit">
                <br>
                <MDBCheckbox class="terms-condition-accept" label="Do you agree to DERU's Response Unit 
                Terms and Conditions?" v-model="accepted"/>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBBtn color="primary" class="mb-4 next-step"
                            @click="previousStep()"> PREVIOUS STEP </MDBBtn>
                        </MDBCol>
                        <MDBCol>
                            <MDBBtn color="primary" class="mb-4 next-step"
                            @click="finishSignup(1)" type="submit"> 
                                <div v-if="!processing">
                                    FINISH SIGN UP
                                </div>
                                <div v-else>
                                    <MDBSpinner size="sm" />
                                </div>
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MDBCheckbox, MDBBtn, MDBContainer, MDBRow, MDBCol,
    MDBSpinner } from 'mdb-vue-ui-kit';
import {useToast} from 'vue-toast-notification';
import { Signup } from '../../../modules/signup'

export default{
    name: 'TermsCondition',
    data() {
        return{
            accepted: false,
            toast: useToast(),
            processing: false
        }
    },
    components: {
        MDBCheckbox,
        MDBBtn,
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBSpinner
    },
    computed: {
        ...mapState(["stepIndex", "registerAccount", "registerHospital", "selectedVariants",
             "termsCondition"])
    },
    methods: {
        ...mapMutations(["addSignupStep", "reduceSignupStep", "addTermsCondition"]),
        previousStep(){
            if (this.processing){
                return;
            }
            this.reduceSignupStep(1)
        },
        async finishSignup(value){
            if (!this.accepted){
                this.toast.open({
                    message: "Please accept the terms and condition first!",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                return;
            }
            // ADD BACKEND HERE
            this.processing = true;

            this.fields.roleId = process.env.VUE_APP_HEALTHCARE_STAFF
            this.fields.username = this.registerAccount[0]
            this.fields.password = this.registerAccount[1]
            this.fields.fname = this.registerAccount[2]
            this.fields.mname = this.registerAccount[3]
            this.fields.lname = this.registerAccount[4]
            this.fields.email = this.registerAccount[5]

            this.fields.display_name = this.registerHospital[0]

            this.fields.landline = this.registerHospital[1]
            this.fields.cellphone = this.registerHospital[2]
            this.fields.address = this.registerHospital[3]
            this.fields.regularBeds = this.registerHospital[4]
            this.fields.covidBeds = this.registerHospital[5]

            this.fields.variance = this.selectedVariants

            await this.SaveData();
            console.log(this.status.type)
            if (this.status.type === "success"){
                this.toast.open({
                    message: this.status.message,
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.addSignupStep(value)
            }
            else{
                this.toast.open({
                    message: this.status.message,
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing = false;
            }
        }
    },
    setup() {
        const { fields, status, SaveData} = Signup()

        return { fields, status, SaveData }
    }
}
</script>

<style>
.register-form{
    /* margin-top: 5vh; */
    padding-bottom: 100px;
    /* padding-left: 50vh; */
    /* padding-right: 50vh; */
}
.form-input{
    color: #000000;
}
.next-step{
    margin-top: 50px;
}
h1{
    overflow-wrap: break-word;
}
.jumbotron-content{
    overflow-y: auto;
    background-color: #616161;
    max-height: 500px;
    color: whitesmoke;
    display: inline-block;
}
.form-check-label {
    float: left
}
</style>
