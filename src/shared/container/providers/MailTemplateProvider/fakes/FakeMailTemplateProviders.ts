import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProviders implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail';
  }
}

export default FakeMailTemplateProviders;
