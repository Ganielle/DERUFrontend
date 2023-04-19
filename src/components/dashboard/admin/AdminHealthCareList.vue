<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / HEALTHCARE PROVIDER STAFF LIST" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">HEALTHCARE PROVIDER STAFF LIST</div>
        </div>
        <div class="list-table">
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">1</div>
                <button class="tc-pager" role="button">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>
            <MDBTable responsive class="align-middle mb-0 bg-white">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark">ACCOUNT NAME</th>
                        <th scope="col" class="table-dark">STATUS</th>
                        <th scope="col"  class="table-dark">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" class="text-center">No Data Yet!</td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBIcon, MDBTable } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
export default{
    name: 'RescueList',
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        MDBIcon,
        MDBTable
    }
}
</script>

<style>

</style>
