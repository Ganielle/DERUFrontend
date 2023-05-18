import { ref } from 'vue'

export const Users = () => {
    const values = ref({
        userCount: 0,
        userList: []
    })

    const processing = ref({
        gettingData: false,
        gettingListData: false,
        approvingUser: false,
        decliningUser: false,
        createUser: false
    })

    const pagination = ref({
        totalPages: 0,
        currentPage: 0,
        pageLimit: 10
    })

    const response = ref({
        approveResponse: "",
        declineResponse: "",
        createAccountResponse: ""
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

    const ApproveUser = async(userId) => {
        processing.value.approvingUser = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                approve: true,
                active: true
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "users/" + userId + "/approve", requestOptions)
        .then(res => res.json())
        .then(data => {
            response.value.approveResponse = data.message
            processing.value.approvingUser = false
        })
        .catch(() => 
        response.value.approveResponse = "failed")
    }

    const DeclineUser = async(userId) => {
        processing.value.decliningUser = true;
        await fetch(process.env.VUE_APP_API_URL + "users/" + userId + "/decline", { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            response.value.declineResponse = data.message
            processing.value.decliningUser = false
        })
        .catch(() => 
        response.value.declineResponse = "failed")
    }

    const BanUnban = async(userId, isBan) => {
        processing.value.approvingUser = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                active: isBan
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "users/" + userId + "/approve", requestOptions)
        .then(res => res.json())
        .then(data => {
            response.value.approveResponse = data.message
            processing.value.approvingUser = false
        })
        .catch(() => 
        response.value.approveResponse = "failed")
    }

    const HigherAccount = async(roleId, username, password, email, fname, mname, lname) =>{
        processing.value.createUser = true;
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roleId: roleId,
                username: username,
                password: password,
                email: email,
                fname: fname,
                mname: mname,
                lname: lname,
                approve: true,
                active: true,
                token: ""
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "auth/save", requestOptions)
        .then(res => res.json())
        .then(data => {
            response.value.createAccountResponse = data.message
            processing.value.createUser = false;
        })
        .catch(() => response.value.createAccountResponse = "failed")
    }

    return {
        values,
        processing,
        pagination,
        response,
        CountUsers,
        GetUserList,
        ApproveUser,
        DeclineUser,
        BanUnban,
        HigherAccount
    }
}