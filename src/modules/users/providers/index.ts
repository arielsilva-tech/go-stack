import { container } from 'tsyringe';

import IHasprovider from './HashProvider/models/IHasprovider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHasprovider>('Hasprovider', BCryptHashProvider);
