import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Toast(props) {
  const [disableButton, setDisableButton] = React.useState(false);

  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisableButton(true);
    await props.handleClose();
    setDisableButton(false);
  };

  const handleLike = async () => {
    setDisableButton(true);
    await props.handleLike();
    setDisableButton(false);
  };
// set width
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleLike} disabled={disableButton}>
        Like
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        sx={{width: 400, minWidth: 400}}
        open={props.display}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
}