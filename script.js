let skillBoxes = document.querySelectorAll(".skill-box");
let reviewWrappers = document.querySelectorAll(".rev-wrapper");
let testBtns = document.querySelectorAll(".btn-test");
let menu = document.querySelector(".menu-dropdown");
let menuIcon = document.querySelector(".menu-icon-container");

let reviewIdx = 1;
let caseIdx = 0
let currentWindow = window.innerWidth;
let firstReset = true;
let caseFromLeft = true;
let testTimeout = false;

function startAnimations(){
    let timeout = 250;
    document.querySelectorAll(".starter").forEach((starter, idx) => {
        setTimeout(() => {
            if(idx == 1 || idx == 3){
                starter.style.opacity = "0.8";
                starter.style.top = "0px";
            } else {
                starter.style.opacity = "1";
                starter.style.top = "0px";
            }
        }, timeout * (idx + 1));
    });
}
startAnimations();

document.addEventListener("keydown", (e) => {
    if(e.key == "w"){
        document.querySelector(".feat-title").style.top = "0px";
        setTimeout(() => {
            document.querySelector(".feat-vert").style.top = "0px";
        }, 200);
    }
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.top = "0px";
        if(entry.target.classList.contains("about-title") || entry.target.classList.contains("feat-title") || entry.target.classList.contains("case-title")){
            entry.target.style.opacity = "0.75";
        } else {
            entry.target.style.opacity = "1";
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});
document.querySelectorAll(".scroll-target, .scroll-target-2").forEach(target => {
    observer.observe(target);
});

skillBoxes.forEach((box, idx) => {
    if(idx == 1){
        box.style.backgroundColor = "hsl(33, 99%, 58%)";
        box.style.padding = "40px 25px"; 
        box.style.borderRadius = "14px"; 
        box.style.marginTop = "40px"; 
        box.style.borderBottom = "2px solid transparent"; 
        box.querySelector(".skill-para").style.color = "white";
        box.querySelector(".btn-skill").style.backgroundColor = "white";
        box.querySelector(".disc-txt").style.color = "black";
        box.querySelector(".disc-arr").style.color = "black";
        box.querySelector(".disc-arr").style.transform = "rotate(-45deg)";
    } 
    box.addEventListener("mouseenter", () => {
            box.style.backgroundColor = "hsl(33, 99%, 58%)";
            box.style.padding = "40px 25px"; 
            box.style.borderRadius = "14px"; 
            box.style.marginTop = "40px"; 
            box.style.borderBottom = "2px solid transparent"; 
            box.querySelector(".skill-para").style.color = "white";
            box.querySelector(".btn-skill").style.backgroundColor = "white";
            box.querySelector(".disc-txt").style.color = "black";
            box.querySelector(".disc-arr").style.color = "black";
            box.querySelector(".disc-arr").style.transform = "rotate(-45deg)";
    });
    box.addEventListener("mouseleave", () => {
            box.style.backgroundColor = "transparent";
            box.style.padding = "40px 0px"; 
            box.style.borderRadius = "0px"; 
            box.style.marginTop = "0px"; 
            box.style.borderBottom = "2px solid hsl(0, 0%, 11%)";
            box.querySelector(".skill-para").style.color = "hsl(0, 0%, 70%)";
            box.querySelector(".btn-skill").style.backgroundColor = "hsl(0, 0%, 11%)";
            box.querySelector(".disc-txt").style.color = "hsl(0, 0%, 50%)";
            box.querySelector(".disc-arr").style.color = "hsl(0, 0%, 50%)";
            box.querySelector(".disc-arr").style.transform = "rotate(0deg)";
    });
});

document.querySelectorAll(".feat-vert, .feat-hori").forEach(container => {
    container.addEventListener("mouseenter", () => {
        if(window.innerWidth > 1100){
            container.style.transform = "scale(0.92)";
            container.querySelector(".feat-arr-container").style.opacity = "1";
            container.querySelector(".feat-arr-container").style.transform = "scale(1)";
        }
    });
    container.addEventListener("mouseleave", () => {
        if(window.innerWidth > 1100){
            container.style.transform = "scale(1)";
            container.querySelector(".feat-arr-container").style.opacity = "0";
            container.querySelector(".feat-arr-container").style.transform = "scale(0)";
        }
    });
});

function switchReview(direction){if(!testTimeout){
    testTimeout = true;
    setTimeout(() => {testTimeout = false;}, 1000);
    let rightAmount = getWidth(window.innerWidth);
    let currentAmount = reviewWrappers[0].style.right;
    let currentNumber = Number(currentAmount.slice(0, currentAmount.indexOf("p")));
    if(direction == "right"){
        reviewIdx++;
        if(reviewIdx == 5){
            testBtns[1].classList.add("test-inactive");
            moveReviewWrappers((currentNumber + rightAmount) + "px");
        } else {
            testBtns[0].classList.remove("test-inactive");
            moveReviewWrappers((currentNumber + rightAmount) + "px");
        }
    } else if(direction == "left") {
        reviewIdx--;
        if(reviewIdx == 0){
            testBtns[0].classList.add("test-inactive");
            moveReviewWrappers((currentNumber - rightAmount) + "px");
        } else {
            testBtns[1].classList.remove("test-inactive");
            moveReviewWrappers((currentNumber - rightAmount) + "px");
        }
    }
}}
function moveReviewWrappers(amount){
    reviewWrappers.forEach((wrapper, idx) => {
        wrapper.style.right = amount;
        if(idx == reviewIdx){
            wrapper.style.opacity = "1";
        } else {
            wrapper.style.opacity = "1";
        }
    });
}
function getWidth(windowWidth){
    if(windowWidth <= 655){
        return 320;
    } else if(windowWidth <= 1550){
        return 530;
    } else {
        return 1190;
    }
}
function resetTest(){if(window.innerWidth != currentWindow || firstReset){
    testBtns.forEach(btn => {btn.classList.remove("test-inactive")});
    reviewIdx = 1;
    if(window.innerWidth <= 655){
        moveReviewWrappers("-480px");
    } else if(window.innerWidth <= 1550){
        moveReviewWrappers("-795px");
    } else {
        moveReviewWrappers("-1784px");
    }
    currentWindow = window.innerWidth;
    firstReset = false;
}}
resetTest(); // FIX INVIS
window.addEventListener("resize", resetTest);

function changeCases(boxElement, boxIndex){setInterval(() => {
    let imgSet = boxElement.querySelectorAll(".case-img");
    let newImg;
    let oldImg = imgSet[caseIdx];
    oldImg.style.opacity = "0";
    if(caseIdx == 2){
        newImg = imgSet[0]
    } else {
        newImg = imgSet[caseIdx + 1];
    }
    setTimeout(() => {
        oldImg.style.display = "none";
        newImg.style.display = "block";
        newImg.offsetWidth;
        newImg.style.opacity = "1";
        
        if(boxIndex == 2){
            if(caseIdx == 2){
                caseIdx = 0;
            } else {
                caseIdx++;
            }
        }
    }, 500);
}, 3200)}
document.querySelectorAll(".case-box").forEach((box, idx) => {
    setTimeout(() => {
        changeCases(box, idx);
    }, 2000 + (300 * 0));

    box.addEventListener("mouseenter", () => {
        box.querySelector(".case-arr-wrapper").style.backgroundColor = "hsl(33, 99%, 58%)";
        box.querySelector(".case-arr").style.transform = "rotate(-360deg)";
    });
    box.addEventListener("mouseleave", () => {
        box.querySelector(".case-arr-wrapper").style.backgroundColor = "hsl(0, 0%, 14%)";
        box.querySelector(".case-arr").style.transform = "rotate(0deg)";
    });
});

function openMenu(){
    menu.style.transition = "0.5s ease";
    menu.style.zIndex = "99";
    menu.style.transform = "scale(1)";
}
function closeMenu(){
    menu.style.transition = "0.3s ease";
    menu.style.zIndex = "-10";
    menu.style.transform = "scale(0)";
}