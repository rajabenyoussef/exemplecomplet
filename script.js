const fm=document.getElementById('inscriptionForm');
fm.addEventListener('submit', function(event) {
    event.preventDefault();
    const o = {};
     new FormData(fm).forEach((value,key) => o[key]=value);
    fetch('/inscription', {
        method: 'POST',
      headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(o)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        console.error('Erreur lors de la soumission du formulaire :', error);
    });
});
