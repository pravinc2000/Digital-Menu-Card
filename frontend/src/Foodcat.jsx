import axios from "axios";
import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify"
function Foodcat() {
  const [open, setOpen] = useState(false);
  const [foodcat, setfoodcat] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Store selected category ID
  const [editOpen, setEditOpen] = useState(false); // State for update dialog
  const [data, setData] = useState([]);

  // Handle open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false); // Close update dialog

  function getfoodcat(e) {
    setfoodcat(e.target.value);
  }

  // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const dt = {
//       category: foodcat,
//     };
//     axios.post("http://localhost:3000/addfood_cat", dt).then((response) => {
//       if (response.data.status == 200) {
      
//         toast.success("Category added successfully! ", {
//           position: "top-center",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: false,
// draggable: true,
// progress: undefined,
// theme: "colored",
// transition: Bounce,}); // Toast success
//         cntapi();
//       } else {
//         toast.error("Failed to add category. ", {
//           position: "top-center",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: false,
// draggable: true,
// progress: undefined,
// theme: "colored",
// transition: Bounce,}); // Toast error
//       }
//     });
//     handleClose(); // Close the dialog after submission
//   };

const handleSubmit = (e) => {
  e.preventDefault();

  const dt = {
    category: foodcat,
  };

  axios.post("http://localhost:3000/addfood_cat", dt)
    .then((response) => {

      toast.success("Category added successfully!", {
        position: "top-center",
        theme: "colored",
        transition: Bounce,
      });

      cntapi();
      handleClose();
    })
    .catch((error) => {
      console.log(error);

      toast.error("Failed to add category.", {
        position: "top-center",
        theme: "colored",
        transition: Bounce,
      });
    });
};

  // Delete Category
  const del = (id) => {
    const dt = { id: id };
    axios
      .delete("http://localhost:3000/delfood_catById", {
        data: dt,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          toast.success("Category deleted successfully! ", {
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
          cntapi();
        } else {
          toast.error("Failed to delete category. ");
        }
      });
  };

  // Open Update Dialog
  const update = (id) => {
    const selectedItem = data.find((item) => item.fid === id);
    if (selectedItem) {
      setSelectedId(selectedItem.fid);
      setfoodcat(selectedItem.category);
      setEditOpen(true);
    }
  };

  // Handle update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) return toast.warning("No category selected for update! ", {
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

    const dt = { fid: selectedId, category: foodcat };

    axios.put("http://localhost:3000/updatefood_catById", dt).then((response) => {
      if (response.data.status == 200) {
        toast.success("Category updated successfully! ", {
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
        cntapi();
      } else {
        toast.error("Failed to update category. ");
      }
    });

    handleEditClose();
  };




  function cntapi() {
    axios.get("http://localhost:3000/food_cat").then((response) => {
      let ar = response.data.foodqty;
     //let ar = response.data?.foodqty || [];
     // console.log(response.data);
      setData(ar);
    });
  }

  useEffect(() => {
    cntapi();
  }, []);

  return (
    <>
      <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
transition={Bounce} />
      
      <div className="flex justify-end p-4">
        <button onClick={handleOpen} className="btn btn-success button">
          + Add Foodcategory
        </button>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD FOOD CATEGORY</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Category" name="category" onChange={getfoodcat} />
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
        <DialogTitle>UPDATE FOOD CATEGORY</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Category" name="category" value={foodcat} onChange={getfoodcat} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <center>
        <div className="mt-4 p-5 text-white rounded">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Fid</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res) => (
                <tr key={res.fid}>
                  <td>{res.fid}</td>
                  <td>{res.category}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="button" className="btn btn-warning button" onClick={() => update(res.fid)}>
                        Update
                      </button>
                      <button type="button" className="btn btn-danger button" onClick={() => del(res.fid)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}

export default Foodcat;
