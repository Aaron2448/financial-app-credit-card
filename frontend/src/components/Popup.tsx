import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import TermsAndConditions from "../text/termsandconditions";
import PrivacyPolicy from "../text/privacypolicy";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function Popup({ open, onClose, title }: PopupProps) {
  const [child, setChild] = useState<ReactNode>();

  useEffect(() => {
    switch (title) {
      case 'Terms and Conditions':
        setChild(<TermsAndConditions />);
        break;
      case 'Privacy Policy':
        setChild(<PrivacyPolicy />);
        break;
      default:
        setChild(<></>);
        break
    }
  }, [title]);

  const header = window.document.body.querySelector('.header');
  useEffect(() => {
    if (open && header) header.setAttribute('style', 'pointer-events: none; filter: brightness(0.5);');
  }, [open]);

  const close = () => {
    if (header) header.setAttribute('style', 'pointer-events: auto; filter: brightness(1);');
    onClose && onClose();
  }

  return (
    <>
      <Dialog sx={{ '& .MuiDialog-paper': { maxHeight: '50vh' } }}
        open={open}
        onClose={close}
        scroll="paper"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {child}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popup;