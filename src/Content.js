import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';

import { fetchLikedFormSubmissions, saveLikedFormSubmission, onMessage } from './service/mockServer';
import retry from './service/retryAPI';

export default function Content() {
  const [likes, setLikes] = useState([]);
  const [toasts, setToasts] = useState([]);

  const refreshList = useCallback(() => {
    fetchLikedFormSubmissions()
    .then(data => {
      if (JSON.stringify(data.formSubmissions) !== JSON.stringify(likes)) {
        setLikes(data.formSubmissions);
      }
    })
    .catch(error => {
      console.error(error);
      retry(refreshList);
    })
  },[likes])

  const dismissToast = () => {
    setToasts( prev => {
      prev.shift();
      return [...prev];
    })
  }

  const likeToast = () => {
    let formSubmission = toasts[0];
    if (formSubmission !== undefined && !likes.includes(formSubmission)) {
      dismissToast();
      formSubmission.data.liked = true;
      setLikes( prev => [...prev, formSubmission])
      saveLikedFormSubmission(formSubmission)
      .then(data => {
        refreshList();
      })
      .catch(error => {
        console.error(error);
        retry(likeToast);
      })
    }
  }

  useEffect(() => {
    refreshList();
    onMessage((data) => setToasts( prev => [...prev, data]));
  },[])

  const Like = (props) => {
    const {firstName, lastName, email} = props.data;
    return <div>{firstName + " " + lastName + " " + email}</div>;
  }

  const toastMessage = useMemo(() => toasts.length > 0 ? toasts[0].data.firstName + " " + toasts[0].data.lastName + "\n" + toasts[0].data.email : "", [toasts])

  return (
    <Box sx={{marginTop: 3}}>
      <Toast message={toastMessage} display={toasts.length > 0} handleClose={dismissToast} handleLike={likeToast} />
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography component={'span'} variant="body1" sx={{fontStyle: 'italic', marginTop: 5}}>
        {likes.map((element) => <Like data={element.data} key={element.id} />)}
      </Typography>
    </Box>
  );
}
