<template>
    <div class="p-5 text-center bg-light jumbotron rounded">
        <h1 class="mb-3">DERU</h1>
        <h4 class="mb-3">Daius Emergency Response Unit</h4>
        <form v-on:submit.prevent="onSubmit">
        <!-- Email input -->
        <MDBInput
        type="text"
        label="username"
        id="username"
        v-model="username"
        wrapperClass="mb-4"
        required
        />
        <!-- Password input -->
        <MDBInput
        type="password"
        label="Password"
        id="password"
        v-model="password"
        wrapperClass="mb-4"
        required
        />
        
        <MDBContainer>
            <MDBRow>
                <MDBCol>
                    <router-link to="/register">
                        <MDBBtn color="primary" block class="mb-4"> Sign up </MDBBtn>
                    </router-link>
                </MDBCol>
                <MDBCol>
                    <MDBBtn color="primary" block class="mb-4" type="submit" 
                    @click="Login()"> 
                        <div v-if="!processing">
                            Login
                        </div>
                        <div v-else>
                            <MDBSpinner size="sm" />
                        </div>
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <MDBBtn color="primary" block class="mb-4" type="submit">I'm a patient</MDBBtn>
  </form>
    </div>
    
</template>

<script>
import { mapMutations } from "vuex";
import {MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol, MDBSpinner} from "mdb-vue-ui-kit"
export default{
    name: 'LoginPanel',
    data() {
        return{
            username: "",
            password: "",
            processing: false
        }
    },
    components: {
        MDBBtn,
        MDBInput,
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBSpinner
    },
    methods: {
        ...mapMutations(["restartDashboardLink"]),
        Login(){
            if (this.username === "" && this.password === ""){
                return;
            }
            
            this.processing = true
            this.restartDashboardLink("dashboard")
            //  BACKEND PROCESS HERE
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
