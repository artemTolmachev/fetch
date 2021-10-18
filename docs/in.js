let button = document.getElementById('table');
let link = document.createElement("a");
let wrapper = document.querySelector('.btn-wrapper');

link.classList.add('button');
function task3 (event) {
    // event.preventDefault();
    let filename = document.getElementById('input1').value;
    let filedata = document.getElementById('input2').value;  
    fetch("http://react.test/api.php",{
      method: "POST",
      header: {
        'Content-Type': 'aplocation/x-www-form-urlencoded',
      },
      body: JSON.stringify({action: 3, filename : filename, filedata: filedata})
    })
      .then(response =>  response.json())
      .then(data => {  //data возвращает кол во байтов - размер файла
          if(data > 0){ 
            link.innerText = 'СКАЧАТЬ'; //выводим ссылку на скач-е
            link.href = '#';
            wrapper.appendChild(link);
          }
      })

    function f1(){ //f1 получает содержимое файла (инпута) и передает в объект Blob 
      let aFileParts = [filedata];
      let oMyBlob = new Blob(aFileParts, {type : 'text.txt'}); 
      let a = document.createElement('a'); //созд ссылку по которой будет открываться окно для скач-я созд-го файла конструктором Blob
      document.body.appendChild(a);
      a.style = "display: none";
      let url = window.URL.createObjectURL(oMyBlob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      location.reload();
    } 
  link.addEventListener("click", f1);
}



let input = document.querySelectorAll('input');
function cleerField (event){
  // event.preventDefault();

    for(let i = 0; i < input.length; i++){
      if(input[i].value.length > 0){
          task3();
          input[i].value = '';
          input[i + 1].value = '';
          break;
      }else{
        return false;
      }
        
    }
}

button.addEventListener("click", cleerField);