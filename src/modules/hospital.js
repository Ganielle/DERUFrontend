import { ref } from 'vue'

export const Hospitals = () => {
    const hospitalValues = ref({
        hospitalCount: 0
    })

    const hospitalProcessing = ref({
        gettingData: false
    })

    const CountHospitals = async () => {
        hospitalProcessing.value.gettingData = true;

        try{
            await fetch(process.env.VUE_APP_API_URL + "hospitals/counthospital")
            .then(res => res.json())
            .then(data => {
                hospitalValues.value.hospitalCount = data.data
            })
            
            hospitalProcessing.value.gettingData = false
        }
        catch(err){
            console.log(err)
        }
    }

    return { hospitalValues, hospitalProcessing, CountHospitals }
}