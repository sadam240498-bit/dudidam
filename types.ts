export enum UserRole {
  PUBLIC = 'PUBLIC',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  nisn: string;
  class: string;
  major: string; // Jurusan
  dudi: string; // Dunia Usaha Dunia Industri
  supervisor: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'PERMISSION' | 'SICK';
  locationLat?: number;
  locationLng?: number;
  isVerified: boolean;
}

export interface DailyReport {
  id: string;
  studentId: string;
  date: string;
  duration: number; // in hours
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  attachmentUrl?: string; // Image URL
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  type: 'DEPARTURE' | 'PICKUP' | 'EXAM';
  description: string;
}
