\<template>
    <MDBContainer fluid class="px-0">
        <DashboardBreadcrumbs breadcrumbs="DASHBOARD" />
        <MDBContainer fluid class="px-0 su-first-row">
            <MDBContainer>
                <MDBRow class="mx-0">
                    <StatusCards :process="processing.gettingData" title="Total # of Users" :value="values.userCount" />
                    <StatusCards :process="hospitalProcessing.gettingData" title="# of Referred Patients"
                        :value="pcrValues.totalWithReferral" />
                    <StatusCards title="# of Patients Refused for Transport" :value="pcrValues.totalNoReferral" />
                    <StatusCards title="% of Patients Lost Consciousness Prior to Arrival" 
                        :value="PercentageLostConsciousness" />
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
    computed: {
        PercentageLostConsciousness(){
            var percentage = Math.round((this.pcrValues.totalLostConsciousness / this.pcrValues.totalPCR) * 100)

            if (isNaN(percentage)){
                return "%0"
            }
            else{
                return "%" + percentage
            }
        }
    },
    setup() {

        const { values, processing, CountUsers} = Users()
        const { hospitalValues, hospitalProcessing, CountHospitals } = Hospitals()

        const { pcrValues, GetPCRCount, CountReferral, CountLostConsciousness } = PCR()

        onMounted (() => {
            CountUsers()
            CountHospitals()
            GetPCRCount()
            CountReferral(true)
            CountReferral(false)
            CountLostConsciousness(true)
        })

        return { values, processing, CountUsers,
            hospitalValues, hospitalProcessing, CountHospitals,
            pcrValues, GetPCRCount, CountReferral, CountLostConsciousness }
    }
}
</script>

<style>
.su-second-row {
  background-color: #232931;
}
</style>
