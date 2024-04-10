import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import { DataContext } from "../../provider/dataprovider/App";

export default function FormDialog() {
  const { submit } = React.useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{backgroundColor: "green"}} variant="contained" onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Add Intent
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const intent = formJson.intent;
            const subintent = formJson.subintent;
            const point = formJson.point;
            handleClose();
            submit(intent, subintent, point);
          },
        }}
      >
        <DialogTitle>Intent</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            Let&#39;s delve into crafting a comprehensive framework that
            encapsulates your intentions with clarity and precision, ensuring
            each subintent harmoniously aligns with the overarching purpose you
            seek to communicate.
          </DialogContentText>
          <div className="flex flex-col gap-2">
            <TextField
              autoFocus
              required
              margin="dense"
              id="intent"
              name="intent"
              label="Intent"
              type="text"
              fullWidth
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub intent</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="subintent"
                value={age}
                label="Sub intent"
                onChange={handleChange}
              >
                <MenuItem value={"ad"}>ad</MenuItem>
                <MenuItem value={"sap"}>sap</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-number"
              label="Point"
              type="number"
              name="point"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
