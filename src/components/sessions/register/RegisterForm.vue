<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
        <h1>REGISTER YOUR ACCOUNT</h1>
        <h4>Fill up the form to proceed to the next step</h4>
        <br>
            <form v-on:submit.prevent="onSubmit">
                    <!-- username input -->
                    <MDBInput
                    type="text"
                    label="username"
                    id="username"
                    v-model="username"
                    class="form-input"
                    wrapperClass="mb-4"
                    required
                    />

                    <!-- password input -->
                    <MDBInput
                    type="password"
                    label="password"
                    id="password"
                    v-model="password"
                    class="form-input"
                    wrapperClass="mb-4"
                    required
                    />
                    <div class="grid">
                        <div class="g-col-6 g-col-md-4">
                            <!-- first name input -->
                            <MDBInput
                            type="text"
                            label="First Name"
                            id="fname"
                            v-model="fname"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                            />
                        </div>
                        <div class="g-col-6 g-col-md-4">
                            <!-- middle name input -->
                            <MDBInput
                            type="text"
                            label="Middle Name(Optional)"
                            id="mname"
                            v-model="mname"
                            class="form-input"
                            wrapperClass="mb-4"
                            />
                        </div>
                    </div>
                    <!-- last name input -->
                    <MDBInput
                            type="text"
                            label="Last Name"
                            id="lname"
                            v-model="lname"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                            />
                    <!-- email input -->
                    <MDBInput
                    type="email"
                    label="email"
                    id="email"
                    v-model="email"
                    class="form-input"
                    wrapperClass="mb-4"
                    formText="We'll never share your data with anyone else."
                    required
                    />
                    
                    <MDBBtn color="primary" class="mb-4 next-step"
                    @click="AddStep(1)" type="submit"> NEXT STEP </MDBBtn>
                </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {MDBBtn, MDBInput} from "mdb-vue-ui-kit"

export default{
    name: 'RegisterForm',
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
        ...mapState(["stepIndex", "registerAccount"])
    },
    methods: {
        ...mapMutations(["addSignupStep", "addRegisterAccount"]),
        CheckValues(){
            if (this.registerAccount.length <= 0){
                return;
            }

            this.username = this.registerAccount[0] !== "" ? this.registerAccount[0] : ""
            this.password = this.registerAccount[1] !== "" ? this.registerAccount[1] : ""
            this.fname = this.registerAccount[2] !== "" ? this.registerAccount[2] : ""
            this.mname = this.registerAccount[3] !== "" ? this.registerAccount[3] : ""
            this.lname = this.registerAccount[4] !== "" ? this.registerAccount[4] : ""
            this.email = this.registerAccount[5] !== "" ? this.registerAccount[5] : ""
        },
        AddStep(value){
            if (this.username !== "" && this.password !=="" &&
                this.fname !== "" && this.lname !== "" && this.email !== ""){
                this.addRegisterAccount([this.username, this.password, this.fname, this.mname, 
                    this.lname, this.email])
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
