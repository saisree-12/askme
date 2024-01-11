import React from 'react'
import NavbarComp from './NavbarComp'
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <section class="text-gray-600 body-font h-screen flex justify-center items-center bg-[#164863]">
        <div class="container py-24 flex  bg-[rgba(0,0,0,.2)] rounded-2xl items-center justify-center flex-col">
            <img class="lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded" alt="hero" width={300} height={300} src="/askme.png"></img>
            <div class="text-center lg:w-2/3 w-full">
            {/* <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ">Microdosing synth tattooed vexillologist</h1> */}
            <p class="mb-8 leading-relaxed text-justify text-white font-semibold">your portal to a world of intelligent conversations and 
            personalized insights! Elevate your chat experience with AskMe, where each interaction is powered by advanced language models,
            creating dynamic and engaging conversations. Explore a seamless interface designed for effortless navigation, connecting you
             to a chatbot that adapts to your preferences over time. Whether you're seeking answers, delving into deep discussions, or 
             simply enjoying casual chit-chat, AskMe is your virtual companion for curiosity and discovery. Unleash the future of 
             conversations – join AskMe today and let your inquiries spark insightful exchanges.</p>
            <div class="flex justify-center p-4">
                <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded font-bold text-lg" onClick={() => window.location.replace('/signup')}>SignUp</button>
                {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded font-bold text-lg" onClick={() => window.location.replace('/login')}>LogIn</button> */}
                <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded font-bold text-lg" onClick={() => loginWithRedirect()}>LogIn</button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Landing