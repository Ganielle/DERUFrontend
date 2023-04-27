<template>
    <DashboardBreadcrumbs breadcrumbs="HOSPITAL MANAGEMENT / MANAGE" />
    <MDBContainer class="px-0">
        <div class="list-title-bg">
            <div class="list-title">HOSPITAL INFORMATION</div>
        </div>
        <br>
        <MDBSpinner class="text-center" v-if="hospitalProcessing.listingData" />
        <div v-else class="p-5 text-center bg-light rounded">
            <h1>{{ hospitalValues.listValues.display_name }}</h1>
            <h4>HOSPITAL STATUS: <p v-if="hospitalValues.listValues.approve">APPROVE</p>
            <p v-else>NOT YET APPROVE</p></h4>
            <hr>
            <form v-on:submit.prevent="onSubmit">
                <!-- username input -->
                <MDBInput
                type="text"
                label="Hospital Name"
                id="hospital"
                v-model="hospitalValues.listValues.display_name"
                class="form-input"
                wrapperClass="mb-4"
                required
                />

                <div class="grid">
                    <div class="g-col-6 g-col-md-4">
                        <MDBInput
                        type="number"
                        label="Landline"
                        id="contactNumberOne"
                        v-model="hospitalValues.listValues.landline"
                        class="form-input"
                        wrapperClass="mb-4"
                        required
                        />
                    </div>
                    <div class="g-col-6 g-col-md-4">
                        <MDBInput
                        type="number"
                        label="Cellphone Number"
                        id="contactNumber"
                        v-model="hospitalValues.listValues.cellphone"
                        class="form-input"
                        wrapperClass="mb-4"
                        required
                        />
                    </div>
                </div>

                <MDBInput
                    type="text"
                    label="Address"
                    id="address"
                    v-model="hospitalValues.listValues.address"
                    class="form-input"
                    wrapperClass="mb-4"
                    required
                />

                <div class="grid">
                    <div class="g-col-6 g-col-md-4">
                        <MDBInput
                            type="number"
                            label="Number of Regular Beds"
                            id="regularBeds"
                            v-model="hospitalValues.listValues.regularBeds"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                        />
                    </div>
                    <div class="g-col-6 g-col-md-4">
                        <MDBInput
                            type="number"
                            label="Number of Covid Beds"
                            id="covideBeds"
                            v-model="hospitalValues.listValues.covidBeds"
                            class="form-input"
                            wrapperClass="mb-4"
                            required
                        />
                    </div>
                </div>
                <br/>
                <h5 class="no-center-text">Select your hospital Capabilities: </h5>
                <br/>
                <div v-for="items in variants.variance" :key="items">
                    <label class="container no-center-text">{{ items.display_name }}
                        <input type="checkbox"
                            :value="items._id"
                            :id="items._id"
                            v-model="varianceSelectedName"
                            :name="items.display_name"
                            @change="updateValue($event.target.checked, $event.target.name)"
                            checked="checked">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <br/>
                <MDBBtn v-if="!hospitalProcessing.approve" color="primary" class="mb-4 next-step"
                @click="UpdateValues"> UPDATE INFORMATION </MDBBtn>
                <MDBSpinner v-else />
            </form>
        </div>
    </MDBContainer>
</template>

<script>
import { onMounted } from 'vue';
import { Variance } from '../../../modules/hospitalVariants'
import DashboardBreadcrumbs from '../DashboardBreadcrumbs.vue';
import { MDBSpinner, MDBContainer, MDBBtn, MDBInput } from 'mdb-vue-ui-kit';
import { Hospitals } from '../../../modules/hospital';
import {useToast} from 'vue-toast-notification';
export default{
    name: 'HospitalStaffManage',
    data(){
        return{
            varianceSelectedName: [],
            toast: useToast(),
        }
    },
    components:{
        DashboardBreadcrumbs,
        MDBContainer,
        MDBBtn,
        MDBInput,
        MDBSpinner
    },
    methods:{
        async UpdateValues(){
            await this.UpdateHospital()

            if (this.response.approveResponse === "success"){
                this.toast.open({
                    message: "Successfully Updated the hospital details",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                const auth = JSON.parse(localStorage.getItem("userCreds"))
                this.FindHospital(auth._id)
                this.GetAllVariance()
                
                this.hospitalProcessing.approve = false
            }
            else if (this.response.approveResponse === "bad-request"){
                this.toast.open({
                    message: "There's an error in server! Please try again later",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                
                this.hospitalProcessing.approve = false
            }
            else{
                this.toast.open({
                    message: "There's an error in network! Please try again later",
                    type: 'success',
                    position: 'top',
                    duration: 3000,
                    dismissible: true
                })
                this.hospitalProcessing.approve = false
            }
        },
        updateValue(value, name) {
            if (value){
                this.varianceSelectedName.push(name)
            }
            else{
                this.varianceSelectedName.splice(name,1)
            }
            console.log("hello")
        }
    },
    created: function() {
    },
    setup() {
        
        const { hospitalValues, 
            hospitalProcessing, response, FindHospital, UpdateHospital} = Hospitals()

        const { variants, processing, GetAllVariance } = Variance()

        onMounted(async () => {
            const auth = JSON.parse(localStorage.getItem("userCreds"))
            await FindHospital(auth._id)
            await GetAllVariance()
        })

        return { hospitalValues, 
            hospitalProcessing, FindHospital,
            variants, processing, response, GetAllVariance, UpdateHospital }
    }
}
</script>
