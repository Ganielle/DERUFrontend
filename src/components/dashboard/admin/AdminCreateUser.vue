<template>
    <DashboardBreadcrumbs breadcrumbs="USER MANAGEMENT / CREATE USER ACCOUNTS" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">CREATE USER ACCOUNTS</div>
        </div>
        <div class="p-5 text-center bg-light jumbotron rounded">
            <form v-on:submit.prevent="onSubmit">
                <MDBInput
                type="text"
                label="Username"
                id="username"
                v-model="username"
                wrapperClass="mb-4"
                required
                />
                <MDBInput
                type="password"
                label="Password"
                id="password"
                v-model="password"
                wrapperClass="mb-4"
                required
                />

                <MDBRow>
                    <MDBCol>
                        <MDBInput
                        type="text"
                        label="First Name"
                        id="fname"
                        v-model="fname"
                        wrapperClass="mb-4"
                        required
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                        type="text"
                        label="Middle Name"
                        id="mname"
                        v-model="mname"
                        wrapperClass="mb-4"
                        required
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                        type="text"
                        label="Last Name"
                        id="lname"
                        v-model="lname"
                        wrapperClass="mb-4"
                        required
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                type="email"
                label="Email"
                id="email"
                v-model="email"
                wrapperClass="mb-4"
                required
                />
                <div class="d-flex flex-wrap my-3">
                    <div class="flex-grow-1 mx-1 mb-3">
                        <select class="form-select cua-input-select-2" name="role">
                            <option value="">CHOOSE ACCOUNT TYPE</option>
                            <option :value="rhuID">Rural Health Staff</option>
                            <option :value="rescueID">Rescue Team Staff</option>
                        </select>
                    </div>
                </div>
                <MDBBtn color="primary" block class="mb-4"> CREATE ACCOUNT </MDBBtn>
            </form>
        </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
export default{
    name: 'CreateUsers',
    data() {
        return {
            username: "",
            password: "",
            fname: "",
            mname: "",
            lname: "",
            email: "",
            rhuID: process.env.VUE_APP_RHU_ID,
            rescueID: process.env.VUE_APP_RESCUE_TEAM_ID
        }
    },
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        MDBInput,
        MDBBtn,
        MDBRow,
        MDBCol
    }
}
</script>

<style>
.jumbotron{
    margin-top: 4vh;
}
.cua-input-select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: transparent !important;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
  color: rgb(255, 255, 255) !important;
}

</style>
