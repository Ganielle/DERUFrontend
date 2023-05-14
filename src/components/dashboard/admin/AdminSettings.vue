<template>
    <DashboardBreadcrumbs breadcrumbs="SETTINGS" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">USER SETTINGS</div>
        </div>
    </MDBContainer>
</template>

<script>
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
export default{
    name: "AdminSettings",
    components: {
        DashboardBreadcrumbs
    }
}
</script>