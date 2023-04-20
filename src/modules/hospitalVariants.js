import { ref } from 'vue'

export const Variance = () => {
    const variants = ref({
        variance: {},
        varianceList: []
    })
    const processing = ref({
        gettingData: false,
        gettingPaginationData: false
    });

    const pagination = ref({
        currentPage: 0,
        pageLimit: 10,
        totalPages: 1
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
                variants.value.totalPages = data.pages
            })
            processing.value.gettingPaginationData = false;
        }
        catch(err){
            console.log(err)
        }
    }

    return {
        variants,
        processing,
        pagination,
        GetAllVariance,
        PaginationListVariance
    }
}