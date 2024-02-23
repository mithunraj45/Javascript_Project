const weatherAPIKey="dd9a91643eb83104ee2e6d4dc641daa6";
const weatherAPIURL="https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric";

const galleryImages=[
    {
        src:"./assets/gallery/image1.jpg",
        alt:"Thumbnail Image 1"
    },
    {
        src:"./assets/gallery/image2.jpg",
        alt:"Thumbnail Image 2"
    },
    {
        src:"./assets/gallery/image3.jpg",
        alt:"Thumbnail Image 3"
    }
];

const products=[
        {
          title: "AstroFiction",
          author: "John Doe",
          price: 49.9,
          image: "./assets/products/img6.png"
        },
        {
          title: "Space Odissey",
          author: "Marie Anne",
          price: 35,
          image: "./assets/products/img1.png"
        },
        {
          title: "Doomed City",
          author: "Jason Cobert",
          price: 0,
          image: "./assets/products/img2.png"
        },
        {
          title: "Black Dog",
          author: "John Doe",
          price: 85.35,
          image: "./assets/products/img3.png"
        },
        {
          title: "My Little Robot",
          author: "Pedro Paulo",
          price: 0,
          image: "./assets/products/img5.png"
        },
        {
          title: "Garden Girl",
          author: "Ankit Patel",
          price: 45,
          image: "./assets/products/img4.png"
        }
];

//Code for Open close nav bar

function menuhandler(){
    document.querySelector("#open-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//code for greeting
function greetinghandler(){
    let greeting;

    let currenttime=new Date().getHours();

    if(currenttime<12){
        greeting="Good Morning";
    }else if(currenttime<19){
        greeting="Good Afternooon";
    }else if(currenttime<24){
        greeting="Good Evening";
    }else {
        greeting="Welcome";
    }

    document.querySelector("#greeting").innerHTML=greeting;

}

//code for local time

function localtimehandler(){
    setInterval(function(){
        let time    =new Date(); 
    
        document.querySelector("span[data-time=hours]").textContent=time.getHours().toString().padStart(2,0);
        document.querySelector("span[data-time=minutes]").textContent=time.getMinutes().toString().padStart(2,0);
        document.querySelector("span[data-time=seconds]").textContent=time.getSeconds().toString().padStart(2,0);
    },1000);
}

// code for gallery

function galleryhandler(){
    
    let mainImage=document.querySelector("#gallery > img");
    let thumbnalis=document.querySelector("#gallery .thumbnails");
    
    mainImage.src=galleryImages[0].src;
    mainImage.alt=galleryImages[0].alt;
    
    galleryImages.forEach(function(img,index){
        let thumb=document.createElement("img");
        thumb.src=img.src;
        thumb.alt=img.alt;
        thumb.dataset.arrayIndex=index;
        thumb.dataset.selected= index==0?true:false;
        
        thumb.addEventListener("click",function(e){
            let selectedindex = e.target.dataset.arrayIndex;
            let selectedimage = galleryImages[selectedindex];
    
            mainImage.src=selectedimage.src;
            mainImage.alt=selectedimage.alt;
            
            thumbnalis.querySelectorAll("img").forEach(function(img){
                img.dataset.selected=false;
            });
    
            e.target.dataset.selected=true;
    
        })
    
        thumbnalis.appendChild(thumb);
    });
}

//code for product

function populateproducts(productlist){
    let productclass=document.querySelector(".products-area");
    productclass.textContent="";

    productlist.forEach(function(product){
        let productelement=document.createElement("div");
        productelement.classList.add("product-item");
        
        let productimg=document.createElement("img");
        productimg.src=product.image;
        productimg.alt=product.title;

        let productdetails=document.createElement("div");
        productdetails.classList.add("product-details");

        let producttitle=document.createElement("h3");
        producttitle.classList.add("product-title");
        producttitle.textContent=product.title;
        productdetails.append(producttitle);

        let productauthor=document.createElement("p");
        productauthor.classList.add("product-author");
        productauthor.textContent=product.author;
        productdetails.append(productauthor);

        let pricetitle=document.createElement("p");
        pricetitle.classList.add("price-title");
        pricetitle.textContent="Price";
        productdetails.append(pricetitle);

        
        let productprice=document.createElement("p");
        productprice.classList.add("product-price");
        productprice.textContent=product.price > 0 ? "$"+product.price.toFixed(2): "FREE";
        productdetails.append(productprice);



        productelement.append(productimg);
        productelement.append(productdetails);

        productclass.append(productelement);
    });
}

function producthandler(){
        
        let freeproducts=products.filter(function(item){
               return !item.price || item.price<=0 ;
        });

        let paidproducts=products.filter(function(item){
            return item.price>0;
        });

        populateproducts(products);

        document.querySelector(".products-filter").addEventListener("click",function(e){
            if(e.target.id === "all"){
                populateproducts(products);
            }else if(e.target.id === "paid"){
                populateproducts(paidproducts);
            }else if(e.target.id ===        "free"){
                populateproducts(freeproducts);
            }
        });


        document.querySelector(".products-filter label[for=all] span.product-amount").textContent=products.length;
        document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=paidproducts.length;
        document.querySelector(".products-filter label[for=free] span.product-amount").textContent=freeproducts.length;
}

function footerhandler(){
    let currentyear=new Date().getFullYear();
    document.querySelector("footer").textContent= `@ ${currentyear} All rights are resereved `;
}

function weatherhandler(){
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude=position.coords.latitude;
        let longitude=position.coords.longitude;
        let url=weatherAPIURL
                .replace("{lat}",latitude)
                .replace("{lon}",longitude)
                .replace("{API key}",weatherAPIKey);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherCondition=data.weather[0].description;
            const weatherlocation=data.name;
            const temperature=data.main.temp;
    
            const celsiusweathertext=`The weather is ${weatherCondition} in ${weatherlocation} and it's ${temperature.toFixed(1)}°C outside.`;
            const fahrweathertext=`The weather is ${weatherCondition} in ${weatherlocation} and it's ${convertCtoF(temperature).toFixed(1)}°F outside.`;
    
    
            function convertCtoF(temperature){
                return (temperature*1.8)+32;
            }
    
            document.querySelector("#weather").innerHTML=celsiusweathertext;
            document.querySelector(".weather-group").addEventListener("click",function(e){
                if(e.target.id=="celsius"){
                    document.querySelector("#weather").innerHTML=celsiusweathertext;
                }else{
                    document.querySelector("#weather").innerHTML=fahrweathertext;
                }
            });
    
                
        });
        
    });
}
//Page loading Functions

menuhandler();
greetinghandler();
weatherhandler();
localtimehandler();
galleryhandler();
producthandler();
footerhandler();