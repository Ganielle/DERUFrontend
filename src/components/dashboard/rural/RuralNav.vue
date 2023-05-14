<template>
    <div class="sidebar-wrapper d-flex flex-column" 
        :class="SidebarWrapper" :style="{width: didToggle ? innerWidth < 786 ? '0rem' : 
            '4.5rem' : '20rem'}">
        
        <div v-if="innerWidth > 768" @click="SidebarToggle()"
            class="sidebar-toggle d-flex align-items-center justify-content-center"
            :class="{'sidebar-toggle-rotate': didToggle}">
            <MDBIcon fas icon="angle-left" size="lg" />
        </div>
      <div class="sidebar-header pt-4 mb-2">
        <div class="text-center sidebar-logo-container d-flex align-items-center justify-content-center">
          <img src="../../../assets/deru.png" alt="logo" class="img-fluid w-50" />
        </div>
        <div class="text-center pt-3">
            <span class="role-text">{{ role }}</span>
        </div>
      </div>
      <div class="sidebar-body flex-grow-1">
        <!--NAV ITEM-->
        <div class="d-flex align-items-center py-2 mt-2 sidebar-link-header cursor-pointer"
        :class="{'sidebar-active-link': currentSideBar == 'pcr'}" 
        @click="() => {
          setSidebarLink('pcr')
        }">
            <div class="sidebar-icon-container">
                <MDBIcon fas icon="clipboard-list" size="xl" title="PRC" />
              </div>
            <div class="flex-grow-1 sidebar-link-header-title">
                PCR REPORT MANAGEMENT
            </div>
        </div>
    </div>
      <div class="sidebar-footer py-3">
        <div
          title="Logout"
          class="pe-5 py-0 fs-6 shadow-0 text-warning fw-bold sidebar-logout-btn"
          @click="logoutModal = true"
        >
          <MDBIcon fas icon="sign-out-alt" size="xl" class="mx-4" /> LOGOUT
        </div>
      </div>
      <div v-if="innerWidth < 768" class="custom-backdrop" @click="SidebarToggle()">
      </div>
    </div>
    
    <MDBModal
        v-model="logoutModal"
        scrollable
        centered
    >
        <MDBModalHeader>
            <MDBModalTitle id="exampleModalScrollableTitle"> LOGOUT </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody class="text-center"> 
            Are you sure you want to logout?
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" @click="logoutModal = false" > Cancel </MDBBtn>
            <MDBBtn color="primary" type="submit" 
                @click="Logout()"> Yes </MDBBtn>
        </MDBModalFooter>
    </MDBModal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MDBBtn, MDBIcon, MDBModal, MDBModalHeader, 
    MDBModalBody, MDBModalFooter, MDBModalTitle } from 'mdb-vue-ui-kit';
import {useToast} from 'vue-toast-notification';
export default{
    name: 'RuralNavi',
    props:{
      didToggle: Boolean,
      subToggle: Boolean,
      role: String
    },
    data() {
        return {
            innerWidth: window.innerWidth,
            logoutModal: false,
            toast: useToast(),
        }
    },
    components: {
      MDBBtn,
      MDBIcon,
      MDBModal,
      MDBModalHeader,
      MDBModalBody,
      MDBModalFooter,
      MDBModalTitle,
    },
    computed: {
        ...mapState(["currentSideBar", "currentSubNav"]),
        SidebarWrapper(){
            return {
                'overflow-auto': this.innerWidth < 768 && this.didToggle
            }
        }
    },
    methods: {
        ...mapMutations(["setSidebarLink", "setSubLink", "setMedAssitanceNav"]),
        SidebarToggle(){
          this.$emit('sidebarToggle')
        },
        SubItemToggle(){
          this.$emit('sideSubToggle')
        },
        Logout(){
          localStorage.removeItem("userCreds")
          this.toast.open({
              message: "Successfully Logout",
              type: 'success',
              position: 'top',
              duration: 3000,
              dismissible: true
          })
          this.$router.push({name: "home"})
        }
    }
}
</script>

<style>
.sidebar-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-right: 2px solid #58677a;
  transition: width 250ms ease-out;
  background-color: #151515;
  z-index: 10;
}

.sidebar-toggle {
  background-color: #404040;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: -1rem;
  top: 2rem;
  color: #45a5e5 !important;
  border: 2px solid #0931e2;
  cursor: pointer;
  transition: transform 250ms ease-out;
}

.sidebar-toggle-rotate {
  transform: rotate(180deg);
}

.sidebar-logo-container {
  height: 6.5rem;
}

.sidebar-header {
  background-color: #131313;
}

.sidebar-body {
  background-color: #151515;
  min-height: fit-content;
  border-top: 1px solid #2e2e2e;
  overflow-x: hidden;
  overflow-y: auto;
}

.sidebar-icon-container {
  min-width: 4.5rem;
  display: grid;
  place-items: center;
}

.sidebar-arena-btn {
  width: 90% !important;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #e5aa45 !important;
  font-size: 0.9rem !important;
}

.sidebar-link-header {
  color: #f8b94a;
  cursor: pointer;
  border-right: 0.35rem solid transparent;
  white-space: nowrap;
}

.sidebar-active-link {
  background-image: linear-gradient(to right, transparent, #01b7ee27);
  border-right: 0.35rem solid #0044ff;
  color: #2856eb !important;
}

.sidebar-active-link-2 {
  color: #2856eb !important;
}

.sidebar-link-header:hover {
  background-image: linear-gradient(to right, transparent, #25f3d144);
  color: #2856eb !important;
}

.sidebar-link-header-title {
  font-size: 0.95rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.sidebar-sublink-header-title {
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.sidebar-sub-link {
  height: 0 !important;
  overflow: hidden;
  /* white-space: nowrap; */
  transition: height 150ms ease-in-out !important;
}

.sidebar-sub-link-active {
  height: fit-content !important;
}

.sidebar-footer {
  margin-top: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #151515;
}

.sidebar-logout-btn {
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  letter-spacing: 1px;
}

.custom-backdrop {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.616);
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.role-text{
  width: 100%; font-size: 100%; color: #ffffff;
}
</style>
