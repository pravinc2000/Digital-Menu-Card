import axios from 'axios'
import { useState ,useEffect} from 'react'
import Crd from './Crd';

function Dashboard() {

   const [data,setData]=useState([])
     function cntapi(){
      axios.get("http://localhost:3000/menucard")
      .then(response=>{
        
        console.log(response.data)
        let ar=response.data.menu
        setData(ar)
        console.log(ar)
      })
     }

     useEffect(()=>{ //onload()
      cntapi();
       },[])//
    return(
      <>
      <center>
      <Crd/>
        <div class="mt-4 p-5  text-white rounded">
  <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Mid</th>
      <th scope="col">Menu Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Size</th>
      
    </tr>
  </thead>
  <tbody>
  {data.map((res)=>{
      return(<tr>
        <td>{res.mid}</td>
        <td>{res.mname}</td>
        <td>{res.price}</td>
        <td>{res.category}</td>
        <td>{res.size}</td>
             
      </tr>)
    })}
   
  </tbody>
</table>
  </div>
        </center>
      </>
    )
    
   ;
  }
  export default Dashboard;
  