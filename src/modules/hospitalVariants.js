import { ref } from 'vue'

export const Variance = () => {
    const variants = ref({
        variance: {}
    })
    const processing = ref({
        gettingData: false
    });

    const GetAllVariance = async () => {
        processing.value.gettingData = true;
        try{
            await fetch(process.env.VUE_APP_API_URL + "variance/browse")
            .then(res => res.json())
            .then(data => {
                variants.value.variance = data
            })
            processing.value.gettingData = false;
        }
        catch(err){
            console.log(err)
        }
    }

    return {
        variants,
        processing,
        GetAllVariance
    }
}