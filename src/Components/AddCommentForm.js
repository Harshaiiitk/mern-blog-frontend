import { useState } from 'react';
import axios from 'axios';
import useUser from '../Hooks/useUser';

const AddCommentForm = ({ articleName, OnArticleUpdate }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        PostedBy: name,
        text: comment,
      },
      { headers }
    );
    const updatedArticle = response.data;
    OnArticleUpdate(updatedArticle);
    setName('');
    setComment('');
  };

  return (
    <div id='add-comment-form'>
      <h3> Add a comment</h3>
      {user && <p>You are Posting as {user.email} </p>}
      {/* <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
        />
      </label> */}
      <label>
        {/* Comment: */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows='4'
          cols='50'
        />
      </label>
      <button onClick={addComment}> Add Comment </button>
    </div>
  );
};

export default AddCommentForm;
