import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup',{username:username,password:password}).then((res) => {
            if(res.data.flag)
                window.location.replace('/askme')
            else
            toast.error('Please Try Again Later...',{
                style: {
                  color: 'red',
                },
              });
        }) 
    }
  return (
    <>
    <div class="w-full h-screen flex items-center justify-center bg-[#164863]">
      <form class="w-full md:w-1/3 rounded-lg" onSubmit={handleSubmit}>
        <div class="flex font-bold justify-center">
          <img class="mb-3" height={300} width={300} src="/askme.png" />
        </div>
        <div class="px-12 py-20 rounded bg-[rgba(0,0,0,.2)]">
        <h2 class="text-2xl text-center text-gray-200 mb-8 font-bold">Login</h2>
          <div class="w-full mb-10">
            <div class="flex items-center">
              <input
                type="text"
                placeholder="Username"
                class="
                  w-full
                  border
                  rounded
                  px-3
                  py-2
                  text-gray-700
                  focus:outline-none
                "
                onChange={(e) => {setUsername(e.target.value)}}
              />
            </div>
          </div>
          <div class="w-full mb-5">
            <div class="flex items-center">
              <input
                type="password"
                placeholder="Password"
                class="
                  w-full
                  border
                  rounded
                  px-3
                  py-2
                  text-gray-700
                  focus:outline-none
                "
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
          </div>

          <button type='submit' className='bg-green-500 w-full px-6 py-2 mt-8 ml-auto focus:outline-none hover:bg-green-600 rounded shadow-2xl font-bold text-white'>Login</button>

          <a href='/'>
            <p className='text-white text-center pt-10 font-bold'>New User ? SignUp</p>
          </a>
        </div>
      </form>
    </div>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  )
}

export default Login 