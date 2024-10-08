import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext.jsx'

function Login() {
    const [data, setData] = useState({
        email: '',
        password: "",
    })

    const navigate = useNavigate()

    const { login, token } = useContext(AuthContext)

    const handleChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const status = await login(data)
        if (status === 200) {
            navigate("/")
        }
    }


    return (
        <>
            {token ?
                <Navigate to={'/'} /> :
                <div className='h-screen font-serif w-screen flex items-center justify-end bg-gradient-to-br from-purple-950 to-pink-600'>
                    <div className='bg-slate-50 h-full px-10 md:px-32 flex items-center justify-center'>
                        <div className='flex items-center justify-center flex-col'>
                            <h1 className='text-2xl font-bold text-slate-900 text-center'>Login to your account</h1>
                            <form className='mt-7 w-full gap-y-3 flex flex-col relative'>
                                <input onChange={handleChange} name='email' type="email" placeholder='Email' className='p-2 border-[2px] border-purple-800' />
                                <input onChange={handleChange} name='password' type="password" placeholder='Password' className='p-2 border-[2px] border-purple-800' />


                                <button onClick={handleSubmit} type='submit' className='bg-purple-950 text-slate-50 font-semibold p-3 mt-7'>Login</button>
                                <p className='text-center mt-5'>Don't have an account?
                                    <Link to={'/register'} className='ml-1 hover:underline text-purple-950'>
                                        Register
                                    </Link>
                                </p>
                                <div className='text-center text-sm text-slate-500 mt-16'>
                                    <p>Demo</p>
                                    <p>Email : admin@email.com</p>
                                    <p>Password : 12345678</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Login