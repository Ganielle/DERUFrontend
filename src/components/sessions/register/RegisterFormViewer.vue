<template>
    <div v-if="processing.gettingData">
        <div class="loader-spinner text-center">
            <MDBSpinner size="lg" />
        </div>
    </div>
    <div v-else>
        <div v-if="stepIndex == 0">
        <RegisterForm />
        </div>
        <div v-else-if="stepIndex == 1">
            <HospitalForm :Variance="variants.variance" />
        </div>
        <div v-else-if="stepIndex == 2">
            <TermsCondition />
        </div>
        <div v-else>
            <RegisterWelcome />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { onMounted } from 'vue';
import { MDBSpinner } from 'mdb-vue-ui-kit';
import { Variance } from '../../../modules/hospitalVariants'
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
        RegisterWelcome,
        MDBSpinner
    },
    computed: {
        ...mapState(["stepIndex"])
    },
    methods: {
        ...mapMutations(["restartSignupStep"])
    },
    created: function() {
        this.restartSignupStep(0)
    },
    setup() {
        
        const { variants, processing, GetAllVariance } = Variance()

        onMounted(() => {
            GetAllVariance()
        })
        return { variants, processing, GetAllVariance }
    }
}
</script>

<style>
.loader-spinner{
    margin-top: 5vh;
    height: 100vh;
}
</style>
