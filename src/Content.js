import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';

import { fetchLikedFormSubmissions, saveLikedFormSubmission, onMessage } from './service/mockServer';

export default function Content() {
  const [likes, setLikes] = useState([]);
  const [toast, setToast] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);

  onMessage((data) => setToast(data));
  onMessage((data) => setDisplayToast(true));

  const refreshList = () => {
    fetchLikedFormSubmissions()
    .then(data => {
      setLikes(data.formSubmissions);
    })
    .catch(error => refreshList());
  }

  const like = () => {
    setDisplayToast(false);
    let formSubmission = toast;
    formSubmission.data.liked = true;
    saveLikedFormSubmission(formSubmission)
    .then(data => {
      refreshList();
    })
    .catch(error => like());
  }

  useEffect(() => {
    refreshList();
  },[])

  const Like = (props) => <div>{props.data.firstName + " " + props.data.lastName + " " + props.data.email}</div>;

  const toastMessage = toast ? toast.data.firstName + " " + toast.data.lastName + " " + toast.data.email : "";

  return (
    <Box sx={{marginTop: 3}}>
      <Toast message={toastMessage} display={displayToast} handleClose={() => setDisplayToast(false)} handleLike={like} />
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography component={'span'} variant="body1" sx={{fontStyle: 'italic', marginTop: 5}}>
        {likes && likes.map((element) => <Like data={element.data} key={element.id} />)}
      </Typography>
    </Box>
  );
}
