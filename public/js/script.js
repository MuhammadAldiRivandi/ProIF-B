const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchageIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select");
  selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
      let selected =
        id == 0 
          ? country_code == "id"
            ? "selected"
            : ""
          : country_code == "en"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });
  
exchageIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("change", (event) => {
  console.log("changed from text");
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});


const translateHook = async () => {
  const fromLang = selectTag[0].value;
  const toLang = selectTag[1].value;
  const textTranslate = fromText.value;
  
  try {
    const response = await axios.post("/translate", {
      q: textTranslate,
      source_language: fromLang,
      target_language: toLang,
    });
    toText.value = response.data.translated_text;
  } catch (error) {
    throw error;
  }
};

selectTag.addEventListener("change", async () => {
  try {
    await translateHook();
  } catch (error) {
    throw error;
  }
});
