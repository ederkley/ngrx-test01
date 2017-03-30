import { Redux02Page } from './app.po';

describe('redux02 App', () => {
  let page: Redux02Page;

  beforeEach(() => {
    page = new Redux02Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
