const form = document.getElementById('form');
const title = document.getElementById('title');
const moreImage = document.getElementById('add-more');
const imgTag = document.querySelector('#imageTag');
const sticky = document.querySelector('#sticky-fluid');
const footer = document.querySelector('footer');

if(form){
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
    input.setAttribute("name", "image");
    div.appendChild(input);
});
}

if(sticky){
    window.addEventListener('scroll', function(e){
        let pageHeight = window.screen.height;
        let scrollY = window.scrollY;
        let minimumHeight = pageHeight - pageHeight * 0.8;
        let footerPos = footer.offsetTop;
        let fadeAgain = footerPos - scrollY;
        if(scrollY > minimumHeight){
            sticky.classList.remove('sticky-hide');
            sticky.classList.add('sticky-show');
        }else{
            sticky.classList.add('sticky-hide');
            sticky.classList.remove('sticky-show');
        }
        if(fadeAgain <= 800){
            sticky.classList.remove('sticky-show');
            sticky.classList.add('sticky-hide');
        }
    });
}