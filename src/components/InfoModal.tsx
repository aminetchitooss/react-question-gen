import { forwardRef, useImperativeHandle, useState } from "react";
import { Typography, Box, Modal } from "@material-ui/core";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export type InfoModalHandle = {
  openModal: () => void;
  closeModal: () => void;
};

export type InfoModalProps = {
  message: string;
  children?: any;
};

export const InfoModal = forwardRef<InfoModalHandle, InfoModalProps>(({ message, children }, ref) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      handleOpen();
    },
    closeModal() {
      handleClose();
    }
  }));

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {message}
          </Typography>

          {children}
        </Box>
      </Modal>
    </div>
  );
});
