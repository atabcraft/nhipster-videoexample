import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StreamComponentsPage, StreamDeleteDialog, StreamUpdatePage } from './stream.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Stream e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let streamComponentsPage: StreamComponentsPage;
  let streamUpdatePage: StreamUpdatePage;
  let streamDeleteDialog: StreamDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Streams', async () => {
    await navBarPage.goToEntity('stream');
    streamComponentsPage = new StreamComponentsPage();
    await browser.wait(ec.visibilityOf(streamComponentsPage.title), 5000);
    expect(await streamComponentsPage.getTitle()).to.eq('videoexampleApp.stream.home.title');
    await browser.wait(ec.or(ec.visibilityOf(streamComponentsPage.entities), ec.visibilityOf(streamComponentsPage.noResult)), 1000);
  });

  it('should load create Stream page', async () => {
    await streamComponentsPage.clickOnCreateButton();
    streamUpdatePage = new StreamUpdatePage();
    expect(await streamUpdatePage.getPageTitle()).to.eq('videoexampleApp.stream.home.createOrEditLabel');
    await streamUpdatePage.cancel();
  });

  it('should create and save Streams', async () => {
    const nbButtonsBeforeCreate = await streamComponentsPage.countDeleteButtons();

    await streamComponentsPage.clickOnCreateButton();

    await promise.all([streamUpdatePage.setNameInput('name'), streamUpdatePage.setBlobInput(absolutePath)]);

    expect(await streamUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await streamUpdatePage.getBlobInput()).to.endsWith(fileNameToUpload, 'Expected Blob value to be end with ' + fileNameToUpload);

    await streamUpdatePage.save();
    expect(await streamUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await streamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Stream', async () => {
    const nbButtonsBeforeDelete = await streamComponentsPage.countDeleteButtons();
    await streamComponentsPage.clickOnLastDeleteButton();

    streamDeleteDialog = new StreamDeleteDialog();
    expect(await streamDeleteDialog.getDialogTitle()).to.eq('videoexampleApp.stream.delete.question');
    await streamDeleteDialog.clickOnConfirmButton();

    expect(await streamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
