import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'

export default function App(){

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) =>{
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .catch(() =>{
      alert("User not fount");
    })
    .finally(() =>{
      setLoading(false);
    })
  },[])

  return !loading ? (
    <>
        <div className="min-h-screen flex flex-wrap bg-gray-400 content-between">
            <div className="w-full">
              <Header />
                  <main>
                      HELLO THERE!!!
                  </main>
              <Footer />
            </div> 
        </div>
    </>
  ) : (
    <>
       <h1>Skeleton Loading...</h1> 
    </>
  )

  
}