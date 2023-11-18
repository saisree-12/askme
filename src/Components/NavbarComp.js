import {FiMenu} from 'react-icons/fi'
import { useState,useEffect } from "react"
import { AiFillCloseCircle } from "react-icons/ai"


const NavbarComp = () => {
    sessionStorage.setItem('logged', true) 
    const [click,setClick] = useState(false);
    const Menu = (e) => {
        let list = document.querySelector('ul');
        if(click){
            list.classList.add('top-[300px]');
            // list.classList.add('left-[0px]');
            list.classList.add('opacity-100');
        }
        else{
            list.classList.remove('top-[60px]');
            // list.classList.remove('left-[0px]');
            list.classList.remove('opacity-100');
        }
        setClick(!click);
    }   
    
return ( 
    <>
    <div>
        <nav className="bg-[#164863] p-9 md:px-9 px-2  shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold font-[poppins] cursor-pointer text-white">
                    <a href={'/'}>
                        <img
                            src={'/askme.png'}
                            width={80}
                            height={50}
                            alt="Logo"
                            className="inline h-14 "
                        />
                    </a>
                </span>
                <span onClick={Menu} className="text-3xl text-white cursor-pointer mx-2 md:hidden block">
                    {click ? <AiFillCloseCircle /> : <FiMenu className=""/>}
                </span>     
            </div>  
            <ul 
            className="md:flex md:items-center z-[-1] md:z-auto md:static 
            absolute md:opacity-100 opacity-0 top-[-400px] md:py-0 py-6 md:pl-0 pl-7  left-0 
            transition-all ease-in duration-700 text-white md:w-auto w-full text-xl"
            > 
                { !sessionStorage.getItem('logged') ?
                    <li className="mx-4 my-6 md:my-0 ">
                    <a href="/SignUp" className="text-md font-bold hover:text-green-500 duration-500">SignUp</a>
                </li>   : 
                <></>
                }
                { !sessionStorage.getItem('logged') ? 
                    <li className="mx-4 my-6 md:my-0">
                        <a href="/login" onClick={(e) => sessionStorage.setItem('logged',true)} className="text-md font-bold hover:text-green-500 duration-500">LogIn</a>
                    </li>  :
                    <li className="mx-4 my-6 md:my-0">
                        <a href="/" onClick={(e) => sessionStorage.setItem('logged',false)} className="text-md font-bold hover:text-green-500 duration-500">LogOut</a>
                    </li> 
                } 
                {  !sessionStorage.getItem('logged') ? 
                    <></> :
                    <li className="mx-4 my-6 md:my-0">
                        <a href="/askme" className="text-md font-bold hover:text-green-500 duration-500">Create</a>
                    </li> 
                }
            </ul>
        </nav>
    </div>
    </>
)} 
export default NavbarComp  
