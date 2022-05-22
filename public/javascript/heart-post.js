
async function heartPost (event) {
    console.log('heart clicked!')

    // const response = await fetch(`/api/posts/heart`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       post_id: post_id,
    //       user_id: req.session.user_id
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    
    //   if (response.ok) {
    //     document.location.replace('/dashboard/');
    //   } else {
    //     alert(response.statusText);
    //   }
    }


document.querySelector('.heart-btn').addEventListener('click', heartPost);