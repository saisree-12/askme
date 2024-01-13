import React from 'react'
import axios from 'axios';
import copy from 'clipboard-copy'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';


const History = () => {
  const location = useLocation();
    const [chat,setChat] = React.useState([]);
  const [question,setQuestion] = React.useState('');
  const [empty,setEmpty] = React.useState(true)
  const [loading,setLoading] = React.useState(false);

  const handleCopyToClipboard = (answer) => {
    copy(answer);
    toast.success('Answer copied to clipboard!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style:{
        color:'green',
      }
    });
  };

  React.useEffect(() => {
    const getHistory = async () => {
      await axios.post('http://localhost:5000/gethistory',{
        username:location.state.username
      })
      .then(response => {
        setChat(response.data)
      })
      .catch((err) => {
        return err;
      })
    }
    getHistory()
  },[])
  return (
    <>
    <div className='flex h-screen bg-[#164863] flex-wrap'>
      <div className='flex flex-col-reverse h-full md:px-20 py-5 w-full pb-6 fixed  top-0 '>
        <div className='h-full p-6 flex flex-col gap-5 overflow-y-scroll'>
        {chat.map((chats, index) => (
          <div key={index} className='flex items-center gap-4 rounded'>
            <img
              className='rounded-full p-3'
              width={70}
              height={70}
              src='https://img.freepik.com/premium-psd/character-avatar-3d-illustration_460336-729.jpg?w=900'
              alt='avatar'
            />
            <div className='flex flex-col w-full gap-5'>
              <p className='text-white bg-slate-500 p-3 font-semibold rounded'>{chats.question}</p>
              <div className='flex justify-between p-3 gap-3 rounded text-justify bg-gray-700'>
                <p className=' text-white font-semibold p-3 leading-loose rounded'>{chats.answer}</p>
                <span
                  className='cursor-pointer'
                  onClick={() => handleCopyToClipboard(chats.answer)}
                >
                  <HiOutlineClipboardCopy className='text-white text-xl '/>
                </span>
              </div>
            </div>
          </div>
        ))}
    </div> 
        <div className='md:px-8 px-3 flex items-center text-white'>
          <img src='/askme.png' width={300} height={300} alt='' className=''></img>
          <button className='bg-green-500 px-6 py-2 ml-auto focus:outline-none hover:bg-green-600 rounded shadow-2xl font-bold' onClick={() => {
            window.location.replace('/login');
            }} >Exit</button> 
        </div>
      </div> 
    </div>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  )
}

export default History