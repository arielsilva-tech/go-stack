import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../Models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private message: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.message.push(message);
  }
}
