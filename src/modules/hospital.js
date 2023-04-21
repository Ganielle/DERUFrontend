import { ref } from 'vue'

export const Hospitals = () => {
    const hospitalValues = ref({
        hospitalCount: 0,
        listValues: []
    })

    const hospitalProcessing = ref({
        gettingData: false,
        listingData: false,
        approve: false
    })

    const pagination = ref({
        currentPage: 0,
        totalPage: 0,
        pageLimit: 10
    })

    const response = ref({
        listResponse: "",
        approveResponse: ""
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

    const ListHospitals = async () => {
        hospitalProcessing.value.listingData = true

        await fetch(process.env.VUE_APP_API_URL + "hospitals/listhospital?page=" + pagination.value.currentPage + 
        "&limit=" + pagination.value.pageLimit)
        .then(res => res.json())
        .then(data => {
            hospitalValues.value.listValues = data.data
            response.value.listResponse = data.message
            pagination.value.totalPage = data.pages
            hospitalProcessing.value.listingData = false
        })
        .catch(() => response.value.createAccountResponse = "failed")
    }

    const ApproveHospital = async (id) => {
        hospitalProcessing.value.approve = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                approve: true
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "hospitals/" + id + "/approve", requestOptions)
        .then(res => res.json())
        .then(data => {
            response.value.approveResponse = data.message
            hospitalProcessing.value.approve = false
        })
        .catch(() => response.value.createAccountResponse = "failed")
    }

    const ListApproveHospitals = async () => {
        hospitalProcessing.value.listingData = true

        await fetch(process.env.VUE_APP_API_URL + "hospitals/listapprove?page=" + pagination.value.currentPage + 
        "&limit=" + pagination.value.pageLimit)
        .then(res => res.json())
        .then(data => {
            hospitalValues.value.listValues = data.data
            response.value.listResponse = data.message
            pagination.value.totalPage = data.pages
            hospitalProcessing.value.listingData = false
        })
        .catch(() => response.value.createAccountResponse = "failed")
    }

    return { 
            hospitalValues, 
            hospitalProcessing,
            pagination,
            response,
            CountHospitals,
            ListHospitals,
            ApproveHospital,
            ListApproveHospitals
        }
}