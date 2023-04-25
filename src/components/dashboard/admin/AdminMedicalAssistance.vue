<template>
    <DashboardBreadcrumbs breadcrumbs="MEDICAL ASSISTANCE" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">CHAT HISTORY</div>
        </div>
        <br>
        <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
            <button class="tc-pager" role="button"
                @click="() => { 
                }">
                <MDBIcon fas icon="angle-double-left" />
            </button>
            <div class="tc-page">1</div>
            <button class="tc-pager" role="button" 
                @click="() => {
                }">
                <MDBIcon fas icon="angle-double-right" />
            </button>
        </MDBContainer>

        <MDBTable responsive hover class="align-middle mb-0 bg-white text-center">
            <thead class="bg-dark table-dark text-center">
                <tr>
                    <th scope="col">CHATROOM ID</th>
                    <th scope="col">HANDLER</th>
                    <th scope="col">PATIENT</th>
                    <th scope="col">APPROVE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ACTION</th>
                </tr>
            </thead>
        </MDBTable>
    </MDBContainer>
</template>

<script>
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
import { MDBContainer, MDBTable, MDBIcon } from 'mdb-vue-ui-kit';
export default{
    name: 'MedicalAssistance',
    components: {
        DashboardBreadcrumbs,
        MDBContainer,
        MDBTable,
        MDBIcon
    }
}
</script>

<style>
</style>
