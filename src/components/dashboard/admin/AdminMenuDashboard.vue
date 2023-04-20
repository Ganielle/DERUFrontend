<template>
    <MDBContainer fluid class="px-0">
        <DashboardBreadcrumbs breadcrumbs="DASHBOARD" />
        <MDBContainer fluid class="px-0 su-first-row">
            <MDBContainer>
                <MDBRow class="mx-0">
                    <StatusCards :process="processing.gettingData" title="Total # of Users" :value="values.userCount" />
                    <StatusCards :process="hospitalProcessing.gettingData" title="Total # of Hospitals"
                        :value="hospitalValues.hospitalCount" />
                    <StatusCards title="Total # of Reports" value="0" />
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

        onMounted (() => {
            CountUsers()
            CountHospitals()
        })

        return { values, processing, CountUsers,
            hospitalValues, hospitalProcessing, CountHospitals}
    }
}
</script>

<style>
.su-second-row {
  background-color: #232931;
}
</style>
