<template>
    <div v-if="stepIndex == 0">
        <RegisterForm />
    </div>
    <div v-else-if="stepIndex == 1">
        <HospitalForm />
    </div>
    <div v-else-if="stepIndex == 2">
        <TermsCondition />
    </div>
    <div v-else>
        <RegisterWelcome />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import RegisterForm from '@/components/sessions/register/RegisterForm.vue'
import HospitalForm from '@/components/sessions/register/RegisterHospitalForm.vue'
import TermsCondition from '@/components/sessions/register/RegisterTermsCondition.vue'
import RegisterWelcome from '@/components/sessions/register/RegisterWelcome.vue';

export default{
    name: 'FormViewer',
    components: {
        RegisterForm,
        HospitalForm,
        TermsCondition,
        RegisterWelcome
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
