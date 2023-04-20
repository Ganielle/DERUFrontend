import { ref } from 'vue'

export const Users = () => {
    const values = ref({
        userCount: 0
    })

    const processing = ref({
        gettingData: false
    })

    const CountUsers = async () => {
        processing.value.gettingData = true;
        try{
            await fetch(process.env.VUE_APP_API_URL + "users/usercount")
            .then(res => res.json())
            .then(data => {
                values.value.userCount = data.data
            })

            processing.value.gettingData = false;
        }
        catch(err){
            console.log(err)
        }
    }

    return {
        values,
        processing,
        CountUsers
    }
}