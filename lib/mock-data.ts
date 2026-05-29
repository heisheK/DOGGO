import type { AdoptionApplication, Animal, MedicalRecord, RescueCase } from "@/lib/types/database";

export const animals: Animal[] = [
  {
    id: "miso",
    name: "Miso",
    species: "cat",
    sex: "female",
    age_estimate: "1 year",
    status: "ready_for_adoption",
    temperament: ["gentle", "lap cat", "quiet"],
    location_label: "North Library Garden",
    latitude: 31.2309,
    longitude: 121.4737,
    cover_image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop",
    story: "Found during winter finals week and now recovered after foster care.",
    ai_description: "Miso is a calm library companion with soft routines, gentle manners, and a tiny habit of greeting volunteers with one careful paw.",
    sterilized: true,
    vaccinated: true,
    created_at: "2026-05-08T08:30:00Z"
  },
  {
    id: "bean",
    name: "Bean",
    species: "dog",
    sex: "male",
    age_estimate: "8 months",
    status: "needs_care",
    temperament: ["playful", "food motivated", "social"],
    location_label: "East Sports Field",
    latitude: 31.2289,
    longitude: 121.4781,
    cover_image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop",
    story: "A young dog seen near the sports field. Volunteers are arranging vaccines and behavior assessment.",
    ai_description: "Bean is all bright eyes and wagging confidence, a campus athlete at heart who needs steady care and a patient adopter.",
    sterilized: false,
    vaccinated: false,
    created_at: "2026-05-12T11:00:00Z"
  },
  {
    id: "sesame",
    name: "Sesame",
    species: "cat",
    sex: "unknown",
    age_estimate: "3 months",
    status: "in_trial",
    temperament: ["curious", "tiny", "brave"],
    location_label: "Design School Courtyard",
    latitude: 31.2321,
    longitude: 121.4713,
    cover_image_url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop",
    story: "Rescued from heavy rain beside the design school. Currently in a trial home.",
    ai_description: "Sesame is a pocket-sized explorer with a brave little engine and an excellent sense for sunny windows.",
    sterilized: false,
    vaccinated: true,
    created_at: "2026-05-16T09:15:00Z"
  }
];

export const rescueCases: RescueCase[] = [
  {
    id: "case-101",
    animal_id: "bean",
    reporter_name: "Lina Chen",
    location_label: "East Sports Field",
    status: "treating",
    urgency: "high",
    notes: "Limping observed. Needs transport to partner clinic.",
    assigned_to: "Kai",
    created_at: "2026-05-19T10:00:00Z"
  },
  {
    id: "case-102",
    animal_id: "miso",
    reporter_name: "Volunteer Team",
    location_label: "North Library Garden",
    status: "adopted",
    urgency: "low",
    notes: "Ready for adoption posts and home visits.",
    assigned_to: "Nora",
    created_at: "2026-05-09T14:20:00Z"
  }
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "med-1",
    animal_id: "miso",
    record_type: "sterilization",
    hospital: "Green Lane Animal Clinic",
    performed_at: "2026-05-10",
    notes: "Recovered well. No follow-up issue.",
    attachment_url: null
  },
  {
    id: "med-2",
    animal_id: "bean",
    record_type: "checkup",
    hospital: "Campus Partner Vet",
    performed_at: "2026-05-20",
    notes: "Minor paw inflammation. Recheck in one week.",
    attachment_url: null
  }
];

export const applications: AdoptionApplication[] = [
  {
    id: "app-1",
    animal_id: "miso",
    applicant_name: "Yue Wang",
    phone: "13800001111",
    dorm_or_address: "Graduate Dorm 3",
    experience: "Raised a senior cat for seven years.",
    status: "screening",
    created_at: "2026-05-21T13:20:00Z"
  }
];
