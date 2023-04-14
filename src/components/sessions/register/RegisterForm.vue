<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
        <h1>REGISTER YOUR ACCOUNT</h1>
        <h4>Fill up the form to proceed to the next step</h4>
        <br>
            <form>
                    <!-- username input -->
                    <MDBInput
                    type="text"
                    label="username"
                    id="username"
                    v-model="form3Email"
                    class="form-input"
                    wrapperClass="mb-4"
                    required
                    />

                    <!-- password input -->
                    <MDBInput
                    type="password"
                    label="password"
                    id="password"
                    v-model="form3Email"
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
                            v-model="form3Email"
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
                            v-model="form3Email"
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
                            v-model="form3Email"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                            />
                    <!-- email input -->
                    <MDBInput
                    type="email"
                    label="email"
                    id="email"
                    v-model="form3Email"
                    class="form-input"
                    wrapperClass="mb-4"
                    formText="We'll never share your data with anyone else."
                    required
                    />
                    
                    <MDBBtn color="primary" class="mb-4 next-step"> NEXT STEP </MDBBtn>
                </form>
        </div>
    </div>
    
</template>

<script>
import {MDBBtn, MDBInput} from "mdb-vue-ui-kit"

export default{
    name: 'RegisterForm',
    components: {
        MDBBtn,
        MDBInput
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
    color:aliceblue;
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
