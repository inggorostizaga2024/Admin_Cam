import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Streams from "./Streams";
import {Input} from "antd";
 import { useNavigate } from "react-router-dom";
import axios from "axios";

import md5 from "md5";

function login(){

        const navigate = useNavigate();

        const [Username, setUsername] = useState('');
        const [Password, setPassword] = useState('');




        const handleUsername = (e) => {
                setUsername(e.target.value)
        }

        const handlePassword = (e) => {
                setPassword(e.target.value)
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        console.log('Username', Username);
        console.log('Password:', Password);
        // Reset form fields
     //   setUsername('');
     //   setPassword('');
        const hashedPassword = md5(Password);


        fetch("http://137.184.11.27:8000/api/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({username:Username,password: md5(Password)})
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.code === 200) {
                    console.log(data.data.token);
                    sessionStorage.setItem('token', data.data.token);
                    navigate('/')
                }
            })
            .catch((e) => {
                console.log("Oops, error" + e);
            });




        if(Username === 'Admin' && Password === '12345678'){
            navigate('/')
        }

    };

    return (

        <div className="w-100 ">


            <div className="w-4/12 p-5 drop-shadow-lg mx-auto my-56 bg-white shadow rounded">

                <div className="">
                    <img className="mx-auto" src='src/images/logo.png' />
                </div>


                <form>
                    <label className="text-xs"> Username:
                        <Input type="text" name="Name" required value={Username} onChange={handleUsername}/>
                    </label>
                    <label className="text-xs"> Password:
                        <Input type="Password" name="Password" required value={Password} onChange={handlePassword}/>
                    </label>
                    <button onClick={handleSubmit} className="w-11/12 flex mx-auto  mt-6 btn bg-indigo-500 hover:bg-indigo-600 text-white">Login</button>
                </form>

            </div>

        </div>

    );

}

export default login;
