import { ref } from 'vue'

export const PCR = () => {
    const pcrValues = ref({
        pcrHistory: []
    })

    const pcrProcessing = ref({
        savingData: false,
        gettingData: false
    })

    const pcrPagination = ref({
        currentPage: 0,
        pageLimit: 10,
        totalPages: 1
    })

    const pcrResponse = ref({
        saveResponse: "",
    })

    const GetPCR = async () => {
        pcrProcessing.value.gettingData = true

        await fetch(process.env.VUE_APP_API_URL + "pcr/browse?page=" + pcrPagination.value.currentPage + 
        "&limit=" + pcrPagination.value.pageLimit)
        .then(res => res.json())
        .then(data => {
            pcrPagination.value.totalPages = data.pages
            pcrValues.value.pcrHistory = data.data
            pcrProcessing.value.gettingData = false
        })
        .catch(() => {
            pcrProcessing.value.savingData = false;
            pcrResponse.value.saveResponse = "failed"
        })
    }

    const SavePCR = async (data) => {
        pcrProcessing.value.savingData = true;
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "pcr/save", requestOptions)
        .then(res => res.json())
        .then(data => {
            pcrResponse.value.saveResponse = data.message
            pcrProcessing.value.savingData = false;
        })
        .catch(() => {
            pcrProcessing.value.savingData = false;
            pcrResponse.value.saveResponse = "failed"
        })
    }

    return {
        pcrProcessing,
        pcrPagination,
        pcrResponse,
        pcrValues,
        SavePCR,
        GetPCR
    }
}