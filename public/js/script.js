const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
const selectLang = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");

selectLang.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id == 0 ? country_code == "id" ? "selected" : "" : country_code == "en" ? "selected" : "";
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectLang[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectLang[0].value = selectLang[1].value;
    selectLang[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
    }
});

console.log(fromText);

const translateHook = async () => {
    const fromLang = selectLang[0].value;
    const toLang = selectLang[1].value;
    const textTranslate = fromText.value;

    try {
        const response = await axios.post('/translate', {
            q: textTranslate,
            source_language: fromLang,
            target_language: toLang
        });
        console.log(response);
        toText.value = response.data.translated_text;
    } catch (error) {
        throw error;
    }
}

translateBtn.addEventListener("click", async () => {
    const fromLang = selectLang[0].value;
    const toLang = selectLang[1].value;
    // console.log(fromLang, toLang);
    const textTranslate = fromText.value;
    // console.log(textTranslate);
    try {
        const response = await axios.post('/translate', {
            q: textTranslate, // querry string
            source_language: fromLang,
            target_language: toLang
        });
        toText.value = response.data.translated_text;
    } catch (error) {
        throw error; s
    }
});

