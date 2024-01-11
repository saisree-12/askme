import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from 'clipboard-copy'
import { HiOutlineClipboardCopy } from 'react-icons/hi'

const Askme = () => {
    const [chat,setChat] = React.useState([]);
  const [question,setQuestion] = React.useState('');
  const [empty,setEmpty] = React.useState(true)
  const [loading,setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const options = {
    //   method: 'POST',
    //   url: 'https://chatgpt53.p.rapidapi.com/',
    //   headers: {
    //     'content-type': 'application/json',
    //     'X-RapidAPI-Key': 'af7e7228d0mshe37dd20a990441bp167948jsn8a253b5f28b4',
    //     'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
    //   },
    //   data: {
    //     messages: [
    //       {
    //         role: 'user',
    //         content: `${question}`
    //       }
    //     ],
    //     temperature: 1
    //   }
    // };

    const options = {
      method: 'POST',
      url: 'https://chatgpt-openai1.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'af7e7228d0mshe37dd20a990441bp167948jsn8a253b5f28b4',
        'X-RapidAPI-Host': 'chatgpt-openai1.p.rapidapi.com'
      },
      data: {
        query: `${question}`
      }
    };
    
    try {
      if (question) {
        const response = await axios.request(options);
        console.log(response)
        if(response){
          setChat(prevChat => [...prevChat, { question: `${question}`, answer: response.data.response }]);
          setQuestion('');
          await new Promise((resolve) => setTimeout(resolve,1000));
          setLoading(false);
        }
      } 
      else {
        toast.error('Please enter the question',{
          style: {
            color: 'red',
          },
        });
        setLoading(false)
      } 
    } catch (error) {
      toast.error('Please Try Again Later...',{
        style: {
          color: 'red',
        },
      });
      setLoading(false)
      console.error("Error:", error.response ? error.response.status : "Unknown", error.response ? error.response.data : "No response data");
    }
  }
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

  const [selectedFile, setSelectedFile] = React.useState(null);

  const fileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const config =  {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }

      axios.post('http://localhost:5000/uploaded', formData, config)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        }) 
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return ( 
    <> 
    <div className='flex h-screen bg-[#164863] flex-wrap'>
      <div className='flex flex-col-reverse h-full md:px-20 py-5 w-full pb-6 fixed  top-0 '>
        <form className='' onSubmit={handleSubmit}>
          <div className='flex w-full p-3 px-6 gap-10 '>
            <input className='w-full py-3 rounded px-5 font-semibold text-lg outline-none' autoFocus type='text' placeholder='Start Typing...'  onChange={(e) => {setQuestion(e.target.value);}}></input>
            <button type='submit' className="text-white bg-green-500 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg shadow-2xl font-bold">
            {loading?'Fetching' : 'Send'}</button>
          </div>
        </form> 
          <div className='flex w-full p-3 px-6 gap-10 '>
            {/* <button type='submit' className="text-white bg-green-500 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg shadow-2xl font-bold">
            {loading?'Fetching' : 'Send'}</button> */}
            
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">PDF, TXT</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onInput={fileUpload}/>
                </label>
            </div> 

          </div>  
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
          <img src='/askme.png' width={300} height={300} className=''></img>
          <button className='bg-green-500 px-6 py-2 ml-auto focus:outline-none hover:bg-green-600 rounded shadow-2xl font-bold' onClick={() => {
            toast.success("Signing Off.. hits us up later✌️")
            window.location.replace('/login');
            }} >Exit</button>
        </div>
      </div>
    </div>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default Askme