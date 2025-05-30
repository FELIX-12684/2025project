const main = document.querySelector("#main");
const scene = document.querySelector(".scene");
const carousel = document.querySelector(".carousel");
const carouselCard = document.querySelectorAll(".carousel-card");
const numCards = carouselCard.length;
const angleStep = 360 / numCards;

let angle = 0;
let index = 0;
let nowZome = 100; // 현재 비율
let isClicked = false;

// 회전각도 구하기
const rotateAngle = angleStep;

// Math.tan를 사용 => 각도를 라디안 값으로 변환
const radian = ((rotateAngle / 2) * Math.PI) / 180;

// 각 card의 width
const cardWidth = 400;

//원의 중심점에서 떨어진 거리 구하기 (밑변의 길이 / tan(각도에 해당하는 라디안))
const translateZ = Math.round(cardWidth / 2 / Math.tan(radian));

// 초기 셀 각도 및 중심점에서 떨어진 거리 세팅
carouselCard.forEach((card, i) => {
    const angle = i * angleStep;
    card.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;
});

function zoomIn(clickedIndex) {
    const targetAngle = clickedIndex * rotateAngle;

    let diff = targetAngle - angle;

    // 최소 회전 방향 계산
    if (diff > 180) {
        diff -= 360;
    }

    if (diff < -180) {
        diff += 360;
    }

    angle += diff;
    carousel.style.transform = `rotateY(${-angle}deg)`;

    carouselCard.forEach((card, i) => {
        card.style.transition = "transform 0.5s";
        card.style.transform = `rotateY(${i * angleStep}deg) translateZ(${translateZ}px) scale(1)`;
    });

    setTimeout(() => {
        carouselCard[clickedIndex].style.transform = `rotateY(${
            clickedIndex * angleStep
        }deg) translateZ(${translateZ}px) scale(${(window.innerWidth * 0.5) / cardWidth})`;
        carouselCard[clickedIndex].style.zIndex = 9999;
        main.style.filter = "blur(3px)"; // 흐림 처리
        main.style.pointerEvents = "none"; // inactive mouse event
    }, 500);
}

function zoomOut(clickedIndex) {
    const targetAngle = clickedIndex * rotateAngle;

    let diff = targetAngle - angle;

    // 최소 회전 방향 계산
    if (diff > 180) {
        diff -= 360;
    }

    if (diff < -180) {
        diff += 360;
    }

    angle += diff;
    carousel.style.transform = `rotateY(${-angle}deg)`;

    carouselCard.forEach((card, i) => {
        card.style.transition = "transform 0.5s";
        card.style.transform = `rotateY(${i * angleStep}deg) translateZ(${translateZ}px) scale(1)`;
    });

    setTimeout(() => {
        carouselCard[clickedIndex].style.transform = `rotateY(${
            clickedIndex * angleStep
        }deg) translateZ(${translateZ}px) scale(1)`;
        main.style.filter = "none"; // 흐림 처리 해제
        main.style.pointerEvents = "auto"; // active mouse event
    }, 500);
}

carouselCard.forEach((card, i) => {
    card.addEventListener("click", function () {
        if (!isClicked) {
            zoomIn(i);
            isClicked = true;
        } else {
            zoomOut(i);
            isClicked = false;
        }
    });
});
