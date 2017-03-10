import { SeedshopGUIPage } from './app.po';

describe('seedshop-gui App', () => {
  let page: SeedshopGUIPage;

  beforeEach(() => {
    page = new SeedshopGUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
