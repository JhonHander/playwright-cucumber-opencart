const BasePage = require('./BasePage');

/**
 * RegisterPage class represents the user registration page
 */
class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors for RegisterPage elements
    this.firstNameInput = '#input-firstname';
    this.lastNameInput = '#input-lastname';
    this.emailInput = '#input-email';
    this.telephoneInput = '#input-telephone';
    this.passwordInput = '#input-password';
    this.confirmPasswordInput = '#input-confirm';
    this.privacyPolicyCheckbox = 'input[name="agree"]';
    this.continueButton = 'input[type="submit"][value="Continue"]';
    this.newsletterSubscribeYes = 'input[name="newsletter"][value="1"]';
    this.newsletterSubscribeNo = 'input[name="newsletter"][value="0"]';
    this.firstNameError = '#input-firstname + .text-danger';
    this.lastNameError = '#input-lastname + .text-danger';
    this.emailError = '#input-email + .text-danger';
    this.telephoneError = '#input-telephone + .text-danger';
    this.passwordError = '#input-password + .text-danger';
    this.confirmPasswordError = '#input-confirm + .text-danger';
    this.successMessage = '#content p:nth-of-type(1)';
  }

  /**
   * Navigate to the registration page
   */
  async navigateToRegister() {
    await this.navigateTo('?route=account/register');
  }

  /**
   * Fill in registration form
   * @param {Object} userDetails - User registration details
   * @param {boolean} subscribe - Whether to subscribe to newsletter
   */
  async fillRegistrationForm(userDetails, subscribe = false) {
    await this.type(this.firstNameInput, userDetails.firstName);
    await this.type(this.lastNameInput, userDetails.lastName);
    await this.type(this.emailInput, userDetails.email);
    await this.type(this.telephoneInput, userDetails.telephone);
    await this.type(this.passwordInput, userDetails.password);
    await this.type(this.confirmPasswordInput, userDetails.password);
    
    if (subscribe) {
      await this.click(this.newsletterSubscribeYes);
    } else {
      await this.click(this.newsletterSubscribeNo);
    }
  }

  /**
   * Agree to privacy policy
   */
  async agreeToPrivacyPolicy() {
    await this.page.check(this.privacyPolicyCheckbox);
  }

  /**
   * Submit registration form
   */
  async submitRegistration() {
    await this.click(this.continueButton);
    // Esperar explícitamente la navegación a la página de éxito
    try {
      await this.page.waitForURL('**/index.php?route=account/success', { timeout: 15000, waitUntil: 'load' });
    } catch (e) {
      console.error(`Error esperando la URL de éxito del registro: ${e.message}. URL actual: ${this.page.url()}`);
    }
  }

  /**
   * Check if registration was successful
   * @returns {Promise<boolean>}
   */
  async isRegistrationSuccessful() {
    const successParagraphSelector = this.successMessage;
    const expectedTextStart = 'congratulations! your new account has been successfully created!';
    const contentSelector = '#content';

    try {
      // Asegurarse de que estamos en la página de éxito. Esto también está en submitRegistration, pero es una doble verificación.
      // Usar 'load' ya que 'networkidle' puede ser inestable.
      await this.page.waitForURL('**/index.php?route=account/success', { timeout: 15000, waitUntil: 'load' });
      console.log(`La URL actual es la página de éxito: ${this.page.url()}`);

      // Obtener directamente el contenido de texto. Las acciones del localizador de Playwright esperan automáticamente.
      // El timeout aquí se aplica a la acción del localizador en sí (esperar el elemento y obtener el texto).
      const message = await this.page.locator(successParagraphSelector).textContent({ timeout: 15000 });
      
      if (message === null) {
        console.error(`El párrafo de éxito "${successParagraphSelector}" fue encontrado por el localizador, pero su textContent es null.`);
        try {
            const contentHtml = await this.page.locator(contentSelector).innerHTML({ timeout: 2000 });
            console.error(`HTML de ${contentSelector} cuando el mensaje es null: ${contentHtml.substring(0, 500)}...`);
        } catch (diagError) {
            console.error(`Error de diagnóstico al obtener HTML de ${contentSelector}: ${diagError.message}`);
        }
        return false;
      }

      console.log(`Contenido de texto de "${successParagraphSelector}": "${message.trim()}"`);
      const isSuccess = message.trim().toLowerCase().startsWith(expectedTextStart);
      if (!isSuccess) {
          console.warn(`El contenido del mensaje "${message.trim()}" no coincide con el inicio esperado "${expectedTextStart}"`);
      }
      return isSuccess;

    } catch (error) {
      console.error(`Error en isRegistrationSuccessful: ${error.message}. URL actual: ${this.page.url()}`);
      try {
        const isContentVisible = await this.page.locator(contentSelector).isVisible({timeout: 1000});
        console.error(`¿Está "${contentSelector}" visible durante el error? ${isContentVisible}`);
        if(isContentVisible) {
          const contentHtml = await this.page.locator(contentSelector).innerHTML({ timeout: 2000 });
          console.error(`HTML de ${contentSelector} durante el error: ${contentHtml.substring(0, 1000)}...`);
        } else {
            console.error(`"${contentSelector}" no estaba visible durante el error.`);
        }
        
        const successLocator = this.page.locator(successParagraphSelector);
        const count = await successLocator.count();
        console.error(`Cantidad de elementos "${successParagraphSelector}": ${count}`);
        if (count > 0) {
            const isVisibleByLocator = await successLocator.isVisible({timeout:1000});
            console.error(`¿Está "${successParagraphSelector}" visible (locator.isVisible())? ${isVisibleByLocator}`);
            const innerHtml = await successLocator.innerHTML({timeout:1000}); // Usar innerHTML para ver la etiqueta en sí
            console.error(`InnerHTML de "${successParagraphSelector}": ${innerHtml}`);
            const textContentFromCatch = await successLocator.textContent({timeout:1000});
            console.error(`TextContent de "${successParagraphSelector}" en catch: ${textContentFromCatch}`);
        }
      } catch (diagError) {
        console.error(`Error de diagnóstico en el bloque catch de isRegistrationSuccessful: ${diagError.message}`);
      }
      return false;
    }
  }

  /**
   * Get all validation errors
   * @returns {Promise<Object>}
   */
  async getValidationErrors() {
    const errors = {};
    
    if (await this.isVisible(this.firstNameError)) {
      errors.firstName = await this.getText(this.firstNameError);
    }
      if (await this.isVisible(this.lastNameError)) {
      errors.lastName = await this.getText(this.lastNameError);
    }
    
    if (await this.isVisible(this.emailError)) {
      errors.email = await this.getText(this.emailError);
    }
    
    if (await this.isVisible(this.telephoneError)) {
      errors.telephone = await this.getText(this.telephoneError);
    }
    
    if (await this.isVisible(this.passwordError)) {
      errors.password = await this.getText(this.passwordError);
    }
    
    if (await this.isVisible(this.confirmPasswordError)) {
      errors.confirmPassword = await this.getText(this.confirmPasswordError);
    }
    
    return errors;
  }
  
  /**
   * Validate registration fields
   * @returns {Promise<Object>} - Validation errors
   */
  async validateRegistrationFields() {
    const errors = {};
    
    // Check each field for validation errors
    const visibleErrors = await this.page.$$('.text-danger:visible');
    
    for (const error of visibleErrors) {
      const errorMessage = await error.textContent();
      const previousElement = await error.evaluate(node => {
        const prevInput = node.previousElementSibling;
        return prevInput ? prevInput.id || prevInput.name : null;
      });
      
      if (previousElement) {
        errors[previousElement.replace('input-', '')] = errorMessage.trim();
      }
    }
    
    return errors;
  }
  
  /**
   * Get specific field error
   * @param {string} fieldName - Field name ('firstname', 'lastname', etc.)
   * @returns {Promise<string|null>} - Error message or null if no error
   */
  async getFieldError(fieldName) {
    const selector = `#input-${fieldName} + .text-danger`;
    
    if (await this.isElementVisible(selector)) {
      return this.webActions.getText(selector);
    }
    
    return null;
  }
}

module.exports = RegisterPage;
