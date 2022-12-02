import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';

import { fetchLikedFormSubmissions, saveLikedFormSubmission, onMessage } from './service/mockServer';

export default function Content() {
  const [likes, setLikes] = useState([]);
  const [toasts, setToasts] = useState([]);

  const refreshList = () => {
    fetchLikedFormSubmissions()
    .then(data => {
      setLikes(data.formSubmissions);
    })
    .catch(error => {
      console.error(error);
      refreshList();
    })
  }

  const dismiss = () => {
    setToasts(prev => {
      prev.shift();
      return [...prev];
    })
  }

  const like = () => {
    let formSubmission = toasts[0];
    dismiss();
    formSubmission.data.liked = true;
    saveLikedFormSubmission(formSubmission)
    .then(data => {
      refreshList();
    })
    .catch(error => {
      console.error(error);
      like();
    })
  }

  useEffect(() => {
    refreshList();
    onMessage((data) => setToasts(prev => [...prev, data]));
  },[])

  const Like = (props) => {
    const {firstName, lastName, email} = props.data;
    return <div>{firstName + " " + lastName + " " + email}</div>;
  }

  const toastMessage = toasts.length > 0 ? toasts[0].data.firstName + " " + toasts[0].data.lastName + " " + toasts[0].data.email : "";

  return (
    <Box sx={{marginTop: 3}}>
      <Toast message={toastMessage} display={toasts.length > 0} handleClose={dismiss} handleLike={like} />
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography component={'span'} variant="body1" sx={{fontStyle: 'italic', marginTop: 5}}>
        {likes.map((element) => <Like data={element.data} key={element.id} />)}
      </Typography>
    </Box>
  );
}
