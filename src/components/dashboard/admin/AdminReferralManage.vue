<template>
    <DashboardBreadcrumbs breadcrumbs="REFERRAL MANAGEMENT" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">AVAILABLE HEALTHCARE UNIT HOSPITALS</div>
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
            <MDBTable responsive class="align-middle mb-0 bg-white text-center">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark">HOSPITAL NAME</th>
                        <th scope="col" class="table-dark">CONTACT NUMBER</th>
                        <th scope="col" class="table-dark">ADDRESS</th>
                        <th scope="col" class="table-dark">REGULAR BEDS</th>
                        <th scope="col" class="table-dark">COVID BEDS</th>
                        <th scope="col"  class="table-dark">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="hospitalProcessing.listingData">
                        <td colspan="6" class="text-center">
                            <MDBSpinner />
                        </td>
                    </tr>
                    <tr v-else-if="hospitalValues.listValues.length <= 0">
                        <td colspan="5" class="text-center">No Data Yet!</td>
                    </tr>
                    <tr v-else v-for="dataVals in hospitalValues.listValues" :key="dataVals">
                        <td scope="row">
                            <strong>{{ dataVals.display_name }}</strong>
                        </td>
                        <td scope="row">
                            <strong>Landline: {{ dataVals.landline }}</strong> / <strong>
                                Cellphone: {{ dataVals.cellphone }}
                            </strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVals.address }}</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVals.regularBeds }}</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVals.covidBeds }}</strong>
                        </td>
                        <td scope="row">
                            <MDBBtn color="success" class="py-2 fill-btn"
                            @click="() => {
                                selectedHospital = dataVals
                                openReferral = true
                            }">SEND REFERRAL</MDBBtn>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
    </MDBContainer>

    <!--VIEW-->
    <MDBModal
    v-model="openReferral"
    scrollable
    centered
    class="modal-lg"
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> FILL UP REFERRAL FORM </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody> 
            <MDBInput
                type="text"
                label="ID Caller"
                v-model="selectedHospital.display_name"
                wrapperClass="mb-4"
            />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Dispatch Time"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="En route"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the scene"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Left the scene"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the Facility"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="text"
                    label="Site of response"
                    v-model="selectedHospital.display_name"
                    wrapperClass="mb-4"
                />
                <hr>
                <center>
                    <strong>PATIENT INFORMATION</strong>
                </center>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="First Name"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Last Name"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="date"
                            label="Date of Birth"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Age"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="number"
                    label="Contact Number"
                    v-model="selectedHospital.display_name"
                    wrapperClass="mb-4"
                />
                <hr>
                <center>
                    <strong>NEXT OF KIN INFORMATION</strong>
                </center>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Next of Kin Name"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Contact Number"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="selectedHospital.display_name"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <hr>
                <center>
                    <strong>PRIMARY ASSESSMENT</strong>
                </center>
                <br>
                
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Lost of consciousness prior arrival"
                            id="form1LoginCheck"
                            v-model="form1LoginCheck"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Considered manual head stabilisation"
                            id="form2LoginCheck"
                            v-model="form1LoginCheck"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <MDBInput
                    type="text"
                    label="CC Chief Complaint"
                    v-model="selectedHospital.display_name"
                    wrapperClass="mb-4"
                />
                <hr>
                <center>
                    <strong>GCS (Glasgow Coma Scale)</strong>
                </center>
                <MDBRow>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Eye Opening:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="4">4 (Oriented)</option>
                                    <option value="3">3 (Voice)</option>
                                    <option value="2">2 (Pain)</option>
                                    <option value="1">1 (No Response)</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Verbal Response:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="5">5 (Oriented)</option>
                                    <option value="4">4 (Confused)</option>
                                    <option value="3">3 (Inappropriate words)</option>
                                    <option value="2">2 (Incomprihensible sounds)</option>
                                    <option value="1">1 (No Response)</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Motor Response:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="6">6 (Obey commands)</option>
                                    <option value="5">5 (Localized pain)</option>
                                    <option value="4">4 (Withdraw to pain)</option>
                                    <option value="3">3 (Abnormal flexion)</option>
                                    <option value="2">2 (Abnormal Extension)</option>
                                    <option value="1">1 (No Response)</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Airway:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="3">Clear</option>
                                    <option value="2">Partial</option>
                                    <option value="1">Obstructed</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Circulation of pulse:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="5">Normal</option>
                                    <option value="4">Rapid</option>
                                    <option value="3">Slow</option>
                                    <option value="2">Weak</option>
                                    <option value="1">Absent</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Breathing:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="6">Normal</option>
                                    <option value="5">Fast</option>
                                    <option value="4">Slow</option>
                                    <option value="3">Absent</option>
                                    <option value="2">2 (Abnormal Extension)</option>
                                    <option value="1">1 (No Response)</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Skin:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="9">Normal</option>
                                    <option value="8">Flused</option>
                                    <option value="7">Pale</option>
                                    <option value="6">Cyanosed</option>
                                    <option value="5">Juandice</option>
                                    <option value="4">Cold</option>
                                    <option value="3">Clammy</option>
                                    <option value="2">Dry</option>
                                    <option value="1">Warm</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <hr>
                <center>
                    <strong>PATIENT HISTORY TAKING (IF APPLICABLE ONLY)</strong>
                </center>
                <br>
                <MDBTextarea label="Onset" rows="4" 
                    formText="When the pain started?"/>
                <MDBRow>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Palliation/Provocation:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="1">Palliation</option>
                                    <option value="2">Provocation</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Quality:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="type">
                                    <option value=""></option>
                                    <option value="5">Sharp</option>
                                    <option value="4">Dull</option>
                                    <option value="3">Crushing</option>
                                    <option value="2">Tearing</option>
                                    <option value="1">Waves</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBTextarea label="Radiation" rows="4" 
                    formText="Does it raidate to other areas?"/>
                <div class="d-flex flex-wrap my-3">
                    <div class="flex-grow-1 mx-1 mb-3">
                        <p style="margin-bottom: 0;">Severity:</p>
                        <select class="form-select cua-input-select-2" name="role" v-model="type">
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <MDBTextarea label="Time" rows="4" 
                formText="Is it pain the same as it started or is it increased or decreased?"/>
                <br>
                <MDBTextarea label="Signs and Symptoms" rows="3" wrapperClass="mb-4"/>
                <MDBTextarea label="Age/Athlethecism/Allergies" rows="3" wrapperClass="mb-4" />
                <MDBTextarea label="Medication" rows="3" wrapperClass="mb-4"/>
                <MDBTextarea label="Past History" rows="3" wrapperClass="mb-4"/>
                <MDBTextarea label="Last oral intake" rows="3" wrapperClass="mb-4"/>
                <MDBTextarea label="Events leading to the incident" rows="3" wrapperClass="mb-4"/>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="primary" @click="() => {
                    openReferral = false
                    selectedHospital = []
                }" > Back </MDBBtn>
            </MDBModalFooter>
    </MDBModal>
</template>

<script>
import { MDBContainer, MDBIcon, MDBTable, MDBSpinner, MDBBtn,
    MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalTitle, MDBInput,
    MDBRow, MDBCol, MDBCheckbox, MDBTextarea } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { Hospitals } from '../../../modules/hospital';
import { onMounted } from 'vue';
export default{
    name: 'ReferralManage',
    data(){
        return{
            openReferral: false,
            selectedHospital: []
        }
    },
    components: {
        DashboardBreadcrumbs,
        MDBContainer,
        MDBIcon,
        MDBTable,
        MDBSpinner,
        MDBBtn,
        MDBModal,
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter,
        MDBModalTitle,
        MDBInput,
        MDBRow,
        MDBCol,
        MDBCheckbox,
        MDBTextarea
    },
    setup(){
        const { hospitalValues, response, pagination, hospitalProcessing, ListApproveHospitals } = Hospitals()

        onMounted(() => {
            ListApproveHospitals()
        })

        return { hospitalValues, response, pagination, hospitalProcessing, ListApproveHospitals }
    }
}
</script>

<style>
.fill-btn{
    width: 100%;
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
