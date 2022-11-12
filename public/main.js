let addToCart = document.querySelectorAll('#addToCart')
let save = document.querySelectorAll('#saveBtn')
let trash = document.getElementsByClassName("fa-trash-o");
let updatePayment = document.getElementsByClassName("updatePaymentBtn")


Array.from(addToCart).forEach(function(element) {
      element.addEventListener('click', function(){
        const cardElement = this.parentNode.parentNode.parentNode.parentNode;
        const name = cardElement.querySelector(".name").innerText;
        const price = cardElement.parentNode.querySelector(".price").innerText;
   
        fetch('order', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'price': price,
          })
        })
        
        .then(response => {
          if (response.ok) return window.location.reload(true)
        })
        .then(data => {
          console.log(data)
        })
      });
});


Array.from(save).forEach(function(element) {
  element.addEventListener('click', function(){
    const fullName = this.parentNode.childNodes[3].childNodes[1].value
    const user = this.parentNode.childNodes[1].childNodes[1].value
    const cardNumber = this.parentNode.childNodes[15].childNodes[1].value
    const phoneNumber = this.parentNode.childNodes[17].childNodes[1].value

    fetch('save', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'fullName': fullName,
        'user': user, 
        'cardNumber': cardNumber, 
        'phoneNumber': phoneNumber
      })
    })
    
    .then(response => {
      if (response.ok) return window.location.reload(true)
    })
    .then(data => {
      console.log(data)
    })
  });
});



Array.from(updatePayment).forEach(function(element) {
  element.addEventListener('click', function(){

    console.log('Sarah is nice.')
    const fullName = this.parentNode.childNodes[1].innerText
    const user = this.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].value
    const phoneNumber = this.parentNode.childNodes[3].innerText.split(':')[1].trim()
    const cardNumber = this.parentNode.childNodes[5].innerText.split(':')[1].trim()
    const edit = this.parentNode.childNodes[7].value
    fetch('update', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'fullName': fullName,
        'user': user,
        'cardNumber': cardNumber, 
        'phoneNumber': phoneNumber, 
        'updatedCardNumber': edit
      })
    })
    
    .then(response => {
      if (response.ok) return window.location.reload(true)
    })
    .then(data => {
      console.log(data)
    })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
      
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const price = this.parentNode.parentNode.childNodes[3].innerText

        fetch('/deleteItem', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'price': price
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
