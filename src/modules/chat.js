import { ref } from 'vue'

export const Chat = () => {
    const chatProcessing = ref({
        gettingData: false,
        saveData: false
    })

    const chatValues = ref({
        chatHistories: []
    })

    const chatResponse = ref({
        sendResponse: "",
        getResponse: ""
    })

    const GetHistory = async (id) => {
        chatProcessing.value.gettingData = true
        await fetch(process.env.VUE_APP_API_URL + "chat/" + id + "/browse")
        .then(res => res.json())
        .then(data => {
            chatResponse.value.getResponse = data.message
            chatValues.value.chatHistories = data.data
            chatProcessing.value.gettingData = false
        })
        .catch(() => {
            chatResponse.value.getResponse = "failed"
            chatProcessing.value.gettingData = false
        })
    }

    const SendMessage = async(id, data) => {
        chatProcessing.value.saveData = true
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "chat/" + id + "/send", requestOptions)
        .then(res => res.json())
        .then(data => {
            chatResponse.value.sendResponse = data.message
            chatProcessing.value.saveData = false
        })
        .catch(() => {
            chatResponse.value.sendResponse = "failed"
            chatProcessing.value.saveData = false
        })
    }

    return{
        chatProcessing,
        chatValues,
        chatResponse,
        GetHistory,
        SendMessage
    }
}