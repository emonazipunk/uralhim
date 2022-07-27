// import { faker } from "@faker-js/faker/locale/ru";
// faker.locale = 'ru';

import {
  finance,
  name,
  word,
  lorem,
  internet
} from "@faker-js/faker/locale/ru";

describe("Тесты на регистрацию", () => {
  it("Отправка заявки на регистрацию", () => {

    // объявляем переменные с информацией для заявки

    let lastName = name.lastName()
    let firstName = name.firstName()
    let patronymic = word.adverb()
    let jobTitle = word.adverb()
    let inn = 1215008160
    let website = internet.domainName()
    let email = internet.email()
    let phone = 7 + finance.mask(10)
    let comment = lorem.paragraph()
    let acceptCode = finance.amount(1000,100000, 0)

    cy.visit("https://lk.uralchem.ru/");
    cy.get(".h-link--lk > a").click();
    cy.get(".btn--t-green").click();
    cy.url().should("include", "/register/");
    cy.get("#form_text_47186").should('be.empty').type(lastName);
    cy.get('#form_text_47187').should('be.empty').type(firstName);
    cy.get('#form_text_47188').should('be.empty').type(patronymic);
    cy.get('#form_text_47189').should('be.empty').type(jobTitle);
    cy.get('[data-country-input=""]').should('be.empty').click();
    cy.get('[data-name="Россия"]').click();
    cy.get('#form_text_24').invoke('prop', 'readOnly').should('eq', true)
    cy.get('#form_text_23').should('be.empty').type(inn);
    cy.contains('БИОМАШПРИБОР').click();
    cy.get('#form_text_21').should('have.value', 'АО "БИОМАШПРИБОР"');
    cy.get('#form_text_24').invoke('prop', 'valueAsNumber').should('eq', 121501001)
    cy.get('.label').should('be.empty').click();
    cy.get('.last').click();
    cy.get('#form_text_47194').should('be.empty').click();
    cy.get('[data-name="Магаданская область"]').click();
    cy.get('#form_text_31').should('be.empty').type(website);
    cy.get('[data-form-field-email=""]').should('be.empty').type(email);
    cy.get('[data-email-code=""]').should('be.empty').type(acceptCode);
    cy.get('[data-form-field-phone=""]').should('be.empty').type(phone);
    cy.get('[data-phone-code=""]').should('be.empty').type(acceptCode + 1);
    cy.get('#form_textarea_47197').should('be.empty').type(comment);
    cy.get('[data-agree-submit="3"]').should('be.disabled')
    cy.get('.b-checkbox__box').click()
    cy.get('[data-agree-submit="3"]').should('not.be.disabled').click()

    cy.get('[data-email-input=""][data-form-item=""] > [data-error-item="email_code"]')
    .invoke('prop', 'innerText')
    .should('eq', 'E-mail не подтверждён')
    cy.get('[data-phone-input=""][data-form-item=""] > [data-error-item="ph_code"]')
    .invoke('prop', 'innerText')
    .should('eq', 'Телефон не подтверждён')
  });
});
