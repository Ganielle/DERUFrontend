<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
        <h1>REGISTER HOSPITAL</h1>
        <h4>Fill up the form to proceed to the next step</h4>
        <br>
            <form v-on:submit.prevent="onSubmit">
                    <!-- username input -->
                    <MDBInput
                    type="text"
                    label="Hospital Name"
                    id="hospital"
                    v-model="hospital"
                    class="form-input"
                    wrapperClass="mb-4"
                    required
                    />

                    <div class="grid">
                        <div class="g-col-6 g-col-md-4">
                            <MDBInput
                            type="number"
                            label="Contact Number #1"
                            id="contactNumberOne"
                            v-model="numberOne"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                            />
                        </div>
                        <div class="g-col-6 g-col-md-4">
                            <MDBInput
                            type="number"
                            label="Contact Number #2"
                            id="contactNumber"
                            v-model="numberTwo"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                            />
                        </div>
                    </div>

                    <MDBInput
                        type="text"
                        label="Address"
                        id="address"
                        v-model="address"
                        class="form-input"
                        wrapperClass="mb-4"
                        required
                    />

                    <div class="grid">
                        <div class="g-col-6 g-col-md-4">
                            <MDBInput
                                type="number"
                                label="Number of Regular Beds"
                                id="regularBeds"
                                v-model="regularBed"
                                class="form-input"
                                wrapperClass="mb-4"
                                required
                            />
                        </div>
                        <div class="g-col-6 g-col-md-4">
                            <MDBInput
                                type="number"
                                label="Number of Covid Beds"
                                id="covideBeds"
                                v-model="covidBed"
                                class="form-input"
                                wrapperClass="mb-4"
                                required
                            />
                        </div>
                    </div>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn color="primary" class="mb-4 next-step"
                                @click="reduceSignupStep(1)"> PREVIOUS STEP </MDBBtn>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn color="primary" class="mb-4 next-step"
                                @click="AddStep(1)" type="submit"> NEXT STEP </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </form>
        </div>
    </div>
    
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol} from "mdb-vue-ui-kit"

export default{
    name: 'HospitalForm',
    data() {
        return{
            hospital: "",
            numberOne: "",
            numberTwo: "",
            address: "",
            regularBed: "",
            covidBed: ""
        }
    },
    components: {
        MDBBtn,
        MDBInput,
        MDBContainer,
        MDBCol,
        MDBRow
    },
    computed: {
        ...mapState(["stepIndex", "registerHospital"])
    },
    methods: {
        ...mapMutations(["addSignupStep", "reduceSignupStep", "addRegisterHospital"]),
        CheckValues(){
            if (this.registerHospital.length <= 0){
                return;
            }

            this.hospital = this.registerHospital[0] !== "" ? this.registerHospital[0] : ""
            this.numberOne = this.registerHospital[1] !== "" ? this.registerHospital[1] : ""
            this.numberTwo = this.registerHospital[2] !== "" ? this.registerHospital[2] : ""
            this.address = this.registerHospital[3] !== "" ? this.registerHospital[3] : ""
            this.regularBed = this.registerHospital[4] !== "" ? this.registerHospital[4] : ""
            this.covidBed = this.registerHospital[5] !== "" ? this.registerHospital[5] : ""
        },
        AddStep(value){
            if (this.hospital !== "" && this.numberOne !=="" &&
                this.numberTwo !== "" && this.address !== "" && this.regularBed !== ""
                && this.covidBed !== ""){
                this.addRegisterHospital([this.hospital, this.numberOne, this.numberTwo,
                    this.address, this.regularBed, this.covidBed])
                this.addSignupStep(value)
            }
        }
    },
    created: function() {
        this.CheckValues()
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
.grid{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(40%, 200fr));
}
h1{
    overflow-wrap: break-word;
}
</style>
