import Appointment from '../model/appointment';
//import { isEqual } from 'date-fns';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    private appointments: Appointment[];

    public async findByDate(date: Date): Promise<Appointment | null>{
        // const findAppointment= this.appointments.find(appointmet => 
        //     isEqual(date, appointmet.date));

        const findAppointment = await this.findOne({
            where: {date},
        });
            return findAppointment || null;
    }

}

export default AppointmentsRepository;