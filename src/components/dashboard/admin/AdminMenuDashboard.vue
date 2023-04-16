<template>
    <MDBContainer fluid class="px-0">
        <DashboardBreadcrumbs breadcrumbs="DASHBOARD" />
        <MDBContainer fluid class="px-0 su-first-row">
            <MDBContainer>
                <MDBRow class="mx-0">
                    <StatusCards title="Total # of Users" value="0" />
                    <StatusCards title="Total # of Hospitals" value="0" />
                    <StatusCards title="Total # of Reports" value="0" />
                </MDBRow>
            </MDBContainer>
        </MDBContainer>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBRow } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
import StatusCards from '@/components/dashboard/cards/StatusCards.vue';
export default{
    name: 'AdminDashboardMenu',
    components: {
        DashboardBreadcrumbs,
        StatusCards,
        MDBContainer,
        MDBRow
    }
}
</script>

<style>
.su-first-row {
}

.su-second-row {
  background-color: #232931;
}

.su-third-row {
}
</style>
