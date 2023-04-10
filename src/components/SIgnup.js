import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { userSign } from '../action/user'
import {app} from '../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import M from 'materialize-css'
import logo from './img/logo.png'
function SIgnup() {
    const [data, setdata] = useState({
        name:"", email:"", password:"",cpassword:""
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const err = useSelector((state) => state.error.msg)
    const succ = useSelector((state) => state.user.signin)
    const auth = getAuth(app)
    const submit = ()=>{
        // dispatch(userSign(data))
        if(data.email && data.name && data.cpassword && data.password){
            if (data.password === data.cpassword) {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        sendEmailVerification(user)
                        // dispatch(userNormalSign(userdata))
                        dispatch(userSign({email:data.email.toLowerCase(),name:data.name}))
                        // ...
                        console.log(userCredential)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        alert(error?.message)
                        // toast.error('Email already in use')
                    });
    
            }
            else{
                alert('Enter same password')
            }
        }else{
            alert('Fill All field')
        }

    }
    useEffect(()=>{
        if (succ) {


            M.toast({ html: "Register Sucessfully", classes: "#00e676 green accent-3" })
            return history.push('/')
        }
        if (err) {
            return M.toast({ html: err, classes: "#d32f2f red darken-2" })

        }
    },[err, succ, history])
    return (
        
        <div className="mycard">
            <div className="card auth_card ">
            <img src={logo} alt="pic" style={{
                        width:"200px"
                    }} />
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={data.name}
                    onChange={(e)=>setdata({...data, name:e.target.value})}
                                        />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={data.email}
                    onChange={(e)=>setdata({...data, email:e.target.value})}
                             
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={data.password}
                    onChange={(e)=>setdata({...data, password:e.target.value})}
                                    
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    name="cpassword"
                    value={data.cpassword}
                    onChange={(e)=>setdata({...data, cpassword:e.target.value})}
                    
                    
                />
                
                    

                
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={submit}>Signup
            </button >
                <h5>
                    <Link to='/'>Already have an acount ?</Link>
                </h5>


            </div>
        </div>
    )
}

export default SIgnup