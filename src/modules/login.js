import { ref } from "vue";

export const Login = () => {
    const fields = ref({
        username: "",
        password: ""
    })

    const response = ref({
        type: "",
        message: "",
        role: "",
        data: {}
    })

    const Validate = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: fields.value.username,
                password: fields.value.password
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "auth/login", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            if (data.message === "success"){
                localStorage.setItem("userCreds", JSON.stringify(data.data))
                response.value.type = "success"
                response.value.message = "Welcome " + data.data.fname
                response.value.role = data.data.roleId._id
            }
            else if (data.message === "failed"){
                response.value.type = "failed"
                response.value.message = data.error
            }
            else if (data.message === "bad-request"){
                response.value.type = "failed"
                response.value.message = data.error
            }
        })
        .catch(err => {
            response.value.type = "failed"
            response.value.message = err
        })
    }

    return { fields, response, Validate}
}