import axios from 'axios'
import { useState ,useEffect} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify"
function Foodqty() {
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState("");
const [selectedId, setSelectedId] = useState(null); // Store selected category ID
const [editOpen, setEditOpen] = useState(false); // State for update dialog
  // Handle open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false); // Close update dialog

  // Handle input change
const handleChange = (e) => {
   setFormData(e.target.value ); };
// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault(); 
  // const [formData, setFormData] = useState("");
console.log("Form Data:", formData);
 const dt={
   size:formData }
axios.post("http://localhost:3000/addqty",dt)
 .then(response=>{ 
 // console.log(response); // debug

  if(response.status===200){
    toast.success("Quantity added successfully!", {
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
             // handleClose();
              } 
            })
           handleClose(); // Close the dialog after submission 
             };


  const del = (id) => {
    const dt={
       qid:id
    }
    axios.delete("http://127.0.0.1:3000/delqtyById",{
      data: dt
    })
    .then(response => {
      if(response.status==200){
        toast.success("Quantity deleted successfully!", {
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
        toast.error("Failed to delete quantity. ", {
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
    
  // const selectedItem = data.find((item) => item.qid === id);
  const selectedItem = data?.find((item) => item.qid === id);
    if (selectedItem) {
      setSelectedId( selectedItem.qid);
      setFormData(selectedItem.size);
      setEditOpen(true);
    }
}
 // Handle update submission
 const handleUpdateSubmit = (e) => {
  e.preventDefault();
  if (!selectedId) return toast.warning("No quantity selected for update! ", {
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

  const dt = { qid: selectedId, size:formData };

  axios
    .put("http://localhost:3000/updateqtyById", dt) // Update request
    .then((response) => {
      if (response.status ==200) {
         toast.success("Quantity updated successfully!", {
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
        toast.error("Failed to update quantity. ", {
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
      axios.get("http://localhost:3000/qty")
      .then(response=>{
       
       // console.log(response.data)
        // let ar = response.data.qtymast
        let ar = response.data.qtymast || [];
        setData(ar)
        //console.log(ar)
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
      + Add Quantity
    </button>
  </div>
  {/* Add quantity Dialog */}

      <Dialog open={open} onClose={handleClose}>
              <DialogTitle>ADD QUANTITY</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Size"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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

            {/* Update Category Dialog */}
       <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>UPDATE QUANTITY</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Size"
            name="size"
            value={formData}
            onChange={handleChange}
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
       
        <div className="mt-4 p-5  text-white rounded">
  <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">QID</th>
      <th scope="col">Size</th>
      
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {/* {data.map((res)=>{ */}
  {data?.map((res) => {
      return(<tr key={res.qid}>
        <td>{res.qid}</td>
        <td>{res.size}</td>
        <td>
          <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" class="btn btn-warning button"  onClick={() => update(res.qid)}>Update</button>
        <button type="button" className="btn btn-danger button" onClick={() => del(res.qid)}>Delete</button></div></td>
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
  export default Foodqty;
  