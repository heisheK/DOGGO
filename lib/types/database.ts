export type AnimalStatus = "needs_care" | "ready_for_adoption" | "in_trial" | "adopted";
export type RescueStatus = "reported" | "triaged" | "rescued" | "treating" | "released" | "adopted";

export type Animal = {
  id: string;
  name: string;
  species: "cat" | "dog" | "other";
  sex: "female" | "male" | "unknown";
  age_estimate: string;
  status: AnimalStatus;
  temperament: string[];
  location_label: string;
  latitude: number;
  longitude: number;
  cover_image_url: string;
  story: string;
  ai_description: string | null;
  sterilized: boolean;
  vaccinated: boolean;
  created_at: string;
};

export type RescueCase = {
  id: string;
  animal_id: string;
  reporter_name: string;
  location_label: string;
  status: RescueStatus;
  urgency: "low" | "medium" | "high";
  notes: string;
  assigned_to: string | null;
  created_at: string;
};

export type MedicalRecord = {
  id: string;
  animal_id: string;
  record_type: "checkup" | "vaccine" | "sterilization" | "treatment";
  hospital: string;
  performed_at: string;
  notes: string;
  attachment_url: string | null;
};

export type AdoptionApplication = {
  id: string;
  animal_id: string;
  applicant_name: string;
  phone: string;
  dorm_or_address: string;
  experience: string;
  status: "pending" | "screening" | "approved" | "rejected";
  created_at: string;
};
