import React from 'react'
import axios from 'axios';

const Login = () => {
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup',{username:username,password:password}).then((response) => {
            console.log(response)
            window.location.replace('/login')
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
        <h2 class="text-2xl text-center text-gray-200 mb-8 font-bold">SignUp</h2>
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

          <button type='submit' className='bg-green-500 w-full px-6 py-2 mt-8 ml-auto focus:outline-none hover:bg-green-600 rounded shadow-2xl font-bold text-white'>Register</button>
          
          <a href='/login'>
            <p className='text-white text-center pt-10 font-bold'>Already Have an account ?</p>
          </a>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login