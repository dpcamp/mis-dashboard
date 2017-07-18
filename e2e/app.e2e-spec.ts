import { MisDashCliPage } from './app.po';

describe('mis-dash-cli App', () => {
  let page: MisDashCliPage;

  beforeEach(() => {
    page = new MisDashCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
