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
            <button class="tc-pager" role="button">
                <MDBIcon fas icon="angle-double-left" />
            </button>
            <div class="tc-page">1</div>
            <button class="tc-pager" role="button">
                <MDBIcon fas icon="angle-double-right" />
            </button>
        </MDBContainer>

        <MDBTable responsive class="align-middle mb-0 bg-white text-center">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark">VARIANT NAME</th>
                        <th scope="col" class="table-dark">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div v-if="processing.gettingPaginationData">
                            <MDBSpinner size="sm" />
                        </div>
                        <div v-else>
                            <div v-if="variants.varianceList.length <= 0">
                                <td colspan="2" class="text-center">No Data Yet!</td>
                            </div>
                            <div v-else>
                                
                            </div>
                        </div>
                    </tr>
                </tbody>
            </MDBTable>
    </MDBContainer>

    <MDBModal
        v-model="openModal"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> ADD HOSPITAL VARIANT </MDBModalTitle>
        </MDBModalHeader>
        <form>
            <MDBModalBody> 
                <MDBInput type="text" required label="Hospital Variant" 
                formText="This data will be used in signup form for our Health Care Service Users" />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="openModal = false"> Close </MDBBtn>
                <MDBBtn color="primary" type="submit"> Save changes </MDBBtn>
            </MDBModalFooter>
        </form>
    </MDBModal>
</template>

<script>
import { onMounted } from 'vue';
import { MDBContainer, MDBBtn, MDBIcon, MDBTable, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle, MDBInput, MDBSpinner } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { Variance } from '../../../modules/hospitalVariants'
export default{
    name: 'HospitalVariant',
    data() {
        return {
            openModal: false
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
        MDBSpinner
    },
    setup() {
        const { variants, pagination, processing, PaginationListVariance} = Variance()

        onMounted(() => {
            PaginationListVariance()
        })

        return { variants, pagination, processing, PaginationListVariance }
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
</style>
