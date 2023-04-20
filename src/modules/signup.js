import { ref } from 'vue'

export const Signup = () => {
    const fields = ref({
        roleId: "",
        username: "",
        password: "",
        fname: "",
        mname: "",
        lname: "",
        email: "",
        display_name: "",
        landline: "",
        cellphone: "",
        address: "",
        regularBeds: "",
        covidBeds: "",
        variance: [],
    })

    const status = ref({
        type: "",
        message: ""
    })

    const SaveData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roleId: fields.value.roleId,
                username: fields.value.username,
                password: fields.value.password,
                fname: fields.value.fname,
                mname: fields.value.mname,
                lname: fields.value.lname,
                email: fields.value.email,
                display_name: fields.value.display_name,
                landline: fields.value.landline,
                cellphone: fields.value.cellphone,
                address: fields.value.address,
                regularBeds: fields.value.regularBeds,
                covidBeds: fields.value.covidBeds,
                variance: fields.value.variance,
            })
        }
        try{
            await fetch(process.env.VUE_APP_API_URL + "auth/createuser", requestOptions)
            .then(response => { 
                return response.json();
            })
            .then(data => {
                if (data.message === "success"){
                    status.value.type = "success"
                    status.value.message = "Successfully Signed Up! Thank you for choosing us!"
                }
                else if (data.message === "failed"){
                    status.value.type = "failed"
                    status.value.message = data.error
                }
                else if (data.message === "bad-request"){
                    status.value.type = "failed"
                    status.value.message = data.error
                }
            })
            .catch(err => {
                status.value.type = "failed"
                status.value.message = err
            }) 
        }
        catch(err){
            
            status.value.type = "failed"
            status.value.message = err
        }
    }

    return {
        fields,
        status,
        SaveData
    }
}