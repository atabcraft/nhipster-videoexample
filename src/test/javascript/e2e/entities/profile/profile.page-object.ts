import { element, by, ElementFinder } from 'protractor';

export class ProfileComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile div table .btn-danger'));
  title = element.all(by.css('jhi-profile div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProfileUpdatePage {
  pageTitle = element(by.id('jhi-profile-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  imageInput = element(by.id('file_image'));

  userSelect = element(by.id('field_user'));
  streamsSelect = element(by.id('field_streams'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async streamsSelectLastOption(): Promise<void> {
    await this.streamsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async streamsSelectOption(option: string): Promise<void> {
    await this.streamsSelect.sendKeys(option);
  }

  getStreamsSelect(): ElementFinder {
    return this.streamsSelect;
  }

  async getStreamsSelectedOption(): Promise<string> {
    return await this.streamsSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProfileDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profile-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profile'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
