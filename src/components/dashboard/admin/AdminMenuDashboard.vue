<template>
    <MDBContainer fluid class="px-0">
        <DashboardBreadcrumbs breadcrumbs="DASHBOARD" />
        <MDBContainer fluid class="px-0 su-first-row">
            <MDBContainer>
                <MDBRow class="mx-0">
                    <StatusCards :process="processing.gettingData" title="Total # of Users" :value="values.userCount" />
                    <StatusCards :process="hospitalProcessing.gettingData" title="Total # of Hospitals"
                        :value="hospitalValues.hospitalCount" />
                    <StatusCards title="Total # of Reports" :value="pcrValues.totalPCR" />
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBRow } from 'mdb-vue-ui-kit';
import { onMounted } from 'vue';
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
import StatusCards from '@/components/dashboard/cards/StatusCards.vue';
import { Users } from '../../../modules/Users'
import { Hospitals } from '../../../modules/hospital'
import { PCR } from '@/modules/pcr'
export default{
    name: 'AdminDashboardMenu',
    components: {
        DashboardBreadcrumbs,
        StatusCards,
        MDBContainer,
        MDBRow
    },
    setup() {

        const { values, processing, CountUsers} = Users()
        const { hospitalValues, hospitalProcessing, CountHospitals } = Hospitals()

        const { pcrValues, GetPCRCount } = PCR()

        onMounted (() => {
            CountUsers()
            CountHospitals()
            GetPCRCount()
        })

        return { values, processing, CountUsers,
            hospitalValues, hospitalProcessing, CountHospitals,
            pcrValues, GetPCRCount }
    }
}
</script>

<style>
.su-second-row {
  background-color: #232931;
}
</style>
