<template>
    <div class="p-5 text-center bg-light jumbotron rounded">
        <h1 class="mb-3">DERU</h1>
        <h4 class="mb-3">Daius Emergency Response Unit</h4>
        <form>
        <!-- Email input -->
        <MDBInput
        type="text"
        label="username"
        id="username"
        v-model="form3Email"
        wrapperClass="mb-4"
        />
        <!-- Password input -->
        <MDBInput
        type="password"
        label="Password"
        id="password"
        v-model="form3Password"
        wrapperClass="mb-4"
        />

        <MDBBtn color="primary" block class="mb-4"> Login </MDBBtn>
        <!-- Submit button -->
        <MDBBtn color="primary" block class="mb-4"> Sign up </MDBBtn>
  </form>
    </div>
    
</template>

<script>
import {MDBBtn, MDBInput} from "mdb-vue-ui-kit"
export default{
    name: 'LoginPanel',
    components: {
        MDBBtn,
        MDBInput
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
