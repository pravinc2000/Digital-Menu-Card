import axios from 'axios'
import { useState ,useEffect} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify"
function Menu() {
const [filter,setFilter]=useState("");
const [open, setOpen] = useState(false);
const [mnm,setMn]=useState("")
const [prz,setPrz]=useState(0)
const [fid,setFid]=useState(0)
const [qid,setQid]=useState(0)
const [selectedId, setSelectedId] = useState(null); // Store selected category ID
const [editOpen, setEditOpen] = useState(false); // State for update dialog
const handleEditClose = () => setEditOpen(false); // Close update dialog

  // Handle open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function getmn(e){
    setMn(e.target.value)
    
   }
   function getqid(e){
    setQid(e.target.value)
     
   }
   function getprice(e){
    setPrz(e.target.value)
     
   }
   function getfid(e){
    setFid(e.target.value)
      
   }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  //  alert(mnm+qid+prz+fid)
   console.log(mnm+" "+prz+" "+fid+" "+qid)
    const dt={
      mname:mnm,
      price:prz,
      fid:fid,
      qid:qid
    }
    axios.post("http://localhost:3000/addmenu",dt)
    .then(response=>{
      if(response.data.status==200){
        toast.success("Menu added successfully!", {
                 position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: false,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,}); 
        cntapi();
      }else{
         toast.error("Failed to add menu. ", {
                  position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,});
      }
    })
    handleClose(); // Close the dialog after submission
  };

  const del = (id) => {
    const dt={
       id:id
    }
   // axios.delete("http://127.0.0.1:3000/delmenuById",{
     //  data: dt
    //   })
    axios.delete(`http://127.0.0.1:3000/delmenuById/${id}`)

    .then(response => {
      if(response.data.status==200){
        toast.success("Menu deleted successfully!", {
                 position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: false,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,}); 
        cntapi();
      }else{
         toast.error("Failed to delete menu. ", {
                  position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,});
      }
    })    
 }
 const update = (id) => {
    
  const selectedItem = data.find((item) => item.mid === id);
    if (selectedItem) {
      setSelectedId( selectedItem.mid);
      setMn(selectedItem.mname);
      setPrz(selectedItem.price);
      setFid(selectedItem.fid)
      setQid(selectedItem.qid)
      setEditOpen(true);
    }
}
 // Handle update submission
 const handleUpdateSubmit = (e) => {
  e.preventDefault();
  if (!selectedId) return toast.warning("No menu selected for update! ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });

  const dt = { id: selectedId, mname:mnm, price:prz, fid:fid, qid:qid};

  axios.put("http://localhost:3000/updatemenu", dt) // Update request
    .then((response) => {
      if (response.data.status ==200) {
        toast.success("Menu updated successfully!", {
                 position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: false,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
       theme: "colored",
       transition: Bounce,}); 
        cntapi();
      } else {
         toast.error("Failed to update menu. ", {
                  position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,});
      }
    });

  handleEditClose();
};
   const [sts,setSts]=useState("")
   const [data,setData]=useState([])
     function cntapi(){
      axios.get("http://localhost:3000/menu")
      .then(response=>{
        
       // console.log(response.data)
        let ar=response.data.menu
        setData(ar)
        console.log(ar)
      })
     }

     useEffect(()=>{ //onload()
      cntapi();
       },[])
    return(
      <>

      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
transition={Bounce}
/>
        <div  className="flex justify-end p-4">
    <button 
      onClick={handleOpen} 
      // className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800" 
      className="btn btn-success button" 
    >
      + Add Menu
    </button>
  </div>
       {/* Add menu Dialog */}

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD MENU</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Menu Name"
            name="mname"
            onChange={getmn}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            name="price"
            type="number"
            onChange={getprice}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fid"
            name="fid"
            type="number"
            onChange={getfid}
          />
           <TextField
            fullWidth
            margin="dense"
            label="Qid"
            name="qid"
            type="number"
            onChange={getqid}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
       {/* Update menu Dialog */}
       <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>UPDATE MENU </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Menu Name"
            name="mname"
            value={mnm}
            onChange={getmn}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            name="price"
            value={prz}
            onChange={getprice}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fid"
            name="fid"
            value={fid}
            onChange={getfid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Qid"
            name="qid"
            value={qid}
            onChange={getqid}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateSubmit}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <center>
        <div className="app">
          <input type="text" placeholder='search menu' className='search' onChange={(e)=>setFilter(e.target.value)} />
        </div>
        <div class="mt-4 p-5  text-white rounded">
  <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Mid</th>
      <th scope="col">Menu Name</th>
      <th scope="col">Price</th>
      <th scope="col">Fid</th>
      <th scope="col">Qid</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.filter((res)=>res.mname.toLowerCase().includes(filter))
  .map((res)=>{
      return(<tr>
        <td>{res.mid}</td>
        <td>{res.mname}</td>
        <td>{res.price}</td>
        <td>{res.fid}</td>
        <td>{res.qid}</td>
        <td>
          <div  style={{ display: "flex", gap: "10px" }}>
        <button type="button" class="btn btn-warning button" onClick={() => update(res.mid)} >Update</button>
        <button type="button" className="btn btn-danger button" onClick={() => del(res.mid)}>Delete</button></div></td>
      </tr>)
    })}
   
  </tbody>
</table>
  </div>
        </center>
      </>
    );
  }
  export default Menu;
  