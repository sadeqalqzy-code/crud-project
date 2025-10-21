let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
//get.total

function gettotla(){
if(price.value !=''){
let result = (+price.value + +taxes.value + +ads.value) - +discount.value
total.innerHTML = result;
total.style.background='#040';
}else{
total.style.innerHTML='';
total.style.background='#920606';

}
}
//create.product
let dataPro;
if(localStorage.product != null){
dataPro = JSON.parse(localStorage.product)

}else{
dataPro = [];

}
submit.onclick = function(){
let newPor = {
title:title.value,
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value,

}
if (title.value != '' && price.value != '' && category.value != '' && taxes.value != ''
   && ads.value != '' && discount.value != ''&& newPor.count < 100) {
  if (mood === 'create') {
  //count
if (newPor.count > 1) {
  for (let i = 0; i < newPor.count; i++) {
   dataPro.push(newPor); 
  }
}else{
  dataPro.push(newPor);
}
}else{
dataPro[ tmp ] = newPor;
mood = 'create';
submit.innerHTML = 'create';
count.style.display = 'block';
}
clearData()
}
//save localstorage
localStorage.setItem('product', JSON.stringify(dataPro))
showData()

  }
//clear inpout
function clearData(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';
}
//read
function showData(){
  gettotla()
let table = '';
for (let i = 0; i < dataPro.length; i++) {
    table += `
  <tr>
     <td>${i+1}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick = "updatedata(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    ` ;
}
document.getElementById('tbody').innerHTML = table;
let sadelete = document.getElementById('deleteAll');
if (dataPro.length > 0) {
sadelete.innerHTML = `
<button onclick="deleteall()">delete All (${dataPro.length})</button>
`
}else{
sadelete.innerHTML ='';
}
}
showData()
//delete
function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData()
}
function deleteall(){
localStorage.clear()
dataPro.splice(0)
showData()
}
//update
function updatedata(i){
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
gettotla()
count.style.display = 'none';
category.value = dataPro[i].category;
submit.innerHTML = 'Update';
mood = 'update';
tmp = i;
scroll({
  top: 0,
  behavior:'smooth',})
}
//search
let searchMood = 'title';
function getsearchmood(id)
{
  let search = document.getElementById('search');
 if (id == 'searchTitle') {
 searchMood = 'title';
 search.placeholder = 'search by title';

 }else{
 searchMood = 'category';
search.placeholder = 'search by category';
 }
 search.focus()
search.value = '';
showData()
}
function searchdata(value) {
  let table = '';
  if (searchMood == 'title') {
    
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
  <tr>
     <td>${i+1}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick = "updatedata(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    ` 
      }
    }
  }else{
     for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += `
  <tr>
     <td>${i+1}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick = "updatedata(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    `
      }
    }
  }
document.getElementById('tbody').innerHTML = table;
}