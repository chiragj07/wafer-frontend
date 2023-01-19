import React, { useState, useEffect} from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import { sendOtp } from '../functions/sendOTP'


export const PhoneVerification = () => {


    const [phoneOtp, setPhoneOtp] = useState('')

    const [user, setUser] = useState(null)

    const handleResend = async(e)=>{
      e.preventDefault();
      sendOtp(user&&user)
  }
    

    useEffect(()=>{
        
        const userLoggedIn = localStorage.getItem('userDetails');
        const isWaferEmailVerified = JSON.parse(localStorage.getItem('isWaferEmailVerified'))

        
        if(userLoggedIn){
            window.location.replace('/home')
            return
        }
        if(!isWaferEmailVerified){
            window.location.replace('/login');
            return
        }

        setUser(isWaferEmailVerified)
        
    },[])


const verifyPhone = async(e)=>{
      e.preventDefault();
      console.log(user)
      const body = {
          phone:user.phone,
          otp:phoneOtp,
          
          
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      try{
      const data = await axios.post(`${process.env.REACT_APP_URL}/user/verify/phone`, body, config )
      console.log(data)

      if(data && data.status === 200){
          if(data.message === 'expired'){
              window.alert('OTP Expired')
              localStorage.removeItem('isWaferEmailVerified')
              localStorage.removeItem('userDetails')
              window.location.href('/login')
              return
          }

          localStorage.setItem('userDetails', JSON.stringify(data))
          window.location.replace('/home')
          

      }
      else{
            window.alert('something went wrong')
      }
    }
    catch{
      window.alert("Some internal error")

    }
  }

    


  return (
    <div className="card-container">
          <div className='circle'></div>
          <div className='circle'></div>
           <h1>Verify Phone OTP</h1>  
            <form style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>

                
                <div className='input-holder' >
                <label htmlFor='phone-otp'>Enter Otp sent to your registered phone number</label>
                <input style={{marginTop:'50px'}} type="text" id="phone-otp" name="phone-otp" onChange={(e)=>setPhoneOtp(e.target.value)} value={phoneOtp}/>
                </div>
                
                
                <div className='button-holder'>
                <button onClick={verifyPhone} style={{width:'25%'}} >Verify OTP</button>
                <button onClick={handleResend} style={{width:'25%'}} >Resend OTP</button>
                
                </div>
            </form>
    </div>
  )
}


export default PhoneVerification