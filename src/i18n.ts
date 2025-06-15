
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      header: {
        searchPlaceholder: "Type keyword to find your search..."
      },
      patientInfo: {
        allPatients: "All Patients",
        yearsOld: "{{age}} years old, {{occupation}}",
        healthy: "Healthy",
        blood: "BLOOD",
        height: "HEIGHT",
        weight: "WEIGHT",
        responsibleDoctors: "Responsible Doctors",
        patientHistory: "Patient History",
        patientName: "Mr. Aaron Almaraz",
        historyFile: "health-history-20.pdf",
        occupation: "Technician"
      },
      sidebar: {
        logo: "Logo",
        patients: "Patients",
        messages: "Messages",
        agenda: "Agenda",
        records: "Records",
        support: "Support",
        profile: "Profile"
      },
      vitals: {
        heartbeat: "Heartbeat",
        bpm: "bpm",
        bloodPressure: "Blood Pressure",
        haemoglobin: "Haemoglobin",
        sugarLevels: "Sugar Levels"
      },
      tabs: {
        all: "All",
        statistic: "Statistic",
        activity: "Activity",
        schedule: "Schedule",
        invoice: "Invoice"
      },
      schedule: {
        monthYear: "{{month}} {{year}}",
        covidSwabTest: "Covid Swab Test",
        participants: "{{count}} participants",
        dentalCheck: "Dental Check",
        covidRapidTest: "Covid Rapid Test",
        cardiacTest: "Cardiac Test",
        days: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat" },
        months: { september: "September" }
      }
    }
  },
  es: {
    translation: {
      header: {
        searchPlaceholder: "Escribe una palabra clave para buscar..."
      },
      patientInfo: {
        allPatients: "Todos los Pacientes",
        yearsOld: "{{age}} años, {{occupation}}",
        healthy: "Saludable",
        blood: "SANGRE",
        height: "ALTURA",
        weight: "PESO",
        responsibleDoctors: "Médicos Responsables",
        patientHistory: "Historial del Paciente",
        patientName: "Sr. Aaron Almaraz",
        historyFile: "historial-de-salud-20.pdf",
        occupation: "Técnico"
      },
      sidebar: {
        logo: "Logo",
        patients: "Pacientes",
        messages: "Mensajes",
        agenda: "Agenda",
        records: "Expedientes",
        support: "Soporte",
        profile: "Perfil"
      },
      vitals: {
        heartbeat: "Ritmo Cardíaco",
        bpm: "ppm",
        bloodPressure: "Presión Arterial",
        haemoglobin: "Hemoglobina",
        sugarLevels: "Niveles de Azúcar"
      },
      tabs: {
        all: "Todo",
        statistic: "Estadísticas",
        activity: "Actividad",
        schedule: "Agenda",
        invoice: "Facturas"
      },
      schedule: {
        monthYear: "{{month}} de {{year}}",
        covidSwabTest: "Prueba de Hisopo Covid",
        participants: "{{count}} participantes",
        dentalCheck: "Chequeo Dental",
        covidRapidTest: "Prueba Rápida de Covid",
        cardiacTest: "Prueba Cardíaca",
        days: { mon: "Lun", tue: "Mar", wed: "Mié", thu: "Jue", fri: "Vie", sat: "Sáb" },
        months: { september: "Septiembre" }
      }
    }
  }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es", // Spanish as default
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
