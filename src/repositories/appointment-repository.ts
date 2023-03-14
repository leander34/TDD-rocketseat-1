import { Appointment } from '../entities/appointment'

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlappingAppointment(startAt: Date, endsAt: Date): Promise<Appointment | null>
}
