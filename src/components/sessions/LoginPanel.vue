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
                    @click="LoginProcess()"> 
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
import { Login } from "../../modules/login";
import {useToast} from 'vue-toast-notification';
export default{
    name: 'LoginPanel',
    data() {
        return{
            username: "",
            password: "",
            processing: false,
            toast: useToast(),
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
        async LoginProcess(){
            if (this.username === "" && this.password === ""){
                return;
            }
            
            this.processing = true
            this.fields.username = this.username
            this.fields.password = this.password

            //  BACKEND PROCESS HERE
            await this.Validate()
            // console.log(this.response.data)
            if (this.response.type === "success"){
                
                this.toast.open({
                    message: this.response.message,
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.restartDashboardLink("dashboard")
                if (this.response.role === process.env.VUE_APP_ADMINISTRATOR_ID){
                    this.$router.push({name: "adminDashboard"})
                }
            }
            else{
                this.toast.open({
                    message: this.response.message,
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.processing = false
            }
        }
    },
    setup () {
        const { fields, response, Validate } = Login()

        return { fields, response, Validate}
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
