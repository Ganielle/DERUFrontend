<template>
    <DashboardBreadcrumbs breadcrumbs="HOSPITAL MANAGEMENT / MANAGE" />
    <MDBContainer clas="px-0">
        <div class="list-title-bg">
            <div class="list-title">HOSPITAL LIST</div>
        </div>
        <div class="list-table">
            
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button" 
                    :disabled="pagination.currentPage <= 0">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">{{ pagination.currentPage + 1 }}</div>
                <button class="tc-pager" role="button"
                    :disabled="pagination.currentPage >= pagination.totalPage - 1">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>
            <MDBTable responsive class="align-middle mb-0 bg-white">
                <thead class="bg-dark">
                    <tr class="text-center">
                        <th scope="col" class="table-dark">HOSPITAL NAME</th>
                        <th scope="col" class="table-dark">ACCOUNT OWNER</th>
                        <th scope="col" class="table-dark">REGULAR BED</th>
                        <th scope="col" class="table-dark">COVID BED</th>
                        <th scope="col" class="table-dark">STATUS</th>
                        <th scope="col"  class="table-dark">ACTION</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-if="hospitalProcessing.listingData">
                        <td colspan="6" class="text-center">
                            <MDBSpinner />
                        </td>
                    </tr>
                    <tr v-else-if="hospitalValues.listValues.length <= 0">
                        <td colspan="6" class="text-center">No Data Yet!</td>
                    </tr>
                    <tr v-else v-for="dataVal in hospitalValues.listValues" :key="dataVal">
                        <td scope="row">
                            <strong>{{ dataVal.display_name }}</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVal.userId.fname }} {{ dataVal.userId.lname }}</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVal.regularBeds }}</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVal.covidBeds }}</strong>
                        </td>
                        <td scope="row">
                            <strong v-if="dataVal.approve">APPROVED</strong>
                            <strong v-else>PENDING</strong>
                        </td>
                        <td scope="row">
                            <MDBRow>
                                <MDBCol class="py-2">
                                    <MDBBtn color="primary" class="fill-btn" 
                                    @click="() =>{
                                        selectedHospital = dataVal
                                        viewModal = true
                                    }">VIEW</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
    </MDBContainer>

    <!--VIEW-->
    <MDBModal
    v-model="viewModal"
    scrollable
    centered
    class="modal-lg"
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> VIEW HOSPITAL </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody> 
            <div>
                <center>
                    <strong>USER DETAILS</strong>
                </center>
                <MDBInput
                    type="text"
                    label="Username"
                    v-model="selectedHospital.userId.username"
                    wrapperClass="mb-4"
                    readonly
                />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="First Name"
                            v-model="selectedHospital.userId.fname"
                            wrapperClass="mb-4"
                            readonly
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name"
                            v-model="selectedHospital.userId.mname"
                            wrapperClass="mb-4"
                            active
                            readonly
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name"
                            v-model="selectedHospital.userId.lname"
                            wrapperClass="mb-4"
                            active
                            readonly
                        />
                    </MDBCol>
                </MDBRow>
                <strong v-if="selectedHospital.userId.approve" 
                style="text-align:left !important">USER STATUS: APPROVE</strong>

                <hr>

                <center>
                    <strong>HOSPITAL DETAILS</strong>
                </center>

                <MDBInput
                    type="text"
                    label="Hospital Name"
                    v-model="selectedHospital.display_name"
                    wrapperClass="mb-4"
                    readonly
                />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Landline"
                            v-model="selectedHospital.landline"
                            wrapperClass="mb-4"
                            readonly
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Cellphone"
                            v-model="selectedHospital.cellphone"
                            wrapperClass="mb-4"
                            readonly
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="text"
                    label="Address"
                    v-model="selectedHospital.address"
                    wrapperClass="mb-4"
                    readonly
                />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Regular Beds"
                            v-model="selectedHospital.regularBeds"
                            wrapperClass="mb-4"
                            readonly
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Covid Beds"
                            v-model="selectedHospital.covidBeds"
                            wrapperClass="mb-4"
                            readonly
                        />
                    </MDBCol>
                </MDBRow>
                <strong>Hospital Variants:</strong>
                <br>
                <strong v-for="(variantsVal, index) in selectedHospital.variance" :key="variantsVal">
                    {{variantsVal.display_name}}
                    <strong v-if="index < selectedHospital.variance.length - 1">, </strong>
                </strong>
            </div>
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="primary" @click="() => {
                viewModal = false
                selectedHospital = []
            }" > Back </MDBBtn>
        </MDBModalFooter>
    </MDBModal>

    <!--APPROVE-->
    <MDBModal
    v-model="approveModal"
    scrollable
    centered
    class="modal-lg"
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> APPROVE HOSPITAL </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody class="text-center"> 
            <strong>Are you sure you want to approve this hospital?</strong>
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" @click="() => {
                approveModal = false
                selectedHospital = []
            }" > Cancel </MDBBtn>
            <div v-if="hospitalProcessing.approve">
                <MDBSpinner />
            </div>
            <div v-else>
                <MDBBtn color="primary" type="submit" 
                @click="Approve"> Yes </MDBBtn>
            </div>
        </MDBModalFooter>
    </MDBModal>
</template>

<script>
import { MDBContainer, MDBTable, MDBIcon, MDBSpinner, MDBRow, MDBCol, MDBBtn,
    MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalTitle, MDBInput } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '@/components/dashboard/DashboardBreadcrumbs.vue'
import { Hospitals } from '../../../modules/hospital'
import { onMounted } from 'vue';
import {useToast} from 'vue-toast-notification';
export default{
    name: 'ResponseTeamHospital',
    data() {
        return{
            selectedHospital: [],
            viewModal: false,
            toast: useToast(),
            approveModal: false
        }
    },
    components: {
        DashboardBreadcrumbs,
        MDBContainer,
        MDBBtn,
        MDBTable,
        MDBIcon,
        MDBSpinner,
        MDBRow,
        MDBCol,
        MDBModal,
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter,
        MDBModalTitle,
        MDBInput
    },
    methods:{
        async Approve(){
            await this.ApproveHospital(this.selectedHospital._id);

            if (this.response.approveResponse === "success"){
                this.toast.open({
                    message: "Hospital Approve Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.hospitalProcessing.approve = false
                this.response.approveResponse = ""
                this.approveModal = false
                this.ListHospitals()
            }
            else if (this.response.approveResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again later.",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your connection! Please try again later.",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        }
    },
    setup(){
        const { hospitalValues, hospitalProcessing, pagination, response, ApproveHospital, ListHospitals } = Hospitals()

        onMounted(() => {
            ListHospitals()
        })

        return {
            hospitalValues, hospitalProcessing, pagination, response, ListHospitals,
            ApproveHospital
        }
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
.fill-btn{
    width: 100%;
}
</style>
