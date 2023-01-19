import axios from 'axios'

export const sendOtp = async (user)=>{
    
    const body = {
        phone:user.phone
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try{
    const data = await axios.post(`${process.env.REACT_APP_URL}/user/send-otp-phone`, body, config )
    console.log(data)
  }
  catch(err){
    //window.alert("Internal Error")
    console.log(err)

  }

}

