import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editprofilepic, getalluser, logout,loadUser } from '../action/user'
import { NavLink } from 'react-router-dom'
import Pusher from 'pusher-js'
function Username() {
    const dispatch = useDispatch()
    const [username, setusername] = useState()
    const[propic,setpropic]=useState()
    const picsucc = useSelector((state => state.post.updatepic))
    const[click,setclick] = useState()
    const [sentmsg, setsentmsg] = useState()
    
    console.log("click",click)
    useEffect(() => {
        const pusher = new Pusher('dd6db006f4dad11b7fe7', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (data) {
            setsentmsg(JSON.stringify(data))


        });
    }, [])
    useEffect(() => {
        const pusher = new Pusher('dd6db006f4dad11b7fe7', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('username');
        channel.bind('insertuser', function (data) {
            setusername(JSON.stringify(data))


        });
    }, [])
    useEffect(() => {
        dispatch(getalluser())
        dispatch(loadUser())
        
    }, [dispatch, username,picsucc,sentmsg])
    const user = useSelector((state => state.all.alluser))
    const mainuser = useSelector((state => state.user.user.user))
    const alluser = useSelector((state => state.user?.user?.alluser))
    const [muser,setmuser] = useState(alluser)
    // const picsucc = useSelector((state => state.post.updatepic))
    console.log("mm",alluser)
    const tok = localStorage.getItem("user")
    const token = JSON.parse(tok)
    // console.log("ll1",token) 
    
    // console.log(userdata.concat(grpdata))
    
    const [slt,setslt] = useState('chat')
    console.log("uus",user.type)
    const updatepic=()=>{
        if (propic) {
            const data = new FormData()
            data.append("file", propic)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "sannu")
            fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                method: "post",
                body: data
            }).then(res =>
                res.json())
                .then(data => {
                    // alert(data.url)
                    dispatch(editprofilepic({profilePic:data.url}))
                    // dispatch(sendmsg(msgres, userid, data.url))
                    // setpic('')
                    // setmsgres('')
                    propic(null)
                }).catch(err => console.log(err))
        }
    }
    
    return (
        <div className="username">
            <div className="upper mb-2">
                <div className="top_username d-flex justify-content-between pt-3 align-content-center">
                    <div className="top_left  ">
                        <img className="malogo" src="https://www.aurigait.com/resources/files/2017/01/256-256-c8b6cbadb620f8b3f588bf53464c8ab9.png" alt="pic" style={{
                        width:"40px"
                    }} />
                        <img alt="pic" data-bs-toggle="modal" data-bs-target="#exampleModal" src={mainuser?mainuser.profilePic?mainuser.profilePic:"https://britz.mcmaster.ca/images/nouserimage.gif/image":null} className="avatar ml-2 mr-2" />
                        <p className="font-weight-bolder text-capitalize mt-3"><span style={{fontSize:"20px"}}>{token.name}</span></p>
                        
                    </div>
                    <div className="top_right pr-5">
                        <a className="logout" href="/"  onClick={() => dispatch(logout())}>Logout</a>
                    </div>

                </div>
                <div className="search">
                </div>

            </div>
            <div className='slt' style={{display:'flex',justifyContent:'space-evenly',flexDirection:'row',marginBottom:50}}>
                <button style={{width:'40%'}} className={slt==="chat"?"active":null} onClick={()=>{
                    setmuser(alluser)
                    setslt('chat')
                }}> Chats</button>
                <button style={{width:'40%'}} className={slt==="all"?"active":null} onClick={()=>{
                    setmuser(user)
                    setslt('all')
                }}>All Users</button>
            </div>
            { muser ?
                muser.map((val, index) => {
                    const sendmain= JSON.stringify({name:val.name,email:val.email,pic:val.profilePic?val.profilePic:"",online:val?.online})
                    return <NavLink className={val._id === token._id ? "navlink" : "text-decoration-none"} to={`/home/${val._id}`} onClick={() => {
                        localStorage.setItem("senduser_n",sendmain)
                        }}>
                        <div className={index===click?"user ulink mb-2 d-flex text-decoration-none ":"user  mb-2 d-flex text-decoration-none " }  onClick={()=>setclick(index)}>
                            <img alt="pix" src={val.profilePic?val.profilePic:"https://britz.mcmaster.ca/images/nouserimage.gif/image"} className="avatar ml-2 mr-2" />
                            <h2 style={{color:"white"}} >{val.name}</h2>
                        </div>
                    </NavLink>

                }) : null
            }
          










            
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="row">
            <div className="col-12 col-md-4 leftm">
            <img alt="pic" data-bs-toggle="modal" data-bs-target="#exampleModal" src={mainuser?mainuser.profilePic?mainuser.profilePic:"https://britz.mcmaster.ca/images/nouserimage.gif/image":null} className="img-fluid" />
                {/* <button  >Edit Profile</button> */}
                <label for="edit" className="shadow">Update Profile</label>
                <input type="file" id="edit"  onChange={(e)=>setpropic(e.target.files[0])}/>
                {
                    propic?<button onClick={updatepic}>Update</button>:null
                }
            </div>
            <div className="col-12 col-md-8">
                <h4>Name:<span>{mainuser?mainuser.name:null}</span></h4>
                <h4>Email:<span>{mainuser? mainuser.email:null}</span></h4>

            </div>
        </div>
      </div>
    </div>
  </div>
</div>


        </div>
    )
}

export default Username
