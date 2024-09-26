
var h2 = document.querySelector("h2");

var h2T = h2.textContent;

var splittedtext = h2T.split("");

var half = splittedtext.length / 2;

var clutter1 = "";
splittedtext.forEach(function(e, idx) {
  if (idx < half) {
    clutter1 += `<span class="a">${e}</span>`;
  } else {
    clutter1 += `<span class="b">${e}</span>`;
  }
});


h2.innerHTML = clutter1;

gsap.from("h2 .a", {
  y: 50,
  duration: 0.8,
  delay: 0.5,
  stagger: 0.15,
  opacity: 0
});
gsap.from("h2 .b", {
  y: 50,
  duration: 0.8,
  delay: 0.5,
  stagger: -0.15,
  opacity: 0
});
document.getElementById('btn1').addEventListener('click', () => {
    let a = document.body.style.backgroundColor;
    let cards = document.getElementsByClassName('card'); 
    let n = document.getElementById('n');
    let list = document.getElementById('list');

    // Check for the default background color
    if (a === 'white' || a === '' || a === 'rgb(255, 255, 255)') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        n.style.backgroundColor = 'black';
        // f.style.backgroundColor = 'black'; // Remove or comment out if `f` does not exist
        list.style.backgroundColor = 'rgba(0, 0, 0, 0.274)';
        list.style.backdropFilter = 'blur(10px)';  // Fixed: added quotes

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "black";
        }
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        n.style.backgroundColor = 'white';
        // f.style.backgroundColor = 'white'; // Remove or comment out if `f` does not exist
        list.style.backgroundColor = 'rgba(165, 42, 42, 0.045)';
        list.style.backdropFilter = 'blur(10px)';  // Fixed: added quotes

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = "white";
        }
    }
});

window.addEventListener("wheel",function(dets){
    if(dets.deltaY >0){
    gsap.to(".marque",{
        transform:'translateX(-200%)',
        duration:4,
        repeat:-1,
        ease:"none"
    })
    gsap.to(".marque img",{
    rotate:180
    })
    }
    else{
        gsap.to(".marque",{
            transform:'translateX(0%)',
            duration:4,
            repeat:-1,
            ease:"none"
        })
        gsap.to(".marque img",{
            rotate:0
            })
    }
    })
