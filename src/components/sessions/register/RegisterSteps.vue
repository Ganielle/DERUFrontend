<template>
    <div class="p-5 text-center bg-light jumbotron rounded">
        <h1 class="process-title">REGISTRATION PROCESS</h1>
        <div class="desktop-view">
            <MDBContainer>
                <MDBRow class="align-items-start bg-light mb-3">
                    <MDBCol>
                        <div class="rounded-step" v-bind:style="[stepIndex == 0 ? {
                            'background': '#000000'
                        } : {'background': '#434350'}]">
                            <p class="step-item">1</p>
                        </div>
                        <p>REGISTER YOUR ACCOUNT</p>
                    </MDBCol>
                    <MDBCol>
                        <div class="rounded-step" v-bind:style="[stepIndex == 1 ? {
                            'background': '#000000'
                        } : {'background': '#434350'}]">
                            <p class="step-item">2</p>
                        </div>
                        <p>REGISTER HOSPITAL</p>
                    </MDBCol>
                    <MDBCol>
                        <div class="rounded-step" v-bind:style="[stepIndex == 2 ? {
                            'background': '#000000'
                        } : {'background': '#434350'}]">
                            <p class="step-item">3</p>
                        </div>
                        <p>TERMS AND CONDITIONS</p>
                    </MDBCol>
                    <MDBCol>
                        <div class="rounded-step" v-bind:style="[stepIndex == 3 ? {
                            'background': '#000000'
                        } : {'background': '#434350'}]">
                            <p class="step-item">4</p>
                        </div>
                        <p>WELCOME</p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
        <div class="mobile-view">
            <MDBContainer>
                <MDBRow class="align-items-start bg-light mb-3">
                    <MDBCol>
                        <div class="rounded-step">
                            <p class="step-item">{{ stepIndex + 1 }}</p>
                        </div>
                        <div v-if="stepIndex == 0">
                            <p>REGISTER YOUR ACCOUNT</p>
                        </div>
                        <div v-else-if="stepIndex == 1">
                            <p>REGISTER HOSPITAL</p>
                        </div>
                        <div v-else-if="stepIndex == 2">
                            <p>TERMS AND CONDITION</p>
                        </div>
                        <div v-else>
                            <p>WELCOME</p>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    </div>
</template>

<script>
import { MDBRow, MDBContainer, MDBCol } from 'mdb-vue-ui-kit';
import { mapState } from 'vuex'

export default{
    name: 'RegisterSteps',
    components: {
        MDBRow,
        MDBContainer,
        MDBCol
    },
    computed: {
        ...mapState(["stepIndex"])
    }
}
</script>

<style>
.jumbotron{
    width: auto; /* Can be in percentage also. */
    height: auto;
    margin: 0 auto;
    position: relative;
}
.process-title{
    padding-bottom: 20px;
}
.rounded-step{
    border-radius: 50%;
    background: #434350;
    height: 50px;
    width: 50px;
    display: inline-block;
}
.step-item{
    color: aliceblue;
    font-size: xx-large;
    width: auto; /* Can be in percentage also. */
    height: auto;
    margin: 0 auto;
    position: relative;
    padding-top: 0%;
}

@media only screen and (min-width: 320px) {
  .desktop-view{
    display: none;
  }
  .mobile-view{
    display: contents;
  }
}

@media only screen and (min-width: 768px) {
  .desktop-view{
    display: contents;
  }
  .mobile-view{
    display: none;
  }
}
</style>
