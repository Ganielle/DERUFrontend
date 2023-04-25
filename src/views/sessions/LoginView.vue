<template>
    <div class="login-view">
        <div class="center">
            <LoginPanel/>
        </div>
    </div>
</template>

<script>
import LoginPanel from '@/components/sessions/LoginPanel.vue'

export default {
    name: 'LoginView',
    components: {
        LoginPanel
    },
    methods: {
      CheckToken(){
        const auth = JSON.parse(localStorage.getItem("userCreds"))

        if (auth){
          if (auth.roleId._id === process.env.VUE_APP_ADMINISTRATOR_ID){
            this.$router.push({name: "adminDashboard"})
          }
        }
      }
    },
    created: function() {
      this.CheckToken()
    }
}
</script>

<style scoped lang="scss">
.login-view{
    width: 100vw;
    min-height: 100vh;
    background-color: aqua;
    margin: 0;
}
.center{
    padding-top: 20vh;
    padding-left: 50vh;
    padding-right: 50vh;
}
@media only screen and (min-width: 320px) {
  .center{
    padding-top: 10vh;
    padding-left: 10vw;
    padding-right: 10vw;
  }
}

@media only screen and (min-width: 768px) {
  .center{
    padding-top: 10vh;
    padding-left: 15vw;
    padding-right: 15vw;
  }
}

@media only screen and (min-width: 1440px) {
  .center{
    padding-top: 25vh;
    padding-left: 20vw;
    padding-right: 20vw;
  }
}

@media only screen and (min-width: 2560px) {
  .center{
    padding-top: 40vh;
    padding-left: 30vw;
    padding-right: 30vw;
  }
}
</style>
