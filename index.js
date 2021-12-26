let eyes = document.querySelectorAll(".eye");
console.log(eyes)
let eyeRect = eyes[0].getBoundingClientRect(); // we are taking just one eye that does not mean only one eye will rotate. We are taking just one as angle between eye and mouse curser for both the eyes will be same at any point as both the eyes height and width are same. We have set the property of class using javascript for CSS to capture both eyes at onces.

console.log(eyeRect);

let container = document.querySelector(".eyesContainer");
let containerRect = container.getBoundingClientRect();

document.body.addEventListener("mousemove", eyesFollow);

function eyesFollow(e){
    // console.log("Mouse moving!");
    requestAnimationFrame( () => {
        let xPos = e.pageX;
        let yPos = e.pageY;

        let elementCenterX = eyeRect.width / 2; // half of element on x axis to get center
        let elementCenterY = eyeRect.height / 2; // half of element on y axis to get center


        let xDiff = (eyeRect.x + elementCenterX) - xPos; // difference between mouse position and eye element position for x axis.
        let yDiff = (eyeRect.y + elementCenterY) - yPos; // difference between mouse position and eye element position for y axis.

        let angle = Math.atan2(yDiff, xDiff); // finding radian angle between mouse position and eye position 

        let degree = angle * 180 / Math.PI; // converting radian to degree
        // console.log(degree);

        container.style.setProperty("--eyeAngle", degree.toFixed(2) + "deg");

        // tilting the face relative to mouse cursur!!
        let mouseXRelativeToContainer = xPos - containerRect.x - containerRect.width / 2;
        let mouseYRelativeToContainer = yPos - containerRect.y - containerRect.height / 2;

        let containerXAngle = 60 * (mouseXRelativeToContainer / window.innerWidth) // value between 0 and 1
        let containerYAngle = -1 * 60 * (mouseYRelativeToContainer / window.innerHeight) // -1 because cartesian coordinates and rotation in the browser is a little bit different how you might think in the real world.

        container.style.setProperty("--xAngle", containerXAngle.toFixed(2) + "deg")
        container.style.setProperty("--yAngle", containerYAngle.toFixed(2) + "deg")
    });
}