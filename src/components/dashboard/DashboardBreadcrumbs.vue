<template>
    <MDBContainer fluid class="px-0 custom-topnav-bg">
        <MDBContainer fluid class="px-0 topnav-title-container ps-4 my-2 p-2">
            <div class="breadcrubms-title">
                {{ breadcrumbs }}
            </div>
        </MDBContainer>
    </MDBContainer>
</template>

<script>
import { MDBContainer } from 'mdb-vue-ui-kit';
export default{
    name: 'DashboardBreadcrumbs',
    props: {
        breadcrumbs: String
    },
    components: {
        MDBContainer
    }
}
</script>

<style>
.topnav-title-container {
  background-color: rgba(0, 0, 0, 0.534);
  font-weight: bold;
  color: rgb(209, 209, 209);
  padding: 0.4rem 0 !important;
  font-size: rem !important;
}
.breadcrubms-title{
    margin-left: 2vw;

}
</style>
