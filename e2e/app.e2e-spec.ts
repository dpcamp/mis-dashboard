<<<<<<< HEAD
import { PqPage } from './app.po';

describe('pq App', () => {
  let page: PqPage;

  beforeEach(() => {
    page = new PqPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
=======
import { MisDashCliPage } from './app.po';

describe('mis-dash-cli App', () => {
  let page: MisDashCliPage;

  beforeEach(() => {
    page = new MisDashCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
>>>>>>> 840960a6b6c0072ff6fe83602ec7e5478bb957c8
  });
});
