const val = document.querySelector("#counter");

const increment = ()=>{
    let value = parseInt(val.innerText);
    value++;
    val.innerText=value;
}

const decrement = ()=>{
    let value = parseInt(val.innerText);
    value--;
    val.innerText=value;
}