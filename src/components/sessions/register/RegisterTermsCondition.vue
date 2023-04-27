<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
            <h1>TERMS AND CONDITION</h1>
            <h4>Agree to the terms and condition in order to signup</h4>
            <br>
            <div class="p-5 jumbotron-content rounded">
                TERMS AND CONDITIONS
                <br><br>
                Welcome to Dauis Emergency Response and Referral System ("System"). 
                By accessing or using the System, you agree to be bound by these Terms and
                 Conditions ("Terms"). If you do not agree with any part of these Terms, 
                 you may not use the System.
                <br><br>

                Acceptance of Terms.
                These Terms constitute a legal agreement between you and Dauis Emergency Response Unit
                 (DERU), the owner of the System. By clicking "I agree" or by using the System, you
                  agree to be bound by these Terms. You also represent and warrant that you have the
                   legal authority to accept these Terms.
                <br><br>
                Use of the System.
                The System is intended to be used by Hospital staff, Rescue Team staff, and
                 Rural Health Unit staff to access emergency response and referral services.
                  By using the System, you agree to comply with all applicable laws and regulations,
                   including those related to privacy and data protection. You also agree to use the
                    System only for its intended purpose and not to misuse or abuse it in any way.
                <br><br>
                Registration and Account Security.
                In order to use the System, you must register and create an account. 
                You agree to provide accurate and complete information during the registration
                 process and to keep your account information up-to-date. You are responsible 
                 for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You agree to immediately notify
                   us of any unauthorized use of your account or any other breach of security.
                <br><br>
                User Content.
                The System may allow you to upload or submit content, such as medical records
                 or other information related to emergency response and referral services. You
                  represent and warrant that you have the right to upload or submit such content
                   and that the content does not infringe the rights of any third party. You also
                    grant us a non-exclusive, royalty-free, worldwide license to use, copy, modify,
                     and distribute your content for the purpose of providing the System.
                <br><br>
                Intellectual Property.
                The System and its content, including but not limited to text, graphics, logos, 
                images, and software, are the property of Dauis Emergency Response Unit (DERU)
                 or its licensors and are protected by copyright, trademark, and other intellectual 
                 property laws. You may not reproduce, modify, distribute, or otherwise use any part
                  of the System or its content without our prior written consent.
                <br><br>
                Limitation of Liability.
                The System is provided "as is" and we make no warranties or representations of any
                 kind, express or implied, including but not limited to warranties of merchantability,
                  fitness for a particular purpose, or non-infringement. We shall not be liable for
                   any damages, including but not limited to direct, indirect, incidental,
                    consequential, or punitive damages arising out of your use of the System.
                <br><br>
                Termination.
                We may terminate your access to the System at any time for any reason without prior
                 notice. You may also terminate your account by contacting us. Upon termination, 
                 your account and all content associated with it will be deleted.
                <br><br>
                Governing Law and Jurisdiction.
                These Terms shall be governed by and construed in accordance with the laws 
                of the Philippines. Any disputes arising out of or relating to these Terms or the 
                System shall be resolved by the courts of the Philippines.
                <br><br>
                Changes to Terms.
                We reserve the right to modify these Terms at any time without prior notice. 
                Your continued use of the System after any such modification constitutes your 
                acceptance of the modified Terms.
                <br><br>
                Entire Agreement.
                These Terms constitute the entire agreement between you and Dauis Emergency Response
                 Unit (DERU) with respect to the use of the System and supersede all prior or 
                 contemporaneous communications and proposals, whether oral or written, between 
                 you and Dauis Emergency Response Unit (DERU) regarding the System.
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
