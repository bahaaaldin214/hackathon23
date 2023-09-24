function randomID(){
    return Math.ceil(Math.random()*1000000) // get a random number betweeen 1 and 1 million
}

function selector(...args){
    const r = []
    args.forEach(i => {r.push(document.querySelector(i))})
    return r
}

function makeSpan(text, className){
    const span = document.createElement("p");

    span.textContent =  `${text}`; //can customize furthor

    span.classList.add(className);
    console.log(span.class)
    return span;
}

const colors = {
    front: {
        "0,255,85": "forearms",
        "255,0,29": "shoulders",
        "42,0,255": "chest",
        "0,255,255": "biceps",
        "255,255,0": "abs",
        "255,0,170": "quads"
    },
    back: {
        "255,0,16": "triceps",
        "170,255,0": "lats",
        "186,0,255": "glutes",
        "255,0,216": "calves"
    }
};

export {
    randomID,
    selector,
    makeSpan,
    colors
}
