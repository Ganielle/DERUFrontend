<template>
    <MDBModal
        v-model="modal"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> {{ modalTitle }} </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody> 
            {{ modalMessage }}
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" > Cancel </MDBBtn>
            <MDBBtn color="primary" type="submit" 
                > Yes </MDBBtn>
        </MDBModalFooter>
    </MDBModal>
</template>

<script>
import { MDBBtn, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle } from 'mdb-vue-ui-kit';
export default{
    name: 'ConfirmationModal',
    props:{
        modalMessage: String,
        modalTitle: String,
        openModal: Boolean
    },
    data() {
        return {
            modal: this.openModal
        }
    },
    components:{
        MDBBtn,
        MDBModal,
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter,
        MDBModalTitle,
    },
    methods: {
        // SendConfirmation(){
        //     this.$emits('update:agree');
        // },
        // SendCancel(){
        //     this.$emits('update:cancel');
        // }
    }
}
</script>

<style>
</style>
