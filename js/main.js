import { name } from "./filter.js";

export const container = document.querySelector(".container");
const main = document.querySelector(".main");
const base = document.querySelector(".base");
const image = document.querySelector(".image_box");
const details = document.querySelector(".details_box");
const input = document.querySelector(".input");
const dark_btn = document.querySelector(".dark");
const light_btn = document.querySelector(".light");

dark_btn.addEventListener("click", () => {
    light_btn.style.display = "block";
    dark_btn.style.display = "none";
})
light_btn.addEventListener("click", () => {
    light_btn.style.display = "none";
    dark_btn.style.display = "block";
})

input.addEventListener("keydown", async function fn(e) {
    if (e.key === "Enter" && input.value && input.value !== " ") {
        if (container.innerHTML) {
            container.innerHTML = ``;
        }
        let input_content = input.value.trim().toLowerCase();
        name(input_content);
        input.value = "";
    }
})

export function getInfo(data) {
    const element = data[0];
    let formedPopulation = element.population.toLocaleString();
    container.innerHTML += `
        <div class="box">
            <img src="${element.flags.png}" alt="" class="flag">
            <div class="info">
                <h3 class="name">${element.name.official}</h3>
                <p class="pop"><b>Population:</b>${formedPopulation}</p>
                <p class="cont"><b>Region:</b>${element.region}</p>
                <p class="capital"><b>Capital:</b>${element.capital}</p>
            </div>
        </div>`

    container.addEventListener("click", () => {
        main.style.display = "none";
        base.style.display = "block";
        let back = document.querySelector(".exit");
        let borderCountries = element.borders
        let rightLang = Object.values(element.languages);
        let rightCurr = Object.values(element.currencies).map((curren) => (curren.name));
        image.innerHTML = `
            <img src="${element.flags.png}" alt="" class="flag">
        `
        details.innerHTML = `
            <div class="left_card">
                <h2>${element.name.common}</h2>
                <p><b>Native name:</b>${element.name.official}</p>
                <p><b>Population:</b>${formedPopulation}</p>
                <p><b>Region:</b>${element.region}</p>
                <p><b>Sub Region:</b>${element.subregion}</p>
                <p><b>Capital:</b>${element.capital}</p>
            </div>
            <div class="right_card">
                <p><b>Top Level Domain:</b>${element.tld}</p>
                <p><b>Currencies:</b>${rightCurr}</p>
                <p><b>Languages:</b>${rightLang.join(", ")}</p>
            </div>
            <div class="bottom_card">
            </div>
        `
        const borders = document.querySelector(".bottom_card");
        borderCountries.forEach(name => {
            console.log(borders);
            borders.innerHTML += `
                <button class="${name}">${name}</button>
            `
        });

        back.addEventListener("click", () => {
            location.reload();
        })
    });
}
class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "NOT FOUND EXCEPTION ERROR";
    }
}