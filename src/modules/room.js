import { ref } from 'vue'

export const Room = () =>{
    const roomValues = ref({
        roomHistory: [],
        createdRoom: []
    })

    const roomProcessing = ref({
        savingData: false,
        gettingData: false
    })

    const roomPagination = ref({
        currentPage: 0,
        pageLimit: 10,
        totalPages: 1
    })

    const roomResponse = ref({
        saveResponse: "",
    })

    const GetRooms = async () => {
        roomProcessing.value.gettingData = true

        await fetch(process.env.VUE_APP_API_URL + "room/browse?page=" + roomPagination.value.currentPage + 
        "&limit=" + roomPagination.value.pageLimit)
        .then(res => res.json())
        .then(data => {
            roomPagination.value.totalPages = data.pages
            roomValues.value.roomHistory = data.data
            roomProcessing.value.gettingData = false
        })
        .catch(() => {
            roomProcessing.value.gettingData = false;
        })
    }

    const CreateRoom = async (data) => {
        roomProcessing.value.savingData = true
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            })
        }
        await fetch(process.env.VUE_APP_API_URL + "room/save", requestOptions)
        .then(res => res.json())
        .then(data => {
            roomValues.value.createdRoom = data.data
            roomResponse.value.saveResponse = data.message
            roomProcessing.value.savingData = false;
        })
        .catch(() => {
            roomProcessing.value.savingData = false;
            roomResponse.value.saveResponse = "failed"
        })
    }

    const UpdateRoom = async (id, handlerName, roomStatus) =>{
        roomProcessing.value.savingData = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: roomStatus,
                handler: handlerName
            })
        }

        await fetch(process.env.VUE_APP_API_URL + "room/" + id +"/update", requestOptions)
        .then(res => res.json())
        .then(data => {
            roomResponse.value.saveResponse = data.message
            roomProcessing.value.savingData = false;
        })
        .catch(() => {
            roomProcessing.value.savingData = false;
            roomResponse.value.saveResponse = "failed"
        })
    }

    return{
        roomValues,
        roomProcessing,
        roomPagination,
        roomResponse,
        GetRooms,
        CreateRoom,
        UpdateRoom
    }
}