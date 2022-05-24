async function heartPost (event) {
    
  const post_id = event.path[2].value.trim()

  const response = await fetch(`/api/posts/heart`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: post_id,
      //   user_id: req.session.user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }


const buttons = document.querySelectorAll('.heart-btn')
buttons.forEach((button) => button.addEventListener("click", (event) => heartPost(event)))