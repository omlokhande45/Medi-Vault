export interface User {
  id: string;
  type: 'patient' | 'doctor';
  email: string;
  name: string;
  phone?: string;
  dateOfBirth: string;
  place: string;
  createdAt: string;
}

export interface Patient extends User {
  type: 'patient';
  phone: string;
  age: number;
  bloodGroup: string;
  height?: number;
  weight?: number;
  bloodPressure?: string;
  spo2?: number;
  eyeSight?: string;
  sleepSchedule?: string;
  medicalHistory?: string;
  allergies?: string;
  isDonor?: boolean;
}

export interface Doctor extends User {
  type: 'doctor';
  uid: string;
  hospitalName: string;
  speciality: string;
}

export interface PatientRegistrationData extends Omit<Patient, 'id' | 'createdAt'> {
  password: string;
}

export interface DoctorRegistrationData extends Omit<Doctor, 'id' | 'createdAt'> {
  password: string;
}

const STORAGE_KEYS = {
  USERS: 'medivault_users',
  CURRENT_USER: 'medivault_current_user',
  PATIENT_REPORTS: 'medivault_patient_reports',
  BLOOD_DONORS: 'medivault_blood_donors',
  BLOOD_REQUESTS: 'medivault_blood_requests',
};

export class AuthService {
  static getUsers(): (Patient | Doctor)[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: (Patient | Doctor)[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static getCurrentUser(): (Patient | Doctor) | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: Patient | Doctor): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  static registerPatient(data: PatientRegistrationData): { success: boolean; message: string; user?: Patient } {
    const users = this.getUsers();
    
    // Check if email or phone already exists
    const existingUser = users.find(u => u.email === data.email || (u.type === 'patient' && u.phone === data.phone));
    if (existingUser) {
      return { success: false, message: 'Email or phone number already registered' };
    }

    const newPatient: Patient = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      age: data.age,
      place: data.place,
      bloodGroup: data.bloodGroup,
      type: data.type,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users.push(newPatient);
    this.saveUsers(users);
    
    return { success: true, message: 'Registration successful', user: newPatient };
  }

  static registerDoctor(data: DoctorRegistrationData): { success: boolean; message: string; user?: Doctor } {
    const users = this.getUsers();
    
    // Check if email or UID already exists
    const existingUser = users.find(u => u.email === data.email || (u.type === 'doctor' && u.uid === data.uid));
    if (existingUser) {
      return { success: false, message: 'Email or UID already registered' };
    }

    const newDoctor: Doctor = {
      name: data.name,
      email: data.email,
      uid: data.uid,
      dateOfBirth: data.dateOfBirth,
      place: data.place,
      hospitalName: data.hospitalName,
      speciality: data.speciality,
      type: data.type,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users.push(newDoctor);
    this.saveUsers(users);
    
    return { success: true, message: 'Registration successful', user: newDoctor };
  }

  static loginPatient(identifier: string, password: string): { success: boolean; message: string; user?: Patient } {
    const users = this.getUsers();
    const user = users.find(u => 
      u.type === 'patient' && 
      (u.email === identifier || (u as Patient).phone === identifier)
    ) as Patient;

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // In real app, you'd hash and compare passwords
    return { success: true, message: 'Login successful', user };
  }

  static loginDoctor(uid: string, password: string): { success: boolean; message: string; user?: Doctor } {
    const users = this.getUsers();
    const user = users.find(u => u.type === 'doctor' && (u as Doctor).uid === uid) as Doctor;

    if (!user) {
      return { success: false, message: 'Doctor not found' };
    }

    // In real app, you'd hash and compare passwords
    return { success: true, message: 'Login successful', user };
  }

  static updatePatient(patientId: string, updates: Partial<Patient>): { success: boolean; message: string; user?: Patient } {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === patientId);
    
    if (userIndex === -1) {
      return { success: false, message: 'Patient not found' };
    }

    const updatedUser = { ...users[userIndex], ...updates } as Patient;
    users[userIndex] = updatedUser;
    this.saveUsers(users);
    
    // Update current user if it's the same
    const currentUser = this.getCurrentUser();
    if (currentUser?.id === patientId) {
      this.setCurrentUser(updatedUser);
    }

    return { success: true, message: 'Profile updated successfully', user: updatedUser };
  }
}

export class DataService {
  static getPatientReports(): any[] {
    const reports = localStorage.getItem(STORAGE_KEYS.PATIENT_REPORTS);
    return reports ? JSON.parse(reports) : [];
  }

  static savePatientReport(patientId: string, report: any): void {
    const reports = this.getPatientReports();
    const existingIndex = reports.findIndex(r => r.patientId === patientId);
    
    const newReport = {
      patientId,
      report,
      generatedAt: new Date().toISOString(),
      qrCode: `medivault://patient/${patientId}/report/${Date.now()}`,
    };

    if (existingIndex >= 0) {
      reports[existingIndex] = newReport;
    } else {
      reports.push(newReport);
    }

    localStorage.setItem(STORAGE_KEYS.PATIENT_REPORTS, JSON.stringify(reports));
  }

  static getPatientReport(patientId: string): any | null {
    const reports = this.getPatientReports();
    const report = reports.find(r => r.patientId === patientId);
    return report || null;
  }

  static getBloodDonors(): any[] {
    const donors = localStorage.getItem(STORAGE_KEYS.BLOOD_DONORS);
    return donors ? JSON.parse(donors) : [];
  }

  static registerBloodDonor(patientId: string, donorData: any): void {
    const donors = this.getBloodDonors();
    const existingIndex = donors.findIndex(d => d.patientId === patientId);
    
    const newDonor = {
      patientId,
      ...donorData,
      registeredAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      donors[existingIndex] = newDonor;
    } else {
      donors.push(newDonor);
    }

    localStorage.setItem(STORAGE_KEYS.BLOOD_DONORS, JSON.stringify(donors));
  }

  static searchBloodDonors(bloodGroup: string, location: string): any[] {
    const donors = this.getBloodDonors();
    return donors.filter(d => 
      d.bloodGroup === bloodGroup && 
      d.location.toLowerCase().includes(location.toLowerCase())
    );
  }
}