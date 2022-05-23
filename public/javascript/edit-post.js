 async function editFormHandler(event) {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim()
  const post_text = document.querySelector('#post-text').value.trim()
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

console.log('clicked!!' + title + post_text + id)

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}




document.querySelector('.edit-btn').addEventListener('click', editFormHandler);
