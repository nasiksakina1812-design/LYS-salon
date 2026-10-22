export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  category: string;
  description?: string;
  sensoryNotes?: string[];
}

export interface ServiceCategory {
  number: string;
  title: string;
  summary: string;
  services: ServiceItem[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  serviceCategory: string;
  comment: string;
  verified: boolean;
}

export interface BookingState {
  category: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  timeSlot: string;
  aromatherapy: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}
