<template>
    <div class="register">
        <div class="back-home">
            <router-link to="/">
                <MDBBtn color="primary" class="mb-4"> RETURN TO LOGIN </MDBBtn>
            </router-link>
        </div>
        <br>
        <div class="center">
            <RegisterSteps />
            <FormViewer />
        </div>
    </div>
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit';
import RegisterSteps from '@/components/sessions/register/RegisterSteps.vue'
import FormViewer from '@/components/sessions/register/RegisterFormViewer.vue'

export default{
    name: 'RegisterView',
    components: {
        MDBBtn,
        RegisterSteps,
        FormViewer
    }
}
</script>

<style>
.back-home{
    float:left;
    padding-left: 10px;
    padding-top: 10px;
}
.register{
    width: 100%;
    height: 100%;
    background-color: aqua;
    margin: 0;
}

.center{
    padding-top: 5vh;
    padding-left: 5vh;
    padding-right: 5vh;
}
</style>
