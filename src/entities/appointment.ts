export interface AppointmentProps {
   customer: string
   startsAt: Date
   endsAt: Date
}

export class Appointment {
  private props: AppointmentProps
  constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props
    if (startsAt < new Date()) {
      throw new Error('Invalid startDate')
    }
    if (endsAt <= startsAt) {
      throw new Error('Invalid endDate')
    }
    this.props = props
  }

  get customer (): string {
    return this.props.customer
  }

  get startsAt (): Date {
    return this.props.startsAt
  }

  get endsAt (): Date {
    return this.props.endsAt
  }
}
