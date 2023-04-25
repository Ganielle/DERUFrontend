<template>
    <div class="bg">
        <br>
        <MDBBtn color="primary" @click="() => {
            this.$router.push({name: 'home'})
        }" style="margin-left: 5vw;">RETURN TO LOGIN</MDBBtn>
        <div v-if="currentPatientChatNav === 'form'" class="centerpanel">
            <PatientForm />
        </div>
    </div>
    
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit';
import { mapState, mapMutations } from 'vuex';
import PatientForm from '@/components/patient/ChatFillupForm.vue'
export default{
    name: 'PatientChat',
    components:{
        PatientForm,
        MDBBtn
    },
    computed:{
        ...mapState(["currentPatientChatNav"])
    },
    methods: {
        ...mapMutations(["setPatientNavLink"])
    }
}
</script>

<style>
.bg{
    width: 100vw;
    min-height: 100vh;
    background-color: aqua;
    margin-top: 0%;
}
.centerpanel{
    padding-top: 10vh;
}
</style>
