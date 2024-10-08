import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../../Context/AuthContext.jsx'

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const navigate = useNavigate()

    const { token } = useContext(AuthContext)

    const handleChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })

        // console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, data)

            toast.success("Your account has been registered")
            toast("Please log in using your new account", {
                icon: "ℹ"
            })

            navigate("/login")
        } catch (error) {
            const errors = error.response.data.errors

            if (errors.name) {
                errors.name.forEach(e => {
                    toast.error(e, {
                        duration: 2500
                    })
                });
            }

            if (errors.email) {
                errors.email.forEach(e => {
                    toast.error(e, {
                        duration: 2500
                    })
                });
            }

            if (errors.password) {
                errors.password.forEach(e => {
                    toast.error(e, {
                        duration: 2500
                    })
                });
            }
        }
    }


    return (
        <>
            {token ?
                <Navigate to={'/'} /> :
                <div className='h-screen font-serif w-screen flex items-center justify-end bg-gradient-to-br from-purple-950 to-pink-600'>
                    <div className='bg-slate-50 h-full px-10 md:px-32 flex items-center justify-center'>
                        <div className='flex items-center justify-center flex-col'>
                            <h1 className='text-2xl font-bold text-slate-900 text-center'>Register new account</h1>
                            <form className='mt-7 w-full gap-y-3 flex flex-col relative'>
                                <input onChange={handleChange} name='name' type="text" placeholder='Username' className='p-2 border-[2px] border-purple-800' />
                                <input onChange={handleChange} name='email' type="email" placeholder='Email' className='p-2 border-[2px] border-purple-800' />
                                <input onChange={handleChange} name='password' type="password" placeholder='Password' className='p-2 border-[2px] border-purple-800' />
                                <input onChange={handleChange} name='password_confirmation' type="password" placeholder='Confirm Password' className='p-2 border-[2px] border-purple-800' />

                                {/* <p className='text-red-600 text-sm absolute bottom-32'>Error message</p> */}

                                <button onClick={handleSubmit} type='submit' className='bg-purple-950 text-slate-50 font-semibold p-3 mt-7'>Register</button>
                                <p className='text-center mt-5'>Already have an account?
                                    <Link to={'/login'} className='ml-1 hover:underline text-purple-950'>
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Register