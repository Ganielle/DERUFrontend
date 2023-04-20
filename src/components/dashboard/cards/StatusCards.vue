<template>
    <MDBCol xxl="4" xl="4" lg="6" md="6" sm="12" class="my-2">
      <MDBContainer fluid className="px-0 py-1 status-small-header">
        <span className="ms-3">{{title}}</span>
      </MDBContainer>
      <MDBContainer fluid className="px-0 py-1 text-center status-small-body">
        <div v-if="process" class="text-center">
          <MDBSpinner size="sm" /> 
        </div>
        <div v-else>
          {{ value }}
        </div>  
        </MDBContainer>
      
    </MDBCol>
</template>

<script>
import { MDBContainer, MDBCol, MDBSpinner } from 'mdb-vue-ui-kit';
export default{
    name: 'StatusCards',
    props: {
        process: Boolean,
        title: String,
        value: Number
    },
    components: {
        MDBContainer,
        MDBCol,
        MDBSpinner
    }
}
</script>

<style>
.status-small-header {
  background-color: #f6b749;
  font-size: 1rem;
  font-weight: bold;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  color: #1c232e;
}

.status-small-body {
  color: white;
  font-size: 1.25rem;
  background-color: #272f39;
  position: relative;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

</style>
