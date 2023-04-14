<template>
    <div class="register">
        <RegisterSteps />
    </div>
</template>

<script>
import RegisterSteps from '@/components/sessions/register/RegisterSteps.vue'

export default{
    name: 'RegisterView',
    components: {
        RegisterSteps
    }
}
</script>

<style>
.register{
    width: 100vw;
    height: 100vh;
    background-color: aqua;
    margin: 0;
}
</style>
