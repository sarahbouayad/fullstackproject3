var checkBox = document.getElementsByClassName("fa-square");
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(checkBox).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const jobListing = this.parentNode.parentNode.childNodes[3].innerText
        const connect = this.parentNode.parentNode.childNodes[5].innerText
        const msg = this.parentNode.parentNode.childNodes[7].innerText
        const checkBoxIcon = this.dataset.checkbox === "true"
      
        console.log(this.dataset)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'jobListing': jobListing,
            'connect': connect,
            'msg': msg,
            'checkBox': checkBoxIcon
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const jobListing = this.parentNode.parentNode.childNodes[3].innerText
        const connect = this.parentNode.parentNode.childNodes[5].innerText
        const msg = this.parentNode.parentNode.childNodes[7].innerText
        console.log(name)
        console.log(msg)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
