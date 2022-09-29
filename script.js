// this is terrible
const baseSVG = `
<svg class="temperature" width="125" height="262" viewBox="0 0 125 262" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M75.4457 30.0293C75.4457 24.5713 73.2121 19.6048 69.6055 16.0054C66.0041 12.406 61.04 10.1685 55.5789 10.1685C50.1178 10.1685 45.1537 12.406 41.5471 16.0054C37.9457 19.6048 35.7121 24.5713 35.7121 30.0293V169.014C21.9467 176.07 12.5307 190.39 12.5307 206.913C12.5307 230.424 31.5984 249.481 55.1229 249.481C78.6424 249.481 97.71 230.424 97.71 206.913C97.71 190.759 88.709 176.71 75.4457 169.495V30.0293ZM96.3627 48.4309V39.2148H120.389C121.612 39.2148 122.785 39.7002 123.65 40.5644C124.514 41.4286 125 42.6007 125 43.8228C125 45.045 124.514 46.2171 123.65 47.0812C122.785 47.9454 121.612 48.4309 120.389 48.4309H96.3627ZM96.3627 73.591V64.3749H120.389C121.612 64.3749 122.785 64.8604 123.65 65.7245C124.514 66.5887 125 67.7608 125 68.9829C125 70.2051 124.514 71.3772 123.65 72.2413C122.785 73.1055 121.612 73.591 120.389 73.591H96.3627ZM96.3627 98.7511V89.535H120.389C121.612 89.535 122.785 90.0205 123.65 90.8847C124.514 91.7488 125 92.9209 125 94.1431C125 95.3652 124.514 96.5373 123.65 97.4015C122.785 98.2656 121.612 98.7511 120.389 98.7511H96.3627ZM96.3627 123.911V114.695H120.389C121.612 114.695 122.785 115.181 123.65 116.045C124.514 116.909 125 118.081 125 119.303C125 120.525 124.514 121.697 123.65 122.562C122.785 123.426 121.612 123.911 120.389 123.911H96.3627ZM96.3627 149.071V139.855H120.389C121.612 139.855 122.785 140.341 123.65 141.205C124.514 142.069 125 143.241 125 144.463C125 145.685 124.514 146.857 123.65 147.722C122.785 148.586 121.612 149.071 120.389 149.071H96.3627ZM85.6199 161.022C100.461 170.893 110.241 187.759 110.241 206.913C110.241 237.337 85.5635 262 55.1229 262C24.6773 262 0 237.337 0 206.913C0 187.37 10.1844 170.207 25.5328 160.428V30.0293C25.5328 21.7655 28.9139 14.2543 34.3545 8.81679C39.8002 3.37414 47.3104 0 55.5789 0C63.8422 0 71.3576 3.37414 76.8033 8.81679C82.2438 14.2543 85.6199 21.7655 85.6199 30.0293V161.022Z" fill="#F8F8F2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M63.791 176.822C76.875 180.58 86.4447 192.628 86.4447 206.913C86.4447 224.204 72.4232 238.217 55.123 238.217C37.8227 238.217 23.7961 224.204 23.7961 206.913C23.7961 192.633 33.3709 180.58 46.4498 176.822V%HEIGHT2%C46.4498 %HEIGHT% 63.791 %HEIGHT% 63.791 %HEIGHT2%.822Z" fill="%COLOR%"/>
</svg>
`;

Number.prototype.clamp = function(min, max) {
    return this < min ? min : this > max ? max : this;
}

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return ((this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).clamp(out_min < out_max ? out_min : out_max, out_min > out_max ? out_min : out_max);
}

const clockElement = document.getElementById("clock");

function showTime(){
    const date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    const time = h + ":" + m + ":" + s;
    clockElement.innerText = time;
    clockElement.textContent = time;

    setTimeout(showTime, 1000);
}

showTime();

const temperatures = [];
for (let component of document.getElementsByClassName("component")) {
    const newSvg = document.createElement("svg");
    component.appendChild(newSvg);
    temperatures.push(newSvg);
}

const MAX_TEMPERATURE = 20;
const MIN_TEMPERATURE = 160;

const MAX_COLOR = "#FF0000";
const MID_COLOR = "#FFA500";
const MIN_COLOR = "#00FF00";

const MAX_TEMPERATURE_NUM = 120;
const MIN_TEMPERATURE_NUM = 0;
const HALF_TEMPERATURE_NUM = (MAX_TEMPERATURE_NUM - MIN_TEMPERATURE_NUM) / 2;

// let up = true;
// let num = 0;
// let x = setInterval(() => {
//     if (num < MIN_TEMPERATURE_NUM || num > MAX_TEMPERATURE_NUM) up = !up;
//     num += (up ? 1 : -1);
//     updateTemperatures(num);
// }, 10);


for (let i = 0; i < temperatures.length; i++) {
    updateTemperatures(temperatures[i], Math.random() * MAX_TEMPERATURE_NUM);
}
function updateTemperatures(element, temperature) {
    const height = temperature.map(MIN_TEMPERATURE_NUM, MAX_TEMPERATURE_NUM, MIN_TEMPERATURE, MAX_TEMPERATURE);
    const c1 = temperature <= HALF_TEMPERATURE_NUM ? MIN_COLOR : MID_COLOR;
    const c2 = temperature <= HALF_TEMPERATURE_NUM ? MID_COLOR : MAX_COLOR;
    let percent = clampPercent(temperature / (MAX_TEMPERATURE_NUM - MIN_TEMPERATURE_NUM))
    if (percent > 0.5) percent -= 0.5;
    const blend = blendColors(c1, c2, percent.map(0, 0.5, 0, 1));
    element.innerHTML = baseSVG
        .replace(/%HEIGHT%/g, height)
        .replace(/%HEIGHT2%/g, height + 10)
        .replace(/%COLOR%/g, blend);
}

function clampPercent(num) {
    return num > 1 ? 1 : num < 0 ? 0 : num;
}

// blend two hex colors together by an amount
function blendColors(colorA, colorB, amount) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}
