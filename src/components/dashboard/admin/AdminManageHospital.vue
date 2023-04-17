<template>
    <DashboardBreadcrumbs breadcrumbs="HOSPITAL MANAGEMENT / MANAGE" />
    <MDBContainer fluid clas="px-0">
        <div class="list-title-bg">
            <div class="list-title">HOSPITAL LIST</div>
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
                        <th scope="col" class="table-dark">HOSPITAL NAME</th>
                        <th scope="col" class="table-dark">ACCOUNT OWNER</th>
                        <th scope="col" class="table-dark">REGULAR BED</th>
                        <th scope="col" class="table-dark">COVID BED</th>
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
import { MDBContainer, MDBTable, MDBIcon } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
export default{
    name: 'ManageHospital',
    components: {
        DashboardBreadcrumbs,
        MDBContainer,
        // MDBBtn
        MDBTable,
        MDBIcon
    }
}
</script>

<style>
.list-table{
    margin-top: 3vh;
}
.list-title-bg {
  background-color: rgb(2, 107, 206);
  font-weight: bold;
  color: rgb(209, 209, 209);
  font-size: 2rem;
}
.list-title{
    margin-left: 2vw;
}
.tc-pager,
.tc-page {
  background-color: #3d4e65;
  color: #f9b948;
  padding: 0.25rem 0.8rem;
  margin: 0 0.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
}
</style>
