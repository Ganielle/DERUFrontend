<template>
    <div v-if="stepIndex == 0">
        <RegisterForm />
    </div>
    <div v-if="stepIndex == 1">
        <HospitalForm />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import RegisterForm from '@/components/sessions/register/RegisterForm.vue'
import HospitalForm from '@/components/sessions/register/RegisterHospitalForm.vue'

export default{
    name: 'FormViewer',
    components: {
        RegisterForm,
        HospitalForm
    },
    computed: {
        ...mapState(["stepIndex"])
    },
    methods: {
        ...mapMutations(["restartSignupStep"])
    },
    created: function() {
        this.restartSignupStep(0)
    }
}
</script>

<style>

</style>
