import * as data from "../helpers/default_data.json" 
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

   beforeEach('Вход на сайт и проверка кнопки восстановления пароля', function () {
    cy.visit('/'); // Вход на сайт
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка кнопки восстановления пароля
   });

   afterEach('Проверка наличия и видимости крестика в окне результата', function () {
    cy.get(result_page.close).should('be.visible');
   })

    it('Позитивный кейс авторизации', function () {
         cy.get(main_page.email).type(data.login); // Ввод логина
         cy.get(main_page.password).type(data.password); // Ввод пароля
         cy.get(main_page.login_button).click(); // Клик по кнопке "Войти"
         cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
     })

     it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Клик по кнопке восстановления пароля
        cy.get(recovery_page.email).type('emailemail@gmail.com'); // Ввод любой почты
        cy.get(recovery_page.send_button).click(); // Клик по кнопке "Отправить код"
        cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
    })

    it('Негативный кейс авторизации "НЕправильный пароль"', function () {
        cy.get(main_page.email).type(data.login); // Ввод логина
        cy.get(main_page.password).type('DsdasddaS7'); // Ввод НЕправильного пароля
        cy.get(main_page.login_button).click(); // Клик по кнопке "Войти"
        cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
    })

    it('Негативный кейс авторизации "НЕправильный логин"', function () {
        cy.get(main_page.email).type('emailemail@gmail.com'); // Ввод НЕправильного логина
        cy.get(main_page.password).type(data.password); // Ввод пароля
        cy.get(main_page.login_button).click(); // Клик по кнопке "Войти"
        cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
    })

    it('Негативный кейс авторизации "логин без @"', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввод логина без @
        cy.get(main_page.password).type(data.password); // Ввод пароля
        cy.get(main_page.login_button).click(); // Клик по кнопке "Войти"
        cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
    })

    it('Проверка на приведение к строчным буквам в логине', function () { 
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввод логина Верхним и Нижним регистром
        cy.get(main_page.password).type(data.password); // Ввод пароля
        cy.get(main_page.login_button).click(); // Клик по кнопке "Войти"
        cy.get(result_page.title).should('be.visible'); // Проверка наличия окна результата
    }) // ----> Проверить, что авторизация успешна (нужный текст и наличие кнопки крестик)
 })
