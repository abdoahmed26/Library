import axios from "axios";

export const checkout = (id) => {
    axios.post(`https://ecommerce-api-hlp7.onrender.com/api/order/create-session/${id}`,
    //   `http://localhost:5000/api/order/create-session/${id}`,
        {
            successUrl: location.origin + "/#/order-done",
            failUrl: location.origin + "/#/cart",
        },
        {
            headers:{
                Authorization:`Bearer ${localStorage.token}`,
                // Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzJjN2I0ZTRkZGZkNmQzMTk0YTExZSIsImlhdCI6MTcxNTAxODk1MywiZXhwIjoxNzE1MTkxNzUzfQ.EBskF-c41nQVowT-74_OQWEwQoZKOhdPbjxxNmKL7Zg`,
            },
            
        }
    ).then(res=>{
        console.log(res)
        location.replace(res.data.data.url)
    })
    .catch(()=>{
    })
};