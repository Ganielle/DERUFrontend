<template>
    <br>
    <div class="register-form">
        <div class="p-5 text-center bg-light jumbotron rounded">
        <h1>REGISTER HOSPITAL</h1>
        <h4>Fill up the form to proceed to the next step</h4>
        <br>
            <form v-on:submit.prevent="onSubmit">
                    <!-- username input -->
                    <MDBInput
                    type="text"
                    label="Hospital Name"
                    id="hospital"
                    v-model="hospital"
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
                            v-model="numberOne"
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
                            v-model="numberTwo"
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
                        v-model="address"
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
                                v-model="regularBed"
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
                                v-model="covidBed"
                                class="form-input"
                                wrapperClass="mb-4"
                                required
                            />
                        </div>
                    </div>
                    <br/>
                    <h5 class="no-center-text">Select your hospital Capabilities: </h5>
                    <br/>
                    <div v-for="items in Variance" :key="items._id">
                        <label class="container no-center-text">{{ items.display_name }}
                            <input type="checkbox"
                                :value="items._id"
                                :id="items._id"
                                v-model="varianceSelected"
                                :name="items.display_name"
                                @change="updateValue($event.target.checked, $event.target.name)"
                                checked="checked">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <br/>
                    <h5 class="no-center-text">Your Selected Hospital Capabilities: </h5>
                    <h6 class="no-center-text"> {{ CheckVariances.join(', ') }}</h6>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn color="primary" class="mb-4 next-step"
                                @click="reduceSignupStep(1)"> PREVIOUS STEP </MDBBtn>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn color="primary" class="mb-4 next-step"
                                @click="AddStep(1)" type="submit"> NEXT STEP </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </form>
        </div>
    </div>
    
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol  } from "mdb-vue-ui-kit"
import {useToast} from 'vue-toast-notification';
import { Signup } from '../../../modules/signup';

export default{
    name: 'HospitalForm',
    props: {
        Variance: Object
    },
    data() {
        return{
            hospital: "",
            numberOne: "",
            numberTwo: "",
            address: "",
            regularBed: "",
            covidBed: "",
            varianceSelected: [],
            varianceSelectedName: [],
            toast: useToast(),
        }
    },
    components: {
        MDBBtn,
        MDBInput,
        MDBContainer,
        MDBCol,
        MDBRow
    },
    computed: {
        ...mapState(["stepIndex", "registerHospital"]),
        CheckVariances(){
            return this.varianceSelectedName
        }
    },
    methods: {
        ...mapMutations(["addSignupStep", "reduceSignupStep", "addRegisterHospital",
            "addSelectedVariants"]),
        CheckValues(){
            if (this.registerHospital.length <= 0){
                return;
            }

            this.hospital = this.registerHospital[0] !== "" ? this.registerHospital[0] : ""
            this.numberOne = this.registerHospital[1] !== "" ? this.registerHospital[1] : ""
            this.numberTwo = this.registerHospital[2] !== "" ? this.registerHospital[2] : ""
            this.address = this.registerHospital[3] !== "" ? this.registerHospital[3] : ""
            this.regularBed = this.registerHospital[4] !== "" ? this.registerHospital[4] : ""
            this.covidBed = this.registerHospital[5] !== "" ? this.registerHospital[5] : ""
        },
        AddStep(value){
            

            if (this.hospital !== "" && this.numberOne !=="" &&
                this.numberTwo !== "" && this.address !== "" && this.regularBed !== ""
                && this.covidBed !== ""){
                if (this.varianceSelected.length <= 0 || this.varianceSelectedName.length <= 0){
                    this.toast.open({
                        message: "Please select a hospital variant first!",
                        type: 'error',
                        position: 'top',
                        duration: 3000,
                        dismissible: true
                    })
                    return;
                }
                this.addRegisterHospital([this.hospital, this.numberOne, this.numberTwo,
                    this.address, this.regularBed, this.covidBed])
                this.addSelectedVariants(this.varianceSelected)

                this.fields.display_name = this.hospital
                this.fields.landline = this.numberOne
                this.fields.cellphone = this.numberTwo
                this.fields.address = this.address
                this.fields.regularBeds = this.regularBed
                this.fields.covidBeds = this.covidBed
                this.fields.variance = this.varianceSelected

                this.addSignupStep(value)
            }
        },
        updateValue(value, name) {
            if (value){
                this.varianceSelectedName.push(name)
            }
            else{
                this.varianceSelectedName.splice(name,1)
            }
        }
    },
    created: function() {
        this.CheckValues()
    },
    setup() {
        
        const { fields, SaveData } = Signup()

        return { fields, SaveData }
    }
}
</script>

<style>
.register-form{
    /* margin-top: 5vh; */
    padding-bottom: 100px;
    /* padding-left: 50vh; */
    /* padding-right: 50vh; */
}
.form-input{
    color: #000000;
}
.next-step{
    margin-top: 50px;
}
.grid{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(40%, 200fr));
}
h1{
    overflow-wrap: break-word;
}
.cua-input-select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: transparent !important;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
  color: rgb(255, 255, 255) !important;
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  /* font-size: 22px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #a3a3a3;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #5f5f5f;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
