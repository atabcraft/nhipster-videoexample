import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfileComponentsPage, ProfileDeleteDialog, ProfileUpdatePage } from './profile.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Profile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profileComponentsPage: ProfileComponentsPage;
  let profileUpdatePage: ProfileUpdatePage;
  let profileDeleteDialog: ProfileDeleteDialog;
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

  it('should load Profiles', async () => {
    await navBarPage.goToEntity('profile');
    profileComponentsPage = new ProfileComponentsPage();
    await browser.wait(ec.visibilityOf(profileComponentsPage.title), 5000);
    expect(await profileComponentsPage.getTitle()).to.eq('videoexampleApp.profile.home.title');
    await browser.wait(ec.or(ec.visibilityOf(profileComponentsPage.entities), ec.visibilityOf(profileComponentsPage.noResult)), 1000);
  });

  it('should load create Profile page', async () => {
    await profileComponentsPage.clickOnCreateButton();
    profileUpdatePage = new ProfileUpdatePage();
    expect(await profileUpdatePage.getPageTitle()).to.eq('videoexampleApp.profile.home.createOrEditLabel');
    await profileUpdatePage.cancel();
  });

  it('should create and save Profiles', async () => {
    const nbButtonsBeforeCreate = await profileComponentsPage.countDeleteButtons();

    await profileComponentsPage.clickOnCreateButton();

    await promise.all([
      profileUpdatePage.setImageInput(absolutePath),
      profileUpdatePage.userSelectLastOption()
      // profileUpdatePage.streamsSelectLastOption(),
    ]);

    expect(await profileUpdatePage.getImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected Image value to be end with ' + fileNameToUpload
    );

    await profileUpdatePage.save();
    expect(await profileUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Profile', async () => {
    const nbButtonsBeforeDelete = await profileComponentsPage.countDeleteButtons();
    await profileComponentsPage.clickOnLastDeleteButton();

    profileDeleteDialog = new ProfileDeleteDialog();
    expect(await profileDeleteDialog.getDialogTitle()).to.eq('videoexampleApp.profile.delete.question');
    await profileDeleteDialog.clickOnConfirmButton();

    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
