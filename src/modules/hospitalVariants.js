import { ref } from 'vue'

export const Variance = () => {
    const variants = ref({
        variance: {},
        varianceList: []
    })
    const processing = ref({
        gettingData: false,
        gettingPaginationData: false,
        updatingData: false,
        saveData: false
    });

    const pagination = ref({
        currentPage: 0,
        pageLimit: 10,
        totalPages: 1
    })

    const saveVariant = ref({
        display_name: ""
    })

    const editVariant = ref({
        id: "",
        editName: ""
    })

    const response = ref({
        editResponse: "",
        saveResponse: ""
    })

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

    const PaginationListVariance = async () => {
        processing.value.gettingPaginationData = true
        try{
            await fetch(process.env.VUE_APP_API_URL + "variance/variantlist?page=" + pagination.value.currentPage + "&limit=" + 
            pagination.value.pageLimit)
            .then(res => res.json())
            .then(data => {
                variants.value.varianceList = data.data
                pagination.value.totalPages = data.pages
            })
            processing.value.gettingPaginationData = false;
        }
        catch(err){
            console.log(err)
        }
    }

    const AddVariant = async () => {
        processing.value.saveData = true
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                display_name: saveVariant.value.display_name
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "variance/save", requestOptions)
        .then(res => res.json())
        .then(data => response.value.saveResponse = data.message)
        .catch(() => response.value.editResponse = "failed")
        processing.value.saveData = false
    }

    const UpdateVariant = async () => {
        processing.value.updatingData = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                display_name: editVariant.value.editName
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "variance/" + editVariant.value.id + "/update", 
            requestOptions)
            .then(res => res.json())
            .then(data => response.value.editResponse = data.message)
            .catch(() => response.value.editResponse = "failed")
        processing.value.updatingData = false
    }

    return {
        variants,
        processing,
        pagination,
        editVariant,
        response,
        saveVariant,
        GetAllVariance,
        PaginationListVariance,
        UpdateVariant,
        AddVariant
    }
}