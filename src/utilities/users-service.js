import axios from 'axios'
 const BASE_URL = 'http://localhost:9090/api/v1/users'
 export const login = async credentials =>{
 try {
     const token = await axios.post(BASE_URL+'/login', credentials) 
   //   console.log(token.data)
     //Persist the token using window local storage
     // setItem() first arg is the property name and the second
     // arg is  the value
     localStorage.setItem('token',token.data)
     return getUser()
}
 catch (e) {
    console.log(e)
 }
 }
 export const getToken = ()=>{
   const token =localStorage.getItem('token')
   if(!token) return null
   // console.log('grapping token',token)
   const payload = JSON.parse(atob(token.split('.')[1]))
 
   if(payload.exp < Date.now()/1000){
      localStorage.removeItem('token')
      return null
   }
   // if token is not expired , we will return the token
   return token
}

export const getUser =()=>{
   const token = getToken()

   return   JSON.parse(atob(token.split('.')[1])).user 
}
export const getUserId = ()=>{
   const token = getToken()
   return  token ? JSON.parse(atob(token.split('.')[1])).user._id : null


}

const id = getUserId()

export const logOut = ()=>{
   localStorage.removeItem('token')
   
}

export const userOmg = async ()=>{
   try {
      const res = await axios.get(BASE_URL+'/'+id)
      return res

   } catch (e) {
      console.log(e)
      
   }
}


 export const updateUserBalance = async (newB, income , expences)=>{
    try {
      // console.log(newB,'in user update')
     let newUser = userOmg()
      newUser.balance = newB
      newUser.income = income
      newUser.expences=expences
      const res  = await axios.put(BASE_URL+'/'+ id,newUser)

       return res
      
 
    } catch (e) {
     console.log(e)
       }
 }
//  export const getBalance =async()=>{
//    try {
//       const myUser= await axios.get(BASE_URL+'/'+id)
//      console.log(myUser.data.balance,'balance')
//       // return myUser.data

//    } catch (e) {
//      console.log(e) 
//    }
//  }

export const signup = async (newUser)=>{
try {
   newUser.balance=0
   newUser.income=0
   newUser.expences=0
   const res = await axios.post(BASE_URL+'/',newUser)
 return res
} catch (e) {
   console.log(e)
}}