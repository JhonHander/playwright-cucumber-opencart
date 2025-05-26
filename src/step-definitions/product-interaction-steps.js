const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should see search results', async function () {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  
  // Comprobar que la página de resultados de búsqueda está cargada y no hay mensaje de "sin resultados"
  const noResults = await searchResultPage.hasNoResults();
  expect(noResults).toBe(false, 'Expected to see search results, but "no results" message was found.');

  // Comprobar que hay al menos un producto listado
  const resultCount = await searchResultPage.getResultCount();
  expect(resultCount).toBeGreaterThan(0, 'Expected to see search results, but no products were listed.');
  
  // Opcional: Verificar que la URL es la de búsqueda (puede ser redundante si el paso de búsqueda ya lo hace)
  // expect(this.page.url()).toContain('route=product/search');
});

Then('the search results should contain {string}', async function (expectedProductName) {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  const productNames = await searchResultPage.getProductNames();
  
  expect(productNames.length).toBeGreaterThan(0, 'Cannot check for product name, no products found in search results.');
  
  const found = productNames.some(name => name.toLowerCase().includes(expectedProductName.toLowerCase()));
  expect(found).toBe(true, `Expected search results to contain "${expectedProductName}", but it was not found in [${productNames.join(', ')}].`);
});

When('I sort the products from high to low price', async function () {
  const searchResultPage = this.pageFactory.getSearchResultPage();
  // El texto exacto puede variar. Comunes son: 'Price (High > Low)', 'Price (Highest)', 'Precio (Alto > Bajo)'
  // Si esto falla, verificaremos el texto exacto en la UI.
  await searchResultPage.sortBy('Price (High > Low)'); 
  // Agregar una pequeña espera para que la clasificación se aplique visualmente si es necesario
  await this.page.waitForTimeout(1000); // Considerar reemplazar con esperas más explícitas si es posible
});

Then('I should see a success message that the product was added', async function () {
  const alertSelector = '.alert-success'; // Selector común para mensajes de éxito
  const alertLocator = this.page.locator(alertSelector);

  try {
    // Esperar a que el localizador apunte a un elemento visible
    await alertLocator.waitFor({ state: 'visible', timeout: 10000 });
  } catch (e) {
    throw new Error(`Success message alert ("${alertSelector}") did not become visible after 10 seconds. Error: ${e.message}`);
  }
  
  const alertText = await alertLocator.textContent();
  
  // Verificar que alertText no sea null, undefined, o una cadena vacía (después de trim)
  expect(alertText && alertText.trim() !== '', `Success message alert was found ("${alertSelector}"), but it was empty or contained only whitespace. Actual text: "${alertText}"`).toBe(true);
  
  // Verificar que el texto contenga un mensaje típico de éxito al añadir al carrito
  const expectedMessageFragment = 'Success: You have added';
  const expectedEndFragment = 'to your shopping cart';

  console.log(`Actual success message: "${alertText}"`);
  // Las aserciones toContain ya manejan el caso de que alertText sea null o undefined de forma segura.
  expect(alertText.toLowerCase()).toContain(expectedMessageFragment.toLowerCase(), `Success message did not contain "${expectedMessageFragment}".`);
  expect(alertText.toLowerCase()).toContain(expectedEndFragment.toLowerCase(), `Success message did not contain "${expectedEndFragment}".`);
});

When('I view my shopping cart', async function () {
  const cartPage = this.pageFactory.getCartPage();
  await cartPage.navigateToCart();
  await this.page.waitForLoadState('domcontentloaded'); // Esperar a que el DOM del carrito cargue
});

Then('I should see the product in my cart', async function () {
  const cartPage = this.pageFactory.getCartPage();
  const productNamesInCart = await cartPage.getProductNames();

  // Usar el nombre guardado en pasos anteriores (ya sea por 'I add the first product' o 'I have added an {string}')
  const expectedProductName = this.testData.lastAddedProductName || this.testData.productAdded;
  
  expect(expectedProductName && typeof expectedProductName === 'string' && expectedProductName.trim() !== '', 
    'No valid product name was stored from previous steps (this.testData.lastAddedProductName or this.testData.productAdded). Check if it was set and not empty.').toBe(true);
  
  expect(productNamesInCart.length).toBeGreaterThan(0, 'Cart is empty, cannot check for product.');
  
  const found = productNamesInCart.some(name => name.toLowerCase().includes(expectedProductName.toLowerCase()));
  expect(found).toBe(true, `Expected to find "${expectedProductName}" in cart, but it was not found in [${productNamesInCart.join(', ')}].`);
});

Then('I should see {int} products in my cart', async function (expectedCount) {
  const cartPage = this.pageFactory.getCartPage();
  // Asegurarse de que estamos en la página del carrito, o navegar si es necesario (opcional, el paso anterior podría ya hacerlo)
  // await cartPage.navigateToCart(); 
  const actualCount = await cartPage.getItemCount();
  expect(actualCount).toBe(expectedCount, `Expected ${expectedCount} products in cart, but found ${actualCount}.`);
});

// Próximos pasos a implementar aquí... 