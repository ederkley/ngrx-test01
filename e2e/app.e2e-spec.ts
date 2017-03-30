import { NgrxTest01Page } from './app.po';

describe('ngrx-test01 App', () => {
  let page: NgrxTest01Page;

  beforeEach(() => {
    page = new NgrxTest01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
