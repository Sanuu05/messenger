import React, { useEffect } from 'react'
import Chatbox from './Chatbox'
import Username from './Username'
import {useDispatch} from 'react-redux'
import { getallitems } from '../../action/item'
import { useParams } from 'react-router-dom'
import {  online } from '../../action/user'

function Home() {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(online())
        // dispatch(offline());
       dispatch(getallitems())
    },[dispatch])
    const {userid} = useParams()
    // console.log(userid)
    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="col-md-4 col-4 p-0">
                    <Username userid={userid} />
                </div>
                <div className=" col-md-8  col-8 p-0 m-0">
                    {/* <h1>jhjhjh jhjhhjh</h1> */}
                    <Chatbox userid={userid} />
                </div>
            </div>


        </div>

    )
}

export default Home
