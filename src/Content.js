import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

  const Toast = () => 
  <div>
    {JSON.stringify(toast)}
    <button onClick={(event) => like()}>
      Like
    </button>
  </div>

  const Like = props => 
  <div>
    {JSON.stringify(props.data)}
  </div>

  return (
    <Box sx={{marginTop: 3}}>
      {displayToast && 
      <div>
        <Toast/>
      </div>}
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography component={'span'} variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        {likes && likes.map((element) => <Like data={element} key={element.id} />)}
      </Typography>
    </Box>
  );
}
