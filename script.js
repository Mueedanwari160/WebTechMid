const faqToggles = document.querySelectorAll(".faq-toggle");

function toggleDropdown(faq) {
  faq.classList.toggle("active");
}

function removeDropdown(faq) {
  faq.remove();
}

function closeOtherDropdowns(excludedFaq) {
  faqToggles.forEach((toggle) => {
    const faqContainer = toggle.closest(".faq");
    if (faqContainer !== excludedFaq) {
      faqContainer.classList.remove("active");
    }
  });
}

faqToggles.forEach((toggle, index) => {
  toggle.addEventListener("click", (event) => {
    const faqContainer = toggle.closest(".faq");

    closeOtherDropdowns(faqContainer);
    toggleDropdown(faqContainer);

    event.stopPropagation();
  });

  const closeButton = toggle.querySelector(".fa-times");
  closeButton.addEventListener("click", (event) => {
    const faqContainer = toggle.closest(".faq");
    removeDropdown(faqContainer);
    event.stopPropagation();
  });
});

const addNewDropdownButton = document.getElementById("addNewDropdown");

function addNewDropdown(question, answer) {
  const faqContainer = document.querySelector(".faq-container");

  const newFaq = document.createElement("div");
  newFaq.className = "faq";
  newFaq.innerHTML = `
    <h3 class="faq-title">${question}</h3>
    <p class="faq-text">${answer}</p>
    <button class="faq-toggle">
      <i class="fas fa-chevron-down"></i>
      <i class="fas fa-times"></i>
    </button>
  `;

  newFaq.querySelector(".faq-toggle").addEventListener("click", (event) => {
    closeOtherDropdowns(newFaq);
    toggleDropdown(newFaq);
    event.stopPropagation();
  });

  newFaq.querySelector(".fa-times").addEventListener("click", (event) => {
    removeDropdown(newFaq);
    event.stopPropagation();
  });
  faqContainer.appendChild(newFaq);
}

addNewDropdownButton.addEventListener("click", () => {
  const newQuestionInput = document.getElementById("newQuestion");
  const newAnswerInput = document.getElementById("newAnswer");
  const newQuestion = newQuestionInput.value;
  const newAnswer = newAnswerInput.value;

  if (newQuestion && newAnswer) {
    addNewDropdown(newQuestion, newAnswer);
    newQuestionInput.value = "";
    newAnswerInput.value = "";
  }
});
