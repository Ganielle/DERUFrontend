<template>
    <DashboardBreadcrumbs breadcrumbs="HOSPITAL MANAGEMENT / VARIANTS" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">VARIANT LIST</div>
        </div>
        
        <div class="add-variant-btn">
            <MDBBtn @click="openModal = true" color="primary" class="mb-4">
                ADD HOSPITAL VARIANTS
            </MDBBtn>
        </div>

        <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
            <button class="tc-pager" role="button" :disabled="pagination.currentPage <= 0"
                @click="() => { 
                    pagination.currentPage -= 1
                    PaginationListVariance()
                }">
                <MDBIcon fas icon="angle-double-left" />
            </button>
            <div class="tc-page">{{ pagination.currentPage + 1 }}</div>
            <button class="tc-pager" role="button" :disabled="CheckNextBtn" 
                @click="() => {
                    pagination.currentPage += 1
                    PaginationListVariance()
                }">
                <MDBIcon fas icon="angle-double-right" />
            </button>
        </MDBContainer>

        <MDBTable hover responsive class="align-middle mb-0 bg-white text-center">
            <thead class="bg-dark">
                <tr>
                    <th scope="col" class="table-dark">VARIANT NAME</th>
                    <th scope="col" class="table-dark">ACTION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="processing.gettingPaginationData">
                    <td colspan="2" class="text-center">
                        <MDBSpinner />
                    </td>
                </tr>
                <tr v-else-if="variants.varianceList.length <= 0">
                    <td colspan="2" class="text-center">No Data Yet!</td>
                </tr>
                <tr v-else v-for="dataValues in variants.varianceList" :key="dataValues">
                    <th scope="row" class="text-center">
                        <strong>{{ dataValues.display_name }}</strong>
                    </th>
                    <td class="text-center">
                        <MDBRow>
                            <MDBCol class="py-1">
                                <MDBBtn size="sm" class="action-btn" color="success"
                                @click="() => {
                                    editVariant.id = dataValues._id
                                    openEdit = true
                                }"> Edit </MDBBtn>
                            </MDBCol>
                            <MDBCol class="py-1 ">
                                <MDBBtn size="sm" class="action-btn" color="danger"
                                @click="() => {
                                    editVariant.id = dataValues._id
                                    openDelete = true
                                }"> Delete </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </td>
                </tr>
            </tbody>
        </MDBTable>
    </MDBContainer>

    <!--ADD-->
    <MDBModal
        v-model="openModal"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> ADD HOSPITAL VARIANT </MDBModalTitle>
        </MDBModalHeader>
        <form  v-on:submit.prevent="onSubmit">
            <MDBModalBody> 
                <MDBInput type="text" required label="Hospital Variant" v-model="saveVariant.display_name"
                formText="This data will be used in signup form for our Health Care Service Users" />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="openModal = false"> Close </MDBBtn>
                <div v-if="processing.saveData">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="primary" type="submit" 
                        @click="SaveEntry"> Save changes </MDBBtn>
                </div>
            </MDBModalFooter>
        </form>
    </MDBModal>

    <!--EDIT-->
    <MDBModal
        v-model="openEdit"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> EDIT HOSPITAL VARIANT </MDBModalTitle>
        </MDBModalHeader>
        <form  v-on:submit.prevent="onSubmit">
            <MDBModalBody> 
                <MDBInput type="text" required label="Hospital Variant" 
                formText="This data will be used in signup form for our Health Care Service Users" 
                v-model="editVariant.editName" />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="openEdit = false"> Close </MDBBtn>
                <div v-if="processing.updatingData">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="primary" type="submit" 
                    @click="UpdateVariantEntry"> Save changes </MDBBtn>
                </div>
            </MDBModalFooter>
        </form>
    </MDBModal>

    <!--DELETE-->
    <MDBModal
        v-model="openDelete"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> DELETE HOSPITAL VARIANT </MDBModalTitle>
        </MDBModalHeader>
        <form  v-on:submit.prevent="onSubmit">
            <MDBModalBody> 
                <strong>Are you sure you want to delete this variant?</strong>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="openDelete = false"> Close </MDBBtn>
                <div v-if="processing.deleteData">
                    <MDBSpinner />
                </div>
                <div v-else>
                    <MDBBtn color="primary" type="submit" 
                    @click="DeleteEntry"> Save changes </MDBBtn>
                </div>
            </MDBModalFooter>
        </form>
    </MDBModal>
</template>

<script>
import { onMounted } from 'vue';
import { MDBContainer, MDBBtn, MDBIcon, MDBTable, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle, MDBInput, MDBSpinner,
    MDBRow, MDBCol } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { Variance } from '../../../modules/hospitalVariants'
import {useToast} from 'vue-toast-notification';
export default{
    name: 'HospitalVariant',
    data() {
        return {
            openModal: false,
            openEdit: false,
            openDelete: false,
            toast: useToast(),
        }
    },
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        MDBBtn,
        MDBIcon,
        MDBTable,
        MDBModal,
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter,
        MDBModalTitle,
        MDBInput,
        MDBSpinner,
        MDBCol,
        MDBRow
    },
    methods: {
        async UpdateVariantEntry(){
            await this.UpdateVariant()
            if (this.response.editResponse === "success"){
                this.toast.open({
                    message: "Edit Successful",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.pagination.currentPage = 0
                this.PaginationListVariance()
                this.openEdit = false
            }
            else if (this.response.editResponse === "bad-request"){
                this.toast.open({
                    message: "Duplicate entry, please use something else!",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your network! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        },
        async SaveEntry(){
            await this.AddVariant()
            if (this.response.saveResponse === "success"){
                this.toast.open({
                    message: "Edit Successful",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.pagination.currentPage = 0
                this.PaginationListVariance()
                this.openModal = false
            }
            else if (this.response.saveResponse === "bad-request"){
                this.toast.open({
                    message: "Duplicate entry, please use something else!",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your network! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        },
        async DeleteEntry(){
            await this.DeleteVariant()

            if (this.response.deleteResponse === "success"){
                this.toast.open({
                    message: "Delete Successful",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.editVariant.id = ""
                this.pagination.currentPage = 0
                this.PaginationListVariance()
                this.openDelete = false
            }
            else if (this.response.saveResponse === "bad-request"){
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
                    message: "There's a problem with your network! Please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
        }
    },
    computed: {
        CheckNextBtn(){
            return this.pagination.currentPage >= this.pagination.totalPages - 1
        }
    },
    setup() {
        const { variants, pagination, processing, editVariant,
            response, saveVariant, UpdateVariant, PaginationListVariance,
            AddVariant, DeleteVariant} = Variance()

        onMounted(() => {
            PaginationListVariance()
        })

        return { variants, pagination, processing, editVariant, response, saveVariant,
            UpdateVariant, PaginationListVariance, AddVariant, DeleteVariant }
    }
}
</script>

<style>
.add-variant-btn{
    float: right;
    margin-right: 2vw;
    margin-top: 2vh;
}
.list-title-bg {
  background-color: rgb(2, 107, 206);
  font-weight: bold;
  color: rgb(209, 209, 209);
  font-size: 2rem;
  /* margin-top: 9vh; */
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
.action-btn{
    width: 100%;
}
</style>
