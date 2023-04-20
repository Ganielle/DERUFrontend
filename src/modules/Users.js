import { ref } from 'vue'

export const Users = () => {
    const values = ref({
        userCount: 0,
        userList: []
    })

    const processing = ref({
        gettingData: false,
        gettingListData: false
    })

    const pagination = ref({
        totalPages: 0,
        currentPage: 0,
        pageLimit: 10
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

    const GetUserList = async (approve, roleId) => {
        processing.value.gettingListData = true;
        await fetch(process.env.VUE_APP_API_URL + "users/userlist?page=" + pagination.value.currentPage + 
            "&limit=" + pagination.value.pageLimit + "&approve=" + approve + "&roleId=" + roleId )
        .then(res => res.json())
        .then(data => {
            values.value.userList = data.userData
            pagination.value.totalPages = data.pages
            processing.value.gettingListData = false;
        })
        .catch(err => console.log(err))
    }

    return {
        values,
        processing,
        pagination,
        CountUsers,
        GetUserList
    }
}