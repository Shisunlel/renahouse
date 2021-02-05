const form = document.getElementById('form');
const title = document.getElementById('title');
const moreImage = document.getElementById('add-more');
const imgTag = document.querySelector('#imageTag');

form.addEventListener('click', (e)=>{
    if(title)
        form.addEventListener('submit', ()=>{
            console.log("USER HAS CLICK SOMETHING");
        });
    else
        e.preventDefault();
}, false);

moreImage.addEventListener('click', ()=>{
    div = document.createElement('div');
    input = document.createElement('input');
    div.classList.add("form-group");
    imgTag.after(div);
    // class="form-control"
    // placeholder="image"
    // type="text"
    // name="house[image]"
    input.classList.add("form-control");
    input.setAttribute("placeholder", "image");
    input.setAttribute("type", "text");
    input.setAttribute("name", "house[image]");
    div.appendChild(input);
});