const imgContainer = document.querySelector('.showcase > div');
const img = document.querySelector('.showcase img');
const shadow = document.querySelector('.shadow');

const thumb = document.querySelectorAll('.thumbs img');
const titleOverlay = document.querySelector('.titleOverlay');
const title = document.querySelector('.titleText');
const desc = document.querySelector('.description');

const sizes = document.querySelectorAll('.sizes > li');
const stars = document.querySelectorAll('.stars i');
const price = document.querySelector('.price');
const colorBtn = document.querySelectorAll('.color');

const pag = document.querySelectorAll('.pag');
const prev = document.querySelector('.arr-left');
const next = document.querySelector('.arr-right');
const shoeNum = document.querySelector('.shoe-num');
const shoeTotal = document.querySelector('.shoe-total');

let id = 1;
let colorType = 1;
let shoe = 1;

const colors = [
    [
        "#ae001b",
        "#111111"
    ],
    [
        "linear-gradient(0deg, orange, red)",
        "#bda08e"
    ],
    [
        "linear-gradient(0deg, #00b8ea 0%, #e6882d 50%, #e56da6 100%)",
        "linear-gradient(0deg, #dae766, #b2afaa)"
    ]
];

const prices = ["150", "250", "175"];

const names = [
    [
        "Red Nike Jordan Max Aura 3",
        "Black Nike Jordan Max Aura 3"
    ],
    [
        "Black/Orange Nike Air Max 95",
        "Beige/Gray Nike Air Max 95"
    ],
    [
        "Colorful NIKE Jordan Delta 2 SP",
        "Gray NIKE Jordan Delta 2 SP"
    ]
];

const descriptions = [
    [
        `Bring a piece of history to the
        city's urben streets as you walk 
        into Nike Jordan Max Aura 3 men's
        sneakers. Inspired by the rich Jordanian
        heritage, this model has the energy of
        basketball shoes and a look that changes
        the perceprtion of the classic style.`
    ],
    [
        `Nike Air Max 95 men's sneakers
        move you with the strength and fluidity
        inspired by the anamoty of the human body.
        The central sole forms the basis of these
        sneakers, while the structured side panels
        give a solid and stable construction.
        Flexible incisions in the sole allow
        your feet to move naturally`
    ],
    [
        `Jordan Delta 2 SP men's basketball
        shoes offer a fresh and fearless
        approach to the characteristics you want:
        durability, comfort and the attitude of
        the Jordan brand. The first model of
        Delta 2 sneakers, with the same idea,
        received redesigned lines and
        modified components.`
    ]
];
const ratings = [4, 5, 3];



function getImage(imgType, shoe, colorType, id, extension) {
    return "img/" + imgType + "/shoe" +
        shoe + "-" + colorType + "/img" + id +
        "." + extension;
}


function resetActive(element, elementClass, i) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove(elementClass + "-active");
    }
    element[i].classList.add(elementClass + "-active");
}

function animate(element, time, anim) {
    element.style.animation = anim;

    setTimeout(() => {
        element.style.animation = "none"
    }, time);
}

function assignColor(i, shoe) {
    colorBtn[i].style.background = colors[shoe - 1][i];
}

function resetStars(shoe) {
    for (let i = 0; i < stars.length; i++) {
        // stars[i].innerText = "star_outline";
    }
    for (let i = 0; i < ratings[shoe]; i++) {
        // stars[i].innerText = "star";
    }
}

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener('click', (e) => {
        resetActive(sizes, "size", i)
    })
}


shoeTotal.innerText = "0" + pag.length;
shoeNum.innerText = "0" + shoe;
price.innerText = "$" + prices[0];
resetStars(shoe - 1);
title.innerText = names[0][0];
desc.innerText = descriptions[0];

for (let i = 0; i < thumb.length; i++) {
    thumb[i].addEventListener('click', (e) => {
        // console.log('sdfadf');

        id = i + 1;


        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        )

        resetActive(thumb, "thumb", i);

        animate(imgContainer, 550, "fade 500ms ease-in-out");
    })
}

for (let i = 0; i < colorBtn.length; i++) {
    
    assignColor(i, shoe);
    
    colorBtn[i].addEventListener('click', () => {
        colorType = i + 1;
        
        setTimeout(() => {
           img.src = getImage(
               "showcase", shoe, colorType, id, "png"
           );
        }, 450);
        
        for (let i = 0; i < thumb.length; i++) {
            thumb[i].src = getImage(
                "thumbs", shoe, colorType, i + 1, "jpg"
            );
        }
        
        resetActive(colorBtn, "color", i);
        
        title.innerText = names[shoe - 1][i];
        
        animate(img, 550, "jump 500ms ease-in-out");
        animate(shadow, 550, "shadow 500ms ease-in-out");
        animate(titleOverlay, 850, "title 800ms ease");
    });
    
}


function slider(shoe) {
    
    setTimeout(() => {
       img.src = getImage(
           "showcase", shoe, colorType, id, "png"
       );
    }, 600);
    
    for (let i = 0; i < thumb.length; i++) {
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }
    
    for (let i = 0; i < colorBtn.length; i++) {
        assignColor(i, shoe);
    }
    
    resetActive(pag, "pag", shoe - 1);
    
    desc.innerText = descriptions[shoe - 1];
    title.innerText = names[shoe - 1][colorType - 1];
    price.innerText = "$" + prices[shoe - 1];
    resetStars(shoe - 1);
    shoeNum.innerText = "0" + shoe;
    
    animate(img, 1550, "replase 1.5s ease-in");
    animate(shadow, 1550, "shadow2 1.5s ease-in");
    animate(titleOverlay, 850, "title 800ms ease");
}

prev.addEventListener('click', () => {
    shoe--;
    
    if (shoe < 1) {
        shoe = pag.length;
    }
    
    slider(shoe)
})

next.addEventListener('click', () => {
    shoe++;
    
    if (shoe > pag.length) {
        shoe = 1;
    }
    
    slider(shoe)
})

for (let i = 0; i < pag.length; i++) {
    
    pag[i].addEventListener('click', () => {
        slider(i + 1)
        
        shoe = i + 1;
    })
}