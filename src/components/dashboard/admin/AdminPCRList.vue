<template>
    <DashboardBreadcrumbs breadcrumbs="PCR REPORT MANAGEMENT" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">LIST OF REPORTS</div>
        </div>
        <div class="list-table">
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button"
                    :disabled="pcrPagination.currentPage <= 0" 
                    @click="() => {
                        pcrPagination.currentPage -= 1
                        GetPCR()
                    }">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">{{ pcrPagination.currentPage + 1 }}</div>
                <button class="tc-pager" role="button"
                    :disabled="pcrPagination.currentPage >= pcrPagination.totalPages - 1"
                    @click="() => {
                        pcrPagination.currentPage += 1
                        GetPCR()
                    }">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>
            <MDBTable responsive class="align-middle mb-0 bg-white text-center">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark">REPORT ID</th>
                        <th scope="col" class="table-dark">HOSPITAL</th>
                        <th scope="col" class="table-dark">PATIENT</th>
                        <th scope="col" class="table-dark">STATUS</th>
                        <th scope="col"  class="table-dark">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pcrProcessing.gettingData">
                        <td colspan="5" class="text-center"><MDBSpinner /></td>
                    </tr>
                    <tr v-else-if="pcrValues.pcrHistory.length <= 0">
                        <td colspan="5" class="text-center">No Data Yet!</td>
                    </tr>
                    <tr v-else v-for="dataVal in pcrValues.pcrHistory" :key="dataVal" >
                        <td scope="row">
                            <strong>{{ dataVal._id }}</strong>
                        </td>
                        <td scope="row">
                            <strong v-if="dataVal.hospital?.display_name">{{ dataVal.hospital?.display_name }}</strong>
                            <strong v-else>REFUSED TO TRANSPORT BY PATIENT</strong>
                        </td>
                        <td scope="row">
                            <strong>{{ dataVal.fname }} {{ dataVal.lname }}</strong>
                        </td>
                        <td scope="row">
                            <strong v-if="dataVal.atTheFacility !== ''">
                                Arrived at the Facility
                            </strong>
                            <strong v-else-if="dataVal.leftTheScene !== ''">
                                On the way to the facility
                            </strong>
                            <strong v-else-if="dataVal.atTheScene !== ''">
                                Arrived at the scene
                            </strong>
                            <strong v-else>
                                On the way to the scene
                            </strong>
                        </td>
                        <td scope="row">
                            <MDBRow>
                                <MDBCol class="py-2 ">
                                    <MDBBtn color="primary" class="fill-btn"
                                        @click="() => {
                                            selectedPCR = dataVal
                                            modalTitle = 'VIEW PCR'
                                            isView = true
                                            openPCR = true
                                        }">View</MDBBtn>
                                </MDBCol>
                                <MDBCol class="py-2">
                                    <MDBBtn color="success" class="fill-btn"
                                        @click="() => {
                                            selectedPCR = dataVal
                                            modalTitle = 'EDIT PCR'
                                            isView = false
                                            openPCR = true
                                        }">Edit</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
    </MDBContainer>

    <MDBModal
        v-model="openPCR"
        scrollable
        centered
        class="modal-lg"
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> {{modalTitle}} </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody> 
            <MDBInput
                type="text"
                label="ID Caller"
                v-model="selectedPCR.idCaller"
                wrapperClass="mb-4"
                :readonly="isView"
            />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Dispatch Time"
                            v-model="selectedPCR.dispatchTime"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="En route"
                            v-model="selectedPCR.enRoute"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the scene"
                            v-model="selectedPCR.atTheScene"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Left the scene"
                            v-model="selectedPCR.leftTheScene"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the Facility"
                            v-model="selectedPCR.atTheFacility"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="text"
                    label="Site of response"
                    v-model="selectedPCR.siteOfResponse"
                    wrapperClass="mb-4"
                    :readonly="isView"
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
                            v-model="selectedPCR.fname"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name"
                            v-model="selectedPCR.mname"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Last Name"
                            v-model="selectedPCR.lname"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="selectedPCR.temperature"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="date"
                            label="Date of Birth"
                            v-model="selectedPCR.dob"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Age"
                            v-model="selectedPCR.age"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.sex" 
                                :disabled="isView">
                                    <option value="">Sex</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="number"
                    label="Contact Number"
                    v-model="selectedPCR.contactNumber"
                    wrapperClass="mb-4"
                    :readonly="isView"
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
                            v-model="selectedPCR.nextOfKinName"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Contact Number"
                            v-model="selectedPCR.contactNumberKin"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="selectedPCR.temperatureKin"
                            wrapperClass="mb-4"
                            :readonly="isView"
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
                            v-model="selectedPCR.lostOfConsciousness"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Considered manual head stabilisation"
                            v-model="selectedPCR.consideredManual"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <MDBInput
                    type="text"
                    label="CC Chief Complaint"
                    v-model="selectedPCR.ccChiefComplaint"
                    wrapperClass="mb-4"
                            :readonly="isView"
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.eyeOpening"
                                    :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.verbalResponse"
                                    :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.motorResponse"
                            :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.airway"
                            :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.circulationOfPulse"
                            :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.breathing"
                            :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.skin"
                            :disabled="isView">
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
                    formText="When the pain started?" v-model="selectedPCR.onset"
                            :disabled="isView"/>
                <MDBRow>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Palliation/Provocation:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.palliationProvocation"
                            :disabled="isView">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.quality"
                            :disabled="isView">
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
                    formText="Does it raidate to other areas?" v-model="selectedPCR.radiation"
                            :readonly="isView"/>
                <div class="d-flex flex-wrap my-3">
                    <div class="flex-grow-1 mx-1 mb-3">
                        <p style="margin-bottom: 0;">Severity:</p>
                        <select class="form-select cua-input-select-2" name="role" v-model="selectedPCR.severity"
                            :disabled="isView">
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
                formText="Is it pain the same as it started or is it increased or decreased?" v-model="selectedPCR.time"
                            :readonly="isView"/>
                <br>
                <MDBTextarea label="Signs and Symptoms" rows="3" wrapperClass="mb-4" v-model="selectedPCR.signSymptoms"
                            :readonly="isView"/>
                <MDBTextarea label="Age/Athlethecism/Allergies" rows="3" wrapperClass="mb-4"
                v-model="selectedPCR.ageAthletecismAllergies" 
                            :readonly="isView"/>
                <MDBTextarea label="Medication" rows="3" wrapperClass="mb-4" 
                v-model="selectedPCR.medication"
                            :readonly="isView"/>
                <MDBTextarea label="Past History" rows="3" wrapperClass="mb-4"
                v-model="selectedPCR.pastHistory"
                            :readonly="isView"/>
                <MDBTextarea label="Last oral intake" rows="3" wrapperClass="mb-4"
                v-model="selectedPCR.lastOralIntake"
                            :readonly="isView"/>
                <MDBTextarea label="Events leading to the incident" rows="3" wrapperClass="mb-4"
                v-model="selectedPCR.eventsLeadingToAccident"
                            :readonly="isView"/>
                <hr>
                <center>
                    <strong>SECONDARY ASSESSMENT (IF APPLICABLE)</strong>
                </center>
                <br>
                <strong>DCAP-BTLS Assessment:</strong>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Deformity"
                            v-model="selectedPCR.deformity"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Contusion"
                            v-model="selectedPCR.contusion"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Bruise"
                            v-model="selectedPCR.bruise"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Laceration"
                            v-model="selectedPCR.laceration"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Abrasion"
                            v-model="selectedPCR.abrasion"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Puncture"
                            v-model="selectedPCR.puncture"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Tenderness"
                            v-model="selectedPCR.tenderness"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Swelling"
                            v-model="selectedPCR.swelling"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Presence of Alcohol (ETOH) and substance abuse (Sub. Ab.):</strong>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="ETOH"
                            v-model="selectedPCR.etoh"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Sub. Ab."
                            v-model="selectedPCR.subab"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Burn Injury:</strong>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Burn %"
                            v-model="selectedPCR.burn"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Superf."
                            v-model="selectedPCR.superf"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Partial"
                            v-model="selectedPCR.partial"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Full"
                            v-model="selectedPCR.full"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Pregnancy Details:</strong>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Gravida"
                            v-model="selectedPCR.gravida"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Para EDD"
                            v-model="selectedPCR.paraedd"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="True Labor"
                            v-model="selectedPCR.truelabor"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="< 60 sec"
                            v-model="selectedPCR.sec60"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="< 2 min"
                            v-model="selectedPCR.min2"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Lungs Sound:</strong>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Crackles"
                            v-model="selectedPCR.crackles"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Wheezing"
                            v-model="selectedPCR.wheezing"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Stridor"
                            v-model="selectedPCR.stridor"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rhonchi"
                            v-model="selectedPCR.rhonchi"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rales"
                            v-model="selectedPCR.rales"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="CTA"
                            v-model="selectedPCR.cta"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Vital Signs</strong>
                <br>
                
                <div v-for="(val, index) in selectedPCR.vitalSigns" :key="index">
                    <!--FIRST PART-->
                    <center>
                        <strong>ENTRY #{{ index + 1 }}</strong>
                    </center>
                    <br>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Time"
                                v-model="val.time"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Blood Pressure"
                                v-model="val.bloodPressure"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Pulse Rate"
                                v-model="val.pulseRate"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                    </MDBRow>

                    <!--SECOND PART-->
                    <MDBRow>
                        <MDBCol>
                            <br>
                            <MDBInput
                                type="text"
                                label="SP o2"
                                v-model="val.spo2"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <strong>Respiratory Quality</strong>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                        type="text"
                                        label="Entry #1"
                                        v-model="val.respiratoryQualityOne"
                                        wrapperClass="mb-4"
                            :readonly="isView"
                                    />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput
                                        type="text"
                                        label="Entry #2"
                                        v-model="val.respiratoryQualityTwo"
                                        wrapperClass="mb-4"
                            :readonly="isView"
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol>
                            <br>
                            <MDBInput
                                type="text"
                                label="Glucose"
                                v-model="val.glucose"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                    </MDBRow>

                    <!--THIRD PART-->
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="CRT < 2 sec."
                                v-model="val.crt2sec"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Left Pupil"
                                v-model="val.leftPupil"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Right Pupil"
                                v-model="val.rightPupil"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                    </MDBRow>
                </div>
                <hr>
                <strong>Management</strong>
                <br>
                <center>
                    <strong>AIRWAY</strong>
                </center>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Open Airway"
                            v-model="selectedPCR.openAirway"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Man. Clear."
                            v-model="selectedPCR.manClear"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Suction"
                            v-model="selectedPCR.suction"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="o2 b L L L"
                            v-model="selectedPCR.o2blll"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="OPA"
                            v-model="selectedPCR.opa"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="NC"
                            v-model="selectedPCR.nc"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Nebul"
                            v-model="selectedPCR.nebul"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="BVM"
                            v-model="selectedPCR.bvm"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <center>
                    <strong>CIRCULATION</strong>
                </center>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="CPR"
                            v-model="selectedPCR.cpr"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Start @"
                            v-model="selectedPCR.circulationStart"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Cycles"
                            v-model="selectedPCR.circulationCycle"
                            wrapperClass="mb-4"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <center>
                    <strong>IMMOBILISATION</strong>
                </center>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="C-Spine"
                            v-model="selectedPCR.cspine"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Splint"
                            v-model="selectedPCR.splint"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <center>
                    <strong>WOUND / BURN CARE</strong>
                </center>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Cleaning"
                            v-model="selectedPCR.cleaning"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Bandaging"
                            v-model="selectedPCR.bandaging"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Occlusive Dressing"
                            v-model="selectedPCR.occlusiveDressing"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>OTHERS</strong>
                <MDBCheckbox
                    label="Positioning Cold/Warm"
                    v-model="selectedPCR.positioningColdWarm"
                    wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                />
                <div v-if="selectedPCR.withReferral">
                    <hr>
                    <center>
                        <strong>RECEIVING FACILITY (LOOKING FOR HOSPITAL REFERRAL/CALLING)</strong>
                        <br><strong>PATIENT CHOOSE TO BE TRANSPORTED TO THE HOSPITAL</strong>
                        <br><strong>GO TO 4.1</strong>
                    </center>
                    <br>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Receving Facility"
                                v-model="selectedPCR.receivingFacility"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Receving Provider"
                                v-model="selectedPCR.receivingProvider"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Position"
                                v-model="selectedPCR.position"
                                wrapperClass="mb-4"
                            :readonly="isView"
                            />
                        </MDBCol>
                    </MDBRow>
                    <strong>SIGNATURE</strong>
                    <MDBTextarea label="Additional Information" rows="3" wrapperClass="mb-4"
                    v-model="selectedPCR.signatureAdditionalInfo"
                            :readonly="isView"/>
                    <MDBCheckbox
                        label="By Checking this, You're agreeing to everything to the statement above"
                        v-model="selectedPCR.agreementPatient"
                        wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                    />
                    <br>
                    <MDBInput label="Time" type="text" v-model="selectedPCR.signatureTime"
                            :readonly="isView"/>
                </div>
                <div v-else>
                    <hr>
                    <center>
                        <strong>REFUSAL OF TREATMENT AND/OR TRANSPORT</strong>
                    </center>
                    <br>
                    <MDBRow>
                        <MDBCol>
                            <MDBCheckbox
                                label="Evalutaion"
                                v-model="selectedPCR.evaluation"
                                wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox
                                label="Treatment"
                                v-model="selectedPCR.treatment"
                                wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox
                                label="Transport"
                                v-model="selectedPCR.transport"
                                wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Patient's printed name" type="text" v-model="selectedPCR.refusalName"
                            :readonly="isView"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Age" type="number" v-model="selectedPCR.refusalAge"
                            :readonly="isView"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="DoB" type="date" v-model="selectedPCR.refusalDoB"
                            :readonly="isView"/>
                        </MDBCol>
                    </MDBRow>
                    <br>
                    <MDBTextarea label="Patient's address" row="4" v-model="selectedPCR.refusaladdress"
                            :readonly="isView" />
                    <br>
                    <MDBRow>
                        <MDBCol>
                            <MDBCheckbox
                                label="By checking this, the patient is agreeing with the form above"
                                v-model="selectedPCR.refusalAgree"
                                wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Witness Relationship (If applicable)" type="text"
                                v-model="selectedPCR.refusalRelationship" 
                            :readonly="isView"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox 
                            label="By checking this, the witness is agreeing with that he/she witness the said events"
                            type="text" v-model="selectedPCR.refusalWitnessAgree"
                            :readonly="isView"/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Witness Printed Name" type="text"
                                v-model="selectedPCR.refusalWitnessName" 
                            :readonly="isView"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Date and Time" type="date" 
                                v-model="selectedPCR.refusalDateTime"
                            :readonly="isView" />
                        </MDBCol>
                    </MDBRow>
                </div>
                <hr>
                <center>
                    <strong>RECOGNITION OF DEATH (OPTIONAL)</strong>
                </center>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Decomposition"
                            v-model="selectedPCR.decomposition"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rigor Mortis"
                            v-model="selectedPCR.rigormortis"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Incineration"
                            v-model="selectedPCR.incineration"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Decapitation"
                            v-model="selectedPCR.decapitation"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Pooling"
                            v-model="selectedPCR.pooling"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Other injuries totally incompatible with life"
                            v-model="selectedPCR.otherInjuries"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBTextarea label="PLEASE SPECIFIY NATURE OF INJURIES" row="4" 
                    v-model="selectedPCR.natureOfInjuries"
                            :readonly="isView"/>
                <hr>
                <center>
                    <strong>PROVIDER</strong>
                </center>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="EMR" type="text" v-model="selectedPCR.emr"
                            :readonly="isView"/>
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="By Checking this, The provider is agreeing in EMR"
                            v-model="selectedPCR.emragree"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Odometer Differencial" type="text" v-model="selectedPCR.odometerDifferencial"
                            :readonly="isView" />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="EMR(TL)" type="text" v-model="selectedPCR.emrtl" 
                            :readonly="isView"/>
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="By Checking this, The provider is agreeing in EMR(TL)"
                            v-model="selectedPCR.emrtlAgree"
                            wrapperClass="mb-3 mb-md-0"
                            :readonly="isView"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput label="Time Endorsement" type="text" v-model="selectedPCR.timeEndorsement" 
                            :readonly="isView"/>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="() => {
                    openPCR = false
                    selectedPCR = []
                    isView = false
                }" > Back </MDBBtn>
                <MDBBtn v-if="!isView" color="success" @click="() => {
                    openPCR = false
                    selectedPCR = []
                    isView = false
                }" > Submit </MDBBtn>
            </MDBModalFooter>
    </MDBModal>
</template>

<script>
import { MDBContainer, MDBIcon, MDBTable, MDBSpinner, MDBBtn,
    MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalTitle, MDBInput,
    MDBRow, MDBCol, MDBCheckbox, MDBTextarea } from 'mdb-vue-ui-kit';
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { onMounted } from 'vue';
import { PCR } from '../../../modules/pcr'
import {useToast} from 'vue-toast-notification';
export default{
    name: 'PCRReport',
    data() {
        return{
            toast: useToast(),
            openPCR: false,
            selectedPCR: [],
            modalTitle: "",
            isView: false
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
        const { pcrProcessing, pcrResponse, pcrValues,pcrPagination, GetPCR } = PCR()

        onMounted(() => {
            GetPCR()
        })

        return {
            pcrProcessing, pcrResponse, pcrValues,pcrPagination, GetPCR
        }
    }
}
</script>

<style>
.fill-btn{
    width: 100%
}
</style>
