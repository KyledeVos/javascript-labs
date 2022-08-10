//Script Controlling buttons on Front Page
/*
Tasks - Call Links at the top of the page
      - Call other HTML Pages for features
      - Control Search Bar
*/

//###################################################################
// OTHER WEBSITE LINKS
//###################################################################

//Mouse Hover Actions - Change Color of Font

//1) Instagram Link
let instagramLinkButtonFrontPage = document.getElementById("instagramLinkButtonFrontPage");

instagramLinkButtonFrontPage.addEventListener("mouseover", ()=>{
    instagramLinkButtonFrontPage.setAttribute("style", "color:rgb(217, 216, 216)")
});

instagramLinkButtonFrontPage.addEventListener("mouseout", ()=>{
    instagramLinkButtonFrontPage.setAttribute("style", "color:white")
});


//2) Facebook Link
let facebookLinkButtonFrontPage = document.getElementById("facebookLinkButtonFrontPage");

facebookLinkButtonFrontPage.addEventListener("mouseover", ()=>{
    facebookLinkButtonFrontPage.setAttribute("style", "color:rgb(217, 216, 216)")
});

facebookLinkButtonFrontPage.addEventListener("mouseout", ()=>{
    facebookLinkButtonFrontPage.setAttribute("style", "color:white")
});

//3) TikTok Link
let tikTokLinkButtonFrontPage = document.getElementById("tikTokLinkButtonFrontPage");

tikTokLinkButtonFrontPage.addEventListener("mouseover", ()=>{
    tikTokLinkButtonFrontPage.setAttribute("style", "color:rgb(217, 216, 216)")
});

tikTokLinkButtonFrontPage.addEventListener("mouseout", ()=>{
    tikTokLinkButtonFrontPage.setAttribute("style", "color:white")
});

//4) Gmail Link
let gmailLinkButtonFrontPage = document.getElementById("gmailLinkButtonFrontPage");

gmailLinkButtonFrontPage.addEventListener("mouseover", ()=>{
    gmailLinkButtonFrontPage.setAttribute("style", "color:rgb(217, 216, 216)")
});

gmailLinkButtonFrontPage.addEventListener("mouseout", ()=>{
    gmailLinkButtonFrontPage.setAttribute("style", "color:white")
});

//5) Canva Link
let canvaLinkButtonFrontPage = document.getElementById("canvaLinkButtonFrontPage");

canvaLinkButtonFrontPage.addEventListener("mouseover", ()=>{
    canvaLinkButtonFrontPage.setAttribute("style", "color:rgb(217, 216, 216)")
});

canvaLinkButtonFrontPage.addEventListener("mouseout", ()=>{
    canvaLinkButtonFrontPage.setAttribute("style", "color:white")
});

//###################################################################
// FEATURE OPTIONS - OTHER HTML PAGES IN DIRECTORY
//###################################################################

//1) New Product Link
let newProductLink = document.getElementById("newProductLink");
newProductLink.addEventListener("mouseover", ()=>{
    newProductLink.setAttribute("style", 
    "background-color: rgba(255,255,255, 0.2)");
})

newProductLink.addEventListener("mouseout", ()=>{
    newProductLink.setAttribute("style", "background-color:transparent;");
})

//2)  Create Order Link
let CreateOrderLink = document.getElementById("CreateOrderLink");
CreateOrderLink.addEventListener("mouseover", ()=>{
    CreateOrderLink.setAttribute("style", 
    "background-color: rgba(255,255,255, 0.2)");
})

CreateOrderLink.addEventListener("mouseout", ()=>{
    CreateOrderLink.setAttribute("style", "background-color:transparent;");
})

//3)  Current Products Link
let currentProductsLink = document.getElementById("currentProductsLink");
currentProductsLink.addEventListener("mouseover", ()=>{
    currentProductsLink.setAttribute("style", 
    "background-color: rgba(255,255,255, 0.2)");
})

currentProductsLink.addEventListener("mouseout", ()=>{
    currentProductsLink.setAttribute("style", "background-color:transparent;");
})

//4)  Price Check Link
let PriceCheckLink = document.getElementById("PriceCheckLink");
PriceCheckLink.addEventListener("mouseover", ()=>{
    PriceCheckLink.setAttribute("style", 
    "background-color: rgba(255,255,255, 0.2)");
})

PriceCheckLink.addEventListener("mouseout", ()=>{
    PriceCheckLink.setAttribute("style", "background-color:transparent;");
})

//4)  New Materials Link
let newMaterialsLink = document.getElementById("newMaterialsLink");
newMaterialsLink.addEventListener("mouseover", ()=>{
    newMaterialsLink.setAttribute("style", 
    "background-color: rgba(255,255,255, 0.2)");
})

newMaterialsLink.addEventListener("mouseout", ()=>{
    newMaterialsLink.setAttribute("style", "background-color:transparent;");
})


