const url="https://makeup-api.herokuapp.com/api/v1/products.json"; //api url
document.getElementById("productTypes").innerHTML="Please wait..."  
document.getElementById("brands").innerHTML="Please wait..."

//function for getting the API data
async function getMakeupData(){
    try {
        const data= await fetch(url);
        const makeupData= await data.json();
        return makeupData; 
    } catch (error) {
        console.log(error);
    }
}

//displays the list of product types retrieved from API
async function displayProductTypesList(){
    let makeupData= await getMakeupData();
    let tempProductTypes=[]
    makeupData.forEach(data=>{
        tempProductTypes.push(data.product_type);
    })
    let productTypes=[]
    productTypes=[...new Set(tempProductTypes)];
    let productTypesList=document.getElementById("productTypes");
    productTypesList.innerHTML="";
    productTypes.forEach(productType=>{
        //creating the list item dynamically
        productTypesList.innerHTML +=`
        <div class="col-sm-6 col-md-4 col-lg-3 p-2 "><a href="#productTypes" class="selected-product-type">${productType}</a></div>
        `
    })
}

//displays the list of brands retrieved from API
async function displayBrandsList(){
    let makeupData= await getMakeupData();
    let tempBrands=[]
    makeupData.forEach(data=>{
        tempBrands.push(data.brand);
    })
    let brands=[]
    brands=[...new Set(tempBrands)];
    let brandsList=document.getElementById("brands");
    brandsList.innerHTML="";
    brands.forEach(brand=>{
        //creating the list item dynamically
        brandsList.innerHTML +=`
        <div class="col-sm-6 col-md-4 col-lg-3 p-2"><a href="#brands" class="selected-brand">${brand}</a></div>
        `
    })
}

let searchButton = document.getElementById("search");

//function to get data based on search
searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let brandValue= document.getElementById("brandValue").value.toLowerCase();
    let productTypeValue= document.getElementById("productTypeValue").value.toLowerCase();
    fetch(`${url}?brand=${brandValue}&product_type=${productTypeValue}`)
    .then(response=> response.json())
    .then(data=>{
        let allResults =  document.querySelector("#allResultsRow");
       if(data.length===0){
        allResults.innerHTML=`<h1 style="margin:auto">No data Found....</h1>`
       }else{
        allResults.innerHTML=""
        for(let i=0;i<data.length;i++){
            allResults.innerHTML += display(data[i]);
        }
       }

    }).catch(error=>{
        console.log(error)
    })
    window.scrollTo(0,2);
    document.getElementById("brandValue").value=""
    document.getElementById("productTypeValue").value=""
})

//function that executes initial functions for displaying lists and also having event listeners
async function executeAll(){
    await displayProductTypesList();
    await displayBrandsList();

    let selectedProductType=document.querySelectorAll(".selected-product-type");

    //event listener for the list of product types for click event
    selectedProductType.forEach(productType=>{
        productType.addEventListener('click',(e)=>{
            e.preventDefault();
            fetch(`${url}?product_type=${productType.innerText}`)
    .then(response=> response.json())
    .then(data=>{
        let allResults =  document.querySelector("#allResultsRow");
       if(data.length===0){
        allResults.innerHTML=`<h1 style="margin:auto">No data Found....</h1>`
       }else{
        allResults.innerHTML=""
        for(let i=0;i<data.length;i++){
            allResults.innerHTML += display(data[i]);
            window.scrollTo(0,2);
        }
       }

    }).catch(error=>{
        console.log(error)
    })
        })       
    })

    let selectedBrand=document.querySelectorAll(".selected-brand");

    //event listener for the list of product types for click event
    selectedBrand.forEach(brand=>{
        brand.addEventListener('click',(e)=>{
            e.preventDefault();
            fetch(`${url}?brand=${brand.innerText}`)
    .then(response=> response.json())
    .then(data=>{
        let allResults =  document.querySelector("#allResultsRow");
       if(data.length===0){
        allResults.innerHTML=`<h1 style="margin:auto">No data Found....</h1>`
       }else{
        allResults.innerHTML=""
        for(let i=0;i<data.length;i++){
            allResults.innerHTML += display(data[i]);
            window.scrollTo(0,2);
        }
       }

    }).catch(error=>{
        console.log(error)
    })
        })       
    })
}


executeAll();

//default display function for displaying the cards based on search or selction from list
function display(data){
    return `
    <div class="p-2 col-lg-3 col-sm-12 col-md-6">
        <div class="card mx-auto" style="width: 18rem; background:linear-gradient(to bottom, grey, pink)">
            <img src="${data.image_link}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title bg-danger text-dark">Name: ${data.name}</h5>
                <p class="card-text"><strong>Brand</strong>: ${data.brand}</p>
                <p class="card-text"><strong>Price</strong>: ${data.price_sign} ${data.price}</p>
                <p class="card-text" id="description"><strong>Description</strong>:<br>${data.description}</p>
            </div>
        </div>
    </div>
    `
}

