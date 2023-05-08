<template>
    <DashboardBreadcrumbs breadcrumbs="REFERRAL MANAGEMENT" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">AVAILABLE HEALTHCARE UNIT HOSPITALS</div>
        </div>
        <br>
        <MDBBtn color="warning" style="float: right; margin-right: 2vw;" 
            @click="() => {
                modalTitle = 'PATIENT REFUSAL REPORT'
                formData.withReferral = false
                openReferral = true
            }">Patient Refusal Report</MDBBtn>
        <div class="list-table">
            <MDBContainer class="px-0 mb-3 d-flex align-items-center justify-content-center">
                <button class="tc-pager" role="button" 
                :disabled="pagination.currentPage <= 0"
                @click="() => {
                        pagination.currentPage -= 1
                        ListApproveHospitals()
                    }">
                    <MDBIcon fas icon="angle-double-left" />
                </button>
                <div class="tc-page">{{ pagination.currentPage + 1 }}</div>
                <button class="tc-pager" role="button"
                :disabled="pagination.currentPage >= pagination.totalPage - 1" 
                @click="() => {
                        pagination.currentPage += 1
                        ListApproveHospitals()
                    }">
                    <MDBIcon fas icon="angle-double-right" />
                </button>
            </MDBContainer>
            <MDBTable responsive class="align-middle mb-0 bg-white text-center">
                <thead class="bg-dark">
                    <tr>
                        <th scope="col" class="table-dark">HOSPITAL NAME</th>
                        <th scope="col" class="table-dark">CONTACT NUMBER</th>
                        <th scope="col" class="table-dark">ADDRESS</th>
                        <th scope="col" class="table-dark">HOSPITAL CAPABILITIES</th>
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
                            <strong v-for="(capabilities, index) in dataVals.variance" :key="capabilities">
                                {{ capabilities.display_name }}<span v-if="index < dataVals.variance.length">, </span></strong>
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
                                modalTitle = 'REFERRAL FORM'
                                selectedHospital = dataVals
                                formData.withReferral = true
                                openReferral = true
                            }">SEND REFERRAL</MDBBtn>
                        </td>
                    </tr>
                </tbody>
            </MDBTable>
        </div>
    </MDBContainer>

    <MDBModal
        v-model="openReferral"
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
                v-model="formData.idCaller"
                wrapperClass="mb-4"
            />
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Dispatch Time"
                            v-model="formData.dispatchTime"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="En route"
                            v-model="formData.enRoute"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the scene"
                            v-model="formData.atTheScene"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Left the scene"
                            v-model="formData.leftTheScene"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="At the Facility"
                            v-model="formData.atTheFacility"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput
                    type="text"
                    label="Site of response"
                    v-model="formData.siteOfResponse"
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
                            v-model="formData.fname"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Middle Name"
                            v-model="formData.mname"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Last Name"
                            v-model="formData.lname"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="formData.temperature"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="date"
                            label="Date of Birth"
                            v-model="formData.dob"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Age"
                            v-model="formData.age"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.sex">
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
                    v-model="formData.contactNumber"
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
                            v-model="formData.nextOfKinName"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="number"
                            label="Contact Number"
                            v-model="formData.contactNumberKin"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Temperature"
                            v-model="formData.temperatureKin"
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
                            v-model="formData.lostOfConsciousness"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Considered manual head stabilisation"
                            v-model="formData.consideredManual"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <MDBInput
                    type="text"
                    label="CC Chief Complaint"
                    v-model="formData.ccChiefComplaint"
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.eyeOpening">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.verbalResponse">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.motorResponse">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.airway">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.circulationOfPulse">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.breathing">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.skin">
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
                    formText="When the pain started?" v-model="formData.onset"/>
                <MDBRow>
                    <MDBCol>
                        <div class="d-flex flex-wrap my-3">
                            <div class="flex-grow-1 mx-1 mb-3">
                                <p style="margin-bottom: 0;">Palliation/Provocation:</p>
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.palliationProvocation">
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
                                <select class="form-select cua-input-select-2" name="role" v-model="formData.quality">
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
                    formText="Does it raidate to other areas?" v-model="formData.radiation"/>
                <div class="d-flex flex-wrap my-3">
                    <div class="flex-grow-1 mx-1 mb-3">
                        <p style="margin-bottom: 0;">Severity:</p>
                        <select class="form-select cua-input-select-2" name="role" v-model="formData.severity">
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
                formText="Is it pain the same as it started or is it increased or decreased?" v-model="formData.time"/>
                <br>
                <MDBTextarea label="Signs and Symptoms" rows="3" wrapperClass="mb-4" v-model="formData.signSymptoms"/>
                <MDBTextarea label="Age/Athlethecism/Allergies" rows="3" wrapperClass="mb-4"
                v-model="formData.ageAthletecismAllergies" />
                <MDBTextarea label="Medication" rows="3" wrapperClass="mb-4" 
                v-model="formData.medication"/>
                <MDBTextarea label="Past History" rows="3" wrapperClass="mb-4"
                v-model="formData.pastHistory"/>
                <MDBTextarea label="Last oral intake" rows="3" wrapperClass="mb-4"
                v-model="formData.lastOralIntake"/>
                <MDBTextarea label="Events leading to the incident" rows="3" wrapperClass="mb-4"
                v-model="formData.eventsLeadingToAccident"/>
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
                            v-model="formData.deformity"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Contusion"
                            v-model="formData.contusion"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Bruise"
                            v-model="formData.bruise"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Laceration"
                            v-model="formData.laceration"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Abrasion"
                            v-model="formData.abrasion"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Puncture"
                            v-model="formData.puncture"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Tenderness"
                            v-model="formData.tenderness"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Swelling"
                            v-model="formData.swelling"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.etoh"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Sub. Ab."
                            v-model="formData.subab"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.burn"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Superf."
                            v-model="formData.superf"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Partial"
                            v-model="formData.partial"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Full"
                            v-model="formData.full"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.gravida"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Para EDD"
                            v-model="formData.paraedd"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="True Labor"
                            v-model="formData.truelabor"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="< 60 sec"
                            v-model="formData.sec60"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="< 2 min"
                            v-model="formData.min2"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.crackles"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Wheezing"
                            v-model="formData.wheezing"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Stridor"
                            v-model="formData.stridor"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rhonchi"
                            v-model="formData.rhonchi"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rales"
                            v-model="formData.rales"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="CTA"
                            v-model="formData.cta"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>Vital Signs</strong>
                <br>
                
                <div v-for="(val, index) in formData.vitalSigns" :key="index">
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
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Blood Pressure"
                                v-model="val.bloodPressure"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Pulse Rate"
                                v-model="val.pulseRate"
                                wrapperClass="mb-4"
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
                                    />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput
                                        type="text"
                                        label="Entry #2"
                                        v-model="val.respiratoryQualityTwo"
                                        wrapperClass="mb-4"
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
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Left Pupil"
                                v-model="val.leftPupil"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Right Pupil"
                                v-model="val.rightPupil"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                    </MDBRow>
                </div>
                <MDBRow>
                    <MDBCol md="3" class="py-2">
                        <MDBBtn color="primary" style="float: left; width: 100%;"
                        @click="AddVitalSignsForm">ADD VITAL SIGNS FORM</MDBBtn>
                    </MDBCol>
                    <MDBCol v-if="formData.vitalSigns.length > 1" md="3" class="py-2">
                        <MDBBtn color="danger" style="float: left; width: 100%"
                        @click="(() => formData.vitalSigns.pop())">REMOVE VITAL SIGNS FORM</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <br>
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
                            v-model="formData.openAirway"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Man. Clear."
                            v-model="formData.manClear"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Suction"
                            v-model="formData.suction"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="o2 b L L L"
                            v-model="formData.o2blll"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBCheckbox
                            label="OPA"
                            v-model="formData.opa"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="NC"
                            v-model="formData.nc"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Nebul"
                            v-model="formData.nebul"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="BVM"
                            v-model="formData.bvm"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.cpr"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Start @"
                            v-model="formData.circulationStart"
                            wrapperClass="mb-4"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            type="text"
                            label="Cycles"
                            v-model="formData.circulationCycle"
                            wrapperClass="mb-4"
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
                            v-model="formData.cspine"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Splint"
                            v-model="formData.splint"
                            wrapperClass="mb-3 mb-md-0"
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
                            v-model="formData.cleaning"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Bandaging"
                            v-model="formData.bandaging"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Occlusive Dressing"
                            v-model="formData.occlusiveDressing"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <br>
                <strong>OTHERS</strong>
                <MDBCheckbox
                    label="Positioning Cold/Warm"
                    v-model="formData.positioningColdWarm"
                    wrapperClass="mb-3 mb-md-0"
                />
                <div v-if="formData.withReferral">
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
                                v-model="formData.receivingFacility"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Receving Provider"
                                v-model="formData.receivingProvider"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                type="text"
                                label="Position"
                                v-model="formData.position"
                                wrapperClass="mb-4"
                            />
                        </MDBCol>
                    </MDBRow>
                    <strong>SIGNATURE</strong>
                    <MDBTextarea label="Additional Information" rows="3" wrapperClass="mb-4"
                    v-model="formData.signatureAdditionalInfo"/>
                    <MDBCheckbox
                        label="By Checking this, You're agreeing to everything to the statement above"
                        v-model="formData.agreementPatient"
                        wrapperClass="mb-3 mb-md-0"
                    />
                    <br>
                    <MDBInput label="Time" type="text" v-model="formData.signatureTime"/>
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
                                v-model="formData.evaluation"
                                wrapperClass="mb-3 mb-md-0"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox
                                label="Treatment"
                                v-model="formData.treatment"
                                wrapperClass="mb-3 mb-md-0"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox
                                label="Transport"
                                v-model="formData.transport"
                                wrapperClass="mb-3 mb-md-0"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Patient's printed name" type="text" v-model="formData.refusalName"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Age" type="number" v-model="formData.refusalAge"/>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="DoB" type="date" v-model="formData.refusalDoB"/>
                        </MDBCol>
                    </MDBRow>
                    <br>
                    <MDBTextarea label="Patient's address" row="4" v-model="formData.refusaladdress" />
                    <br>
                    <MDBRow>
                        <MDBCol>
                            <MDBCheckbox
                                label="By checking this, the patient is agreeing with the form above"
                                v-model="formData.refusalAgree"
                                wrapperClass="mb-3 mb-md-0"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Witness Relationship (If applicable)" type="text"
                                v-model="formData.refusalRelationship" />
                        </MDBCol>
                        <MDBCol>
                            <MDBCheckbox 
                            label="By checking this, the witness is agreeing with that he/she witness the said events"
                            type="text" v-model="formData.refusalWitnessAgree"/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Witness Printed Name" type="text"
                                v-model="formData.refusalWitnessName" />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Date and Time" type="date" 
                                v-model="formData.refusalDateTime" />
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
                            v-model="formData.decomposition"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Rigor Mortis"
                            v-model="formData.rigormortis"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Incineration"
                            v-model="formData.incineration"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Decapitation"
                            v-model="formData.decapitation"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Pooling"
                            v-model="formData.pooling"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="Other injuries totally incompatible with life"
                            v-model="formData.otherInjuries"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBTextarea label="PLEASE SPECIFIY NATURE OF INJURIES" row="4" 
                    v-model="formData.natureOfInjuries"/>
                <hr>
                <center>
                    <strong>PROVIDER</strong>
                </center>
                <br>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="EMR" type="text" v-model="formData.emr"/>
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="By Checking this, The provider is agreeing in EMR"
                            v-model="formData.emragree"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Odometer Differencial" type="text" v-model="formData.odometerDifferencial" />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="EMR(TL)" type="text" v-model="formData.emrtl" />
                    </MDBCol>
                    <MDBCol>
                        <MDBCheckbox
                            label="By Checking this, The provider is agreeing in EMR(TL)"
                            v-model="formData.emrtlAgree"
                            wrapperClass="mb-3 mb-md-0"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBInput label="Time Endorsement" type="text" v-model="formData.timeEndorsement" />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="secondary" @click="() => {
                    formData.withReferral = false
                    openReferral = false
                }" > Back </MDBBtn>
                <MDBSpinner v-if="pcrProcessing.savingData" />
                <MDBBtn v-else color="primary" @click="SendReferral" > Send Referral </MDBBtn>
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
import { PCR } from '../../../modules/pcr'
import {useToast} from 'vue-toast-notification';
export default{
    name: 'ResponseTeamReferral',
    data(){
        return{
            openReferral: false,
            selectedHospital: [],
            toast: useToast(),
            modalTitle: "",
            formData: {
                hospital: "",
                withReferral: false,
                idCaller: "",
                dispatchTime: "",
                enRoute: "",
                atTheScene: "",
                leftTheScene: "",
                atTheFacility: "",
                siteOfResponse: "",
                fname: "",
                mname: "",
                lname: "",
                temperature: "",
                dob: "",
                age: "",
                sex: "",
                contactNumber: "",
                nextOfKinName: "",
                contactNumberKin: "",
                temperatureKin: "",
                lostOfConsciousness: false,
                consideredManual: false,
                ccChiefComplaint: "",
                eyeOpening: "",
                verbalResponse: "",
                motorResponse: "",
                airway: "",
                circulationOfPulse: "",
                breathing: "",
                skin: "",
                onset: "",
                palliationProvocation: "",
                quality: "",
                radiation: "",
                severity: "",
                time: "",
                signSymptoms: "",
                ageAthletecismAllergies: "",
                medication: "",
                pastHistory: "",
                lastOralIntake: "",
                eventsLeadingToAccident: "",
                deformity: false,
                contusion: false,
                bruise: false,
                laceration: false,
                abrasion: false,
                puncture: false,
                tenderness: false,
                swelling: false,
                etoh: false,
                subab: false,
                burn: "",
                superf: false,
                partial: false,
                full: false,
                gravida: false,
                paraedd: false,
                truelabor: false,
                sec60: false,
                min2: false,
                crackles: false,
                wheezing: false,
                stridor: false,
                rhonchi: false,
                rales: false,
                cta: false,
                vitalSigns: [{
                    time: "",
                    bloodPressure: "",
                    pulseRate: "",
                    spo2: "",
                    respiratoryQualityOne: "",
                    respiratoryQualityTwo: "",
                    glucose: "",
                    crt2sec: "",
                    leftPupil: "",
                    rightPupil: ""
                }],
                openAirway: false,
                manClear: false,
                suction: false,
                o2blll: false,
                opa: false,
                nc: false,
                nebul: false,
                bvm: false,
                cpr: false,
                circulationStart: "",
                circulationCycle: "",
                cspine: false,
                splint: false,
                cleaning: false,
                bandaging: false,
                occlusiveDressing: false,
                positioningColdWarm: false,
                receivingFacility: "",
                receivingProvider: "",
                position: "",
                signatureAdditionalInfo: "",
                agreementPatient: false,
                signatureTime: "",
                evaluation: false,
                treatment: false,
                transport: false,
                refusalName: "",
                refusalAge: "",
                refusalDoB: "",
                refusaladdress: "",
                refusalAgree: false,
                refusalRelationship: "",
                refusalWitnessAgree: false,
                refusalWitnessName: "",
                refusalDateTime: "",
                decomposition: false,
                rigormortis: false,
                incineration: false,
                decapitation: false,
                pooling: false,
                otherInjuries: false,
                natureOfInjuries: "",
                emr: "",
                emragree: false,
                odometerDifferencial: "",
                emrtl: "",
                emrtlAgree: false,
                timeEndorsement: ""
            }
            
        }
    },
    methods: {
        AddVitalSignsForm(){
            this.formData.vitalSigns.push({
                time: "",
                bloodPressure: "",
                pulseRate: "",
                spo2: "",
                respiratoryQualityOne: "",
                respiratoryQualityTwo: "",
                glucose: "",
                crt2sec: "",
                leftPupil: "",
                rightPupil: ""
            })
        },
        async SendReferral(){
        if (this.formData.fname == "" || this.formData.lname == "" || 
            this.formData.dispatchTime == "" || this.formData.enRoute == "" ||
            this.formData.atTheScene == "" || this.formData.atTheFacility == ""){
                console.log(this.formData.fname, this.formData.lname,
            this.formData.dispatchTime,this.formData.enRoute,
            this.formData.atTheScene, this.formData.atTheFacility)
                this.toast.open({
                    message: "Please fill up the Dispatch Time, En Route, At the Scene, At the Facility, Patient First Name, Patient Last Name",
                    type: 'warning',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })

                return;
            }

            if (this.selectedHospital?._id !== null){
                this.formData.hospital = this.selectedHospital._id
            }
            else{
                this.formData.hospital = ""
            }
            await this.SavePCR(this.formData)

            if (this.pcrResponse.saveResponse === "success"){
                this.toast.open({
                    message: "Referral send Successfully",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.pcrProcessing.savingData = false;
                this.pcrResponse.saveResponse = ""
                this.openReferral = false;
            }
            else if (this.response.createAccountResponse === "bad-request"){
                this.toast.open({
                    message: "There's a problem with the server! Please try again.",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
            else{
                this.toast.open({
                    message: "There's a problem with your internet connection, please try again",
                    type: 'error',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
            }
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
        const { pcrProcessing, pcrResponse, SavePCR } = PCR()

        onMounted(() => {
            ListApproveHospitals()
        })

        return { 
            hospitalValues,
            response,
            pagination, 
            hospitalProcessing, 
            pcrResponse,
            pcrProcessing,
            SavePCR,
            ListApproveHospitals }
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
