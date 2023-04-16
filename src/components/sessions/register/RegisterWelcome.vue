<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
            <h1>WELCOME TO DERU'S RESPONSE UNIT SYSTEM</h1>
            <h4>Please wait for 2 - 3 business days<br>to process your account <br>
                The team will contact you through your email</h4>
            <router-link to="/">
                <MDBBtn color="primary" class="mb-4 next-step">
                    BACK TO LOGIN
                </MDBBtn>
            </router-link>
        </div>
    </div>
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit';
export default{
    name: 'RegisterWelcome',
    components: {
        MDBBtn
    }
}
</script>

<style>

</style>
