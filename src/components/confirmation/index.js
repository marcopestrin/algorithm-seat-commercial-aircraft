import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { CONFIRM_PRICE } from "../../redux/actions";
import { selectorNarrowbody } from '../../redux/selectors';
import "./styles.scss";
const Confirmation =() => {
  
  const [open, setOpen] = useState(false);
  const { seatPrice } = useSelector(selectorNarrowbody);
  const dispatch = useDispatch();
  const handleDisagree = () => setOpen(false);
  const handleAgree = () => {
    dispatch({
      type: CONFIRM_PRICE
    });
    setOpen(false);
  };

  useEffect(() => {
    if (seatPrice !== null && seatPrice !== undefined) {
      setOpen(true);
    }
  }, [seatPrice]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm seat
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to buy this seat for €{seatPrice}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Confirmation;