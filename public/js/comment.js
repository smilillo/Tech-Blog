const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
  // need to reference post id somehow
    if (comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);