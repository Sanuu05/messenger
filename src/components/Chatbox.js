import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { additem, delitem, getallitems } from '../action/item'
import { delmsg, loadmsg, logout, sendmsg } from '../action/user'
import ScrollToBottom from 'react-scroll-to-bottom'
import Pusher from 'pusher-js'
import { NavLink } from 'react-router-dom'
import { IoMdSend, IoMdImage, IoIosClose } from 'react-icons/io'


function Chatbox({ userid }) {
    const msg = useSelector((state) => state.allmsg.allmsg)
    const postmsg = useSelector((state) => state.post.delemsg)
    const dispatch = useDispatch()
    const [displayimg, setdisplayimg] = useState()
    const [sentmsg, setsentmsg] = useState()
    const profilepic = (e) => {
        setpic(e.target.files[0])
        console.log('cvcvcv', e.target.files[0])
        const render = new FileReader()
        render.onload = () => {
            if (render.readyState === 2) {
                setdisplayimg(render.result)
            }

        }
        render.readAsDataURL(e.target.files[0])
    }
    const user = localStorage.getItem("user")

    const muser = JSON.parse(user)
    console.log("useaaar", muser)
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
        dispatch(loadmsg(userid))
    }, [userid, postmsg, dispatch, sentmsg])
    const [msgres, setmsgres] = useState()
    const [pic, setpic] = useState()
    console.log("pk", msg)

    const sender = localStorage.getItem('senduser_n')

    const submit = (e) => {
        e.preventDefault()
        if (pic) {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "sannu")
            fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                method: "post",
                body: data
            }).then(res =>
                res.json())
                .then(data => {
                    dispatch(sendmsg(msgres, userid, data.url))
                    setpic('')
                    setmsgres('')
                    setdisplayimg('')
                }).catch(err => console.log(err))
        } else {
            dispatch(sendmsg(msgres, userid))
            setmsgres('')
            setdisplayimg('')
        }

    }
    const cancel = () => {
        setdisplayimg('')
        setpic(null)
    }
    const mainuser = JSON.parse(sender)
    console.log("sender", msg)



    return (
        <div className="chatbox">
            <nav >
                <div class="nav-wrapper" style={{ backgroundColor: '#5D5B8D' }}>
                    <p class="brand-logo left "><img alt="pic" data-bs-toggle="modal" data-bs-target="#exampleModal1" src={mainuser ? mainuser.pic ? mainuser.pic : "https://britz.mcmaster.ca/images/nouserimage.gif/image" : null} className="avatar ml-2 mr-2" /><span style={{ fontSize: '12px' }}>{mainuser?.online ? <span style={{ color: "greenyellow", fontWeight: 'bold' }}>online</span> : "offline"}</span></p>
                    <ul id="nav-mobile" class="right ">
                        <li className="usern" style={{ color: 'white', textDecoration: 'none' }}><NavLink to={`/home/${userid}`} style={{ color: 'white', textDecoration: 'none' }} >{mainuser?.name}</NavLink></li>
                        {/* <li className="logoutl" ><a className="logout" href="/"  onClick={() => dispatch(logout())}>Logout</a></li> */}




                    </ul>
                </div>
            </nav>

            <div >
                <ScrollToBottom className=" chats">

                    {msg ? msg ?
                        msg?.msg?.map((val, index) => {
                            return <>{
                                val.text || val.pic ? <p className={val.sent === true || val.grpuser === muser._id ? " xx senduser1 shadow my-2" : "shadow senduser2 my-2"} onDoubleClick={() => dispatch(delmsg(val._id))}>


                                    {val.pic ?
                                        <img src={val.pic} alt="pic" className="textimg" /> : null
                                    }
                                    {
                                        val.text ? <p className={val.sent === true ? "xx senduser shadow  pp my-2" : "shadow pp  m-1 my-2"}> {val.text}</p> : null
                                    }

                                </p> : null
                            }
                            </>
                        }) : null : null
                    }

                </ScrollToBottom>
            </div>
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-4 leftm">
                                    <img alt="pic" data-bs-toggle="modal" data-bs-target="#exampleModal" src={mainuser ? mainuser.pic ? mainuser.pic : "https://britz.mcmaster.ca/images/nouserimage.gif/image" : null} className="img-fluid" />
                                    
                                </div>
                                <div className="col-12 col-md-8">
                                    <h4>Name:<span>{mainuser ? mainuser.name : null}</span></h4>
                                    <h4>Email:<span>{mainuser ? mainuser.email : null}</span></h4>

                                </div>
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>
            <div className="msg_input">
                <form onSubmit={submit}><div className="forminput">
                    <input for="fileclk" type="text" placeholder="type your message" value={msgres} onChange={(e) => setmsgres(e.target.value)} />
                    <label for="fileclk"><IoMdImage /></label>

                    <input type="file" style={{ display: "none" }} id="fileclk"
                        onChange={profilepic} />

                    <button ><IoMdSend /></button>
                </div>


                </form>
            </div>
            <div className="displayimg">
                {
                    displayimg ? <> <p className="shadow"><img src={displayimg} alt="kk" /></p> <IoIosClose className="cancell" onClick={cancel} /> </> : null
                }

            </div>
        </div>
    )
}

export default Chatbox
