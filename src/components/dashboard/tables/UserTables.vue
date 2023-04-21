<template>
    <div class="list-table">
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button" :disabled="currentPage <= 0">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">{{ currentPage + 1 }}</div>
                <button class="tc-pager" role="button" :disabled="currentPage >= totalPage - 1">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>
            <MDBTable hover responsive class="align-middle mb-0 bg-white">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark text-center">ACCOUNT NAME</th>
                        <th scope="col" class="table-dark text-center">FIRST NAME</th>
                        <th scope="col" class="table-dark text-center">LAST NAME</th>
                        <th v-if="!approve" scope="col" class="table-dark text-center">STATUS</th>
                        <th v-if="!approve" scope="col"  class="table-dark text-center">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="processing">
                        <td colspan="5" class="text-center">
                            <MDBSpinner />
                        </td>
                    </tr>
                    <tr v-else-if="content.length <= 0">
                        <td colspan="5" class="text-center">No Data Yet!</td>
                    </tr>
                    <tr v-else v-for="dataValues in content" :key="dataValues">
                        <th scope="row" class="text-center">
                            <strong>{{ dataValues.username }}</strong>
                        </th>
                        <td class="text-center">
                            <strong>{{ dataValues.fname }}</strong>
                        </td>
                        <td class="text-center">
                            <strong>{{ dataValues.lname }}</strong>
                        </td>
                        <td v-if="!approve" class="text-center">
                            <strong v-if="approve">APPROVED</strong>
                            <strong v-else>PENDING</strong>
                        </td>
                        <td v-if="!approve">
                            <MDBRow>
                                <MDBCol class="py-1">
                                    <MDBBtn size="sm" class="action-btn" color="success"
                                    @click="() => {
                                        $emit('approve', dataValues)
                                    }"> Approve </MDBBtn>
                                </MDBCol>
                                <MDBCol class="py-1 ">
                                    <MDBBtn size="sm" class="action-btn" color="danger"
                                    @click="() => {
                                        $emit('decline', dataValues)
                                    }"> Decline </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
</template>

<script>
import { MDBContainer, MDBIcon, MDBTable, MDBSpinner, MDBBtn, MDBRow, MDBCol } from 'mdb-vue-ui-kit';
export default{
    name: 'UserTables',
    props: {
        processing: Boolean,
        content: Array,
        currentPage: Number,
        totalPage: Number,
        roleId: String,
        approve: Boolean
    },
    components: {
        MDBContainer,
        MDBIcon,
        MDBTable,
        MDBSpinner,
        MDBBtn,
        MDBRow,
        MDBCol
    },
    methods: {

    }
}
</script>

<style>
</style>
