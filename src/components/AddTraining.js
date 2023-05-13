// import React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// export default function AddTraining(props) {
//   const [open, setOpen] = React.useState(false);
//   const [customer, setCustomer] = React.useState({
//     date: "",
//     activity: "",
//     duration: "",
//     customer: link,
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (event) => {
//     setCustomer({ ...customer, [event.target.name]: event.target.value });
//   };

//   const addCustomer = () => {
//     props.saveCustomer(customer);
//     handleClose();
//   };
//   return (
//     <div>
//       <Button
//         style={{ margin: 5 }}
//         variant="outlined"
//         onClick={handleClickOpen}
//       >
//         Add customer
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>New Training</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="date"
//             value={customer.date}
//             onChange={(e) => handleInputChange(e)}
//             label="Date"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="activity"
//             value={customer.activity}
//             onChange={(e) => handleInputChange(e)}
//             label="Activity"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={addCustomer}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
