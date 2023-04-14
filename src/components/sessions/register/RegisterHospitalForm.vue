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
                    v-model="username"
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
                            v-model="password"
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
                            v-model="password"
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
                        v-model="lname"
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
                                v-model="email"
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
                                v-model="email"
                                class="form-input"
                                wrapperClass="mb-4"
                                required
                            />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="g-col-6 g-col-md-4">
                            <MDBBtn color="primary" class="mb-4 next-step"
                                @click="reduceSignupStep(1)"> PREVIOUS STEP </MDBBtn>
                        </div>
                        <div class="g-col-6 g-col-md-4">
                            <MDBBtn color="primary" class="mb-4 next-step"
                                @click="AddStep(1)" type="submit"> NEXT STEP </MDBBtn>
                        </div>
                    </div>
                </form>
        </div>
    </div>
    
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {MDBBtn, MDBInput} from "mdb-vue-ui-kit"

export default{
    name: 'HospitalForm',
    data() {
        return{
            username: "",
            password: "",
            fname: "",
            mname: "",
            lname: "",
            email: ""
        }
    },
    components: {
        MDBBtn,
        MDBInput
    },
    computed: {
        ...mapState(["stepIndex"])
    },
    methods: {
        ...mapMutations(["addSignupStep", "reduceSignupStep"]),
        AddStep(value){
            if (this.username !== "" && this.password !=="" &&
                this.fname !== "" && this.lname !== "" && this.email !== ""){
                this.addSignupStep(value)
            }
        }
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
