import React, { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../config/server'
import {useDispatch} from 'react-redux'
import{setUserData} from '../redux/slices/userSlice'
function getCurrentUser() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchUser = async()=>{
       try {
         const result  = await axios(`${serverUrl}/api,user/getCurrentUser`,{withCredentials : true})
        dispatch(setUserData(result.data))

       } catch (error) {
         console.log(error);
        dispatch(setUserData(null))

       }
    }
  },[])
}

export default getCurrentUser