import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Toast(props) {

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={props.handleLike}>
        Like
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.display}
        onClose={props.handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
}