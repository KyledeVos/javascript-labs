document.querySelectorAll(".playerGridElement").forEach(element=>{
    element.addEventListener("mouseover", ()=>{
        element.setAttribute("style", "color:red");
    })
})

document.querySelectorAll(".playerGridElement").forEach(element=>{
    element.addEventListener("mouseout", ()=>{
        element.setAttribute("style", "color:white");
    })
})

document.querySelectorAll(".playerGridElement").forEach(element=>{
    element.addEventListener("mousedown", ()=>{
        element.setAttribute("style", "color:white");
    })
})

function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragDrop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function changeBorderOnDrag(ev){
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");

}
