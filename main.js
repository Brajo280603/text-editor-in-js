const fileInput = document.getElementById('getFile');
const reader = new FileReader();
const textarea = document.getElementById("inputarea");
const saveBtn = document.getElementById("saveBtn");
const download = document.getElementById("download");
const fileName = document.getElementById("fileName");


// _______________________________Edit a given file________________________________
let selectedFile ;

fileInput.addEventListener("change", () => {
  selectedFile = fileInput.files[0];
  // console.log(selectedFile);
  if (selectedFile) {
    reader.readAsText(selectedFile);
    if(selectedFile.name){
      console.log(selectedFile.name)
      fileName.value = selectedFile.name
    }
  }
});

reader.addEventListener("load", () => {
  // this will then display a text file
  // console.log(reader.result);
  textarea.value = reader.result;
  // saveBtn.href = reader.result;
  
}, false);



// ____________________________Create a file________________________
download.addEventListener("click",()=>{
  let input = textarea.value ; //taking the input as string
  
  
  // input = JSON.stringify(input); //stupid


  // console.log(input);
  var blob = new Blob([input], { type: 'text/plain' }); //converting it to blob
  // console.log(blob)
  var file = new File([blob], "foo.txt", {type: "text/plain"}); //converting it to file
  const url = URL.createObjectURL(file); //creating url for the file
  // console.log(url)
 if(fileName.value != ""){
  download.href = url; //setting url as the source for link to download
  download.download = fileName.value;
 }else{
  fileName.focus()
 }
  

})


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js'); //registering a Service worker is mandatory for PWA installation
}
