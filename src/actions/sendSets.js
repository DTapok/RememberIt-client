import axios from "axios";
import { API_URL } from "../config"
export function sendSets(title, category, cards) {
    return async dispatch => {
        try {

            await axios.post(`${API_URL}/api/setCards/`, { category, name: title },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
            for (let index = 0; index < cards.length; index++) {


                if (typeof (cards[index].front) == "string") {
                    await axios.post(`${API_URL}/api/setCards/uploadcard`, { front: cards[index].front, back: cards[index].back, setName: title },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }
                        })
                } else {
                    const data = new FormData()
                    data.append("file", cards[index].front)
                    data.append("back", cards[index].back)
                    data.append("setName", title)
                    //console.log(data.get("setName"))
                    await axios.post(`${API_URL}/api/setCards/uploadcardImg`, data,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }
                        })
                }
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

