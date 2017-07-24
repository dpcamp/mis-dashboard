<<<<<<< HEAD
import { browser, element, by } from 'protractor';

export class PqPage {
=======
import { browser, by, element } from 'protractor';

export class MisDashCliPage {
>>>>>>> 840960a6b6c0072ff6fe83602ec7e5478bb957c8
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
