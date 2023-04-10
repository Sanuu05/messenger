import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {app} from '../firebase'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { loguser } from '../action/user'
import M from 'materialize-css'
import logo from './img/logo.png'

function Login() {
    const[data, setdata] = useState({
        email:"", password:"" 
   })
   const history = useHistory()
   const err = useSelector((state) => state.error.msg)
   const succ = useSelector((state) => state.user.token)
   const dispatch = useDispatch()
   const auth = getAuth(app)
// const auth =''
   const postData=()=>{
    if (data?.email && data?.password) {
        // setloading(true)
        // console.log(loading)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // sendEmailVerification(user)
                // ...
                console.log(userCredential.user?.emailVerified)
                if (userCredential?.user?.emailVerified) {
                    // toast.success('Login sucessful')
                    // window.location.reload()
                    // alert('ehlloo')
                    dispatch(loguser({ email: userCredential.user.email }))
                    // dispatch(loadUser())
                    // setloading(false)


                } else {
                    // toast.error("Email is not verified")
                    // alert(error?.message)
                    // setloading(false)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // setloading(false)
                // ..
                alert(error?.message)
                // toast.error("Check details")
                // console.log
            });

    } else {
        // toast.error('Enter all the field')
    }
    // dispatch(loguser({ email: data.email, password: data?.password }))
    // dispatch(loadUser())

   }
//    const auth = getAuth()
   useEffect(()=>{
       
       if(succ){
           M.toast({html:"Login Sucessfully",classes:"#00e676 green accent-3"})
           return history.push('/home/ll')
       }
       if(err){
          return M.toast({html:err,classes:"#d32f2f red darken-2"})

       }
   },[err,succ,history])
    return (
        
        <div className="mycard">
            <div className="card auth_card ">
            <img src={logo} alt="pic" style={{
                        width:"100px",marginBottom:'50px'
                    }} />
              
                <input
                    type="text"
                    placeholder="email"
                    value={data.email}
                    onChange={(e)=>setdata({...data,email:e.target.value})}

                             
                />
                <input
                    type="password"
                    placeholder="password"
                    value={data.password}
                    onChange={(e)=>setdata({...data,password:e.target.value})}
                                    
                />
               
                
                    

                
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData}>Login
            </button >
                <h5>
                    <Link to='/signup'>Dont have an acount ?</Link>
                </h5>


            </div>
        </div>
    )
}

export default Login
