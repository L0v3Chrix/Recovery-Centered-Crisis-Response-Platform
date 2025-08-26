'use client'

import { useState, useEffect } from 'react'

interface Resource {
  name: string
  address?: string
  phone?: string
  website?: string
  email?: string
  hours?: string
  services?: string
  description?: string
  notes?: string
}

interface ResourceCategory {
  title: string
  resources: Resource[]
}

interface CategorySelection {
  [key: string]: boolean
}

export default function PrintableResourcesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<CategorySelection>({})
  const [showCategorySelector, setShowCategorySelector] = useState(true)
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [layoutMode, setLayoutMode] = useState<'compact' | 'cards'>('compact')

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleCategoryToggle = (categoryTitle: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }))
  }

  const handleSelectAll = () => {
    const allSelected: CategorySelection = {}
    resourceData.forEach(category => {
      allSelected[category.title] = true
    })
    setSelectedCategories(allSelected)
  }

  const handleDeselectAll = () => {
    setSelectedCategories({})
  }

  const getSelectedCategoriesCount = () => {
    return Object.values(selectedCategories).filter(Boolean).length
  }

  const getSelectedResourcesCount = () => {
    return resourceData.reduce((total, category) => {
      if (selectedCategories[category.title]) {
        return total + category.resources.length
      }
      return total
    }, 0)
  }

  const translations = {
    en: {
      // UI Elements
      selectCategories: "Select Categories to Print",
      hideCategories: "Hide Categories",
      showCategories: "Show Category Selection",
      selectAll: "Select All",
      clearAll: "Clear All",
      printAll: "Print All",
      printSelected: "Print Selected",
      categoriesText: "categories",
      resources: "resources",
      showing: "Showing all",
      selected: "Selected",
      resourcesToPrint: "Resources to print:",
      pageTitle: "Central Texas Resources",
      pageSubtitle: "Printable Resource Guide",
      printHeader: "Central Texas Resources for People in Need",
      printSubtitle: "Comprehensive Resource Guide",
      aboutTitle: "About This Resource List",
      aboutText: "This comprehensive directory contains 516 verified resources for people experiencing hardship in Central Texas. It includes emergency services, food assistance, housing, healthcare, and essential support services.",
      immediateHelp: "For immediate help:",
      emergencyNumbers: "IMPORTANT PHONE NUMBERS - KEEP WITH YOU",
      emergency: "EMERGENCY",
      crisis: "CRISIS HOTLINE",
      domestic: "DOMESTIC VIOLENCE",
      mental: "MENTAL HEALTH CRISIS",
      foodBank: "FOOD BANK",
      housing: "HOUSING ASSESSMENT",
      info: "INFO & REFERRALS",
      weather: "COLD WEATHER EMERGENCY",
      printFooter: "Central Texas Resources Directory",
      compiled: "Compiled from verified community resources",
      visitWebsite: "Visit centraltexasresources.org for updates",
      lastUpdated: "Last updated:",
      
      // Field Labels
      address: "Address",
      phone: "Phone",
      website: "Website",
      email: "Email",
      hours: "Hours",
      services: "Services",
      notes: "Notes",
      
      // Category Translations
      categoryNames: {
        "EMERGENCY SERVICES & CRISIS SUPPORT": "Emergency Services & Crisis Support",
        "BEHAVIORAL/MENTAL HEALTH & COUNSELING": "Behavioral/Mental Health & Counseling",
        "FOOD ASSISTANCE - DAILY MEALS": "Food Assistance - Daily Meals",
        "FOOD ASSISTANCE - GROCERIES & FOOD PANTRIES": "Food Assistance - Groceries & Food Pantries",
        "ATX FREE FRIDGES (24/7 ACCESS)": "ATX Free Fridges (24/7 Access)",
        "EMERGENCY SHELTER & HOUSING": "Emergency Shelter & Housing",
        "TRANSITIONAL & AFFORDABLE HOUSING": "Transitional & Affordable Housing",
        "COORDINATED HOUSING ASSESSMENTS": "Coordinated Housing Assessments",
        "MEDICAL & HEALTHCARE SERVICES": "Medical & Healthcare Services",
        "SUBSTANCE ABUSE & RECOVERY": "Substance Abuse & Recovery",
        "IDENTIFICATION & VITAL DOCUMENTS": "Identification & Vital Documents",
        "BASIC SERVICES - MAIL, SHOWERS, LAUNDRY": "Basic Services - Mail, Showers, Laundry",
        "TRANSPORTATION & BUS PASSES": "Transportation & Bus Passes",
        "CLOTHING ASSISTANCE": "Clothing Assistance",
        "LEGAL AID & ADVOCACY": "Legal Aid & Advocacy",
        "EMPLOYMENT & EDUCATION": "Employment & Education",
        "WOMEN, CHILDREN & FAMILY SERVICES": "Women, Children & Family Services",
        "SENIOR SERVICES": "Senior Services",
        "UTILITIES & FINANCIAL ASSISTANCE": "Utilities & Financial Assistance",
        "SPECIALIZED SERVICES": "Specialized Services"
      },
      welcomeMessage: {
        title: "Welcome Home",
        content: `To the one holding this page:
You are not lost to us.
We kept a light on.

If the road has been hard—
if your name felt heavy or missing—
know this: you were never the problem.

There is a seat at our table.
Come as you are; bring every piece.
We'll bring time, care, and hands that know how to help.

This county is a circle, not a gate.
You are part of us—our neighbor, our teacher, our future.
What you've lived through is wisdom.
What you need, we share.

Turn the page when you're ready.
We'll walk at your pace.
We can't be "us" without you.
Welcome home.`,
        signature: "—Your Travis County community"
      }
    },
    es: {
      // UI Elements
      selectCategories: "Seleccionar Categorías para Imprimir",
      hideCategories: "Ocultar Categorías",
      showCategories: "Mostrar Selección de Categorías",
      selectAll: "Seleccionar Todo",
      clearAll: "Limpiar Todo",
      printAll: "Imprimir Todo",
      printSelected: "Imprimir Seleccionados",
      categoriesText: "categorías",
      resources: "recursos",
      showing: "Mostrando todos",
      selected: "Seleccionados",
      resourcesToPrint: "Recursos para imprimir:",
      pageTitle: "Recursos del Centro de Texas",
      pageSubtitle: "Guía de Recursos Imprimible",
      printHeader: "Recursos del Centro de Texas para Personas en Necesidad",
      printSubtitle: "Guía Integral de Recursos",
      aboutTitle: "Acerca de Esta Lista de Recursos",
      aboutText: "Este directorio integral contiene 516 recursos verificados para personas que experimentan dificultades en el Centro de Texas. Incluye servicios de emergencia, asistencia alimentaria, vivienda, atención médica y servicios de apoyo esenciales.",
      immediateHelp: "Para ayuda inmediata:",
      emergencyNumbers: "NÚMEROS TELEFÓNICOS IMPORTANTES - MANTÉNGALOS CONSIGO",
      emergency: "EMERGENCIA",
      crisis: "LÍNEA DE CRISIS",
      domestic: "VIOLENCIA DOMÉSTICA",
      mental: "CRISIS DE SALUD MENTAL",
      foodBank: "BANCO DE ALIMENTOS",
      housing: "EVALUACIÓN DE VIVIENDA",
      info: "INFORMACIÓN Y REFERENCIAS",
      weather: "EMERGENCIA DE CLIMA FRÍO",
      printFooter: "Directorio de Recursos del Centro de Texas",
      compiled: "Compilado de recursos comunitarios verificados",
      visitWebsite: "Visite centraltexasresources.org para actualizaciones",
      lastUpdated: "Última actualización:",
      
      // Field Labels
      address: "Dirección",
      phone: "Teléfono",
      website: "Sitio Web",
      email: "Correo Electrónico",
      hours: "Horarios",
      services: "Servicios",
      notes: "Notas",
      
      // Category Translations
      categoryNames: {
        "EMERGENCY SERVICES & CRISIS SUPPORT": "Servicios de Emergencia y Apoyo en Crisis",
        "BEHAVIORAL/MENTAL HEALTH & COUNSELING": "Salud Conductual/Mental y Consejería",
        "FOOD ASSISTANCE - DAILY MEALS": "Asistencia Alimentaria - Comidas Diarias",
        "FOOD ASSISTANCE - GROCERIES & FOOD PANTRIES": "Asistencia Alimentaria - Despensas y Alimentos",
        "ATX FREE FRIDGES (24/7 ACCESS)": "Refrigeradores Gratuitos ATX (Acceso 24/7)",
        "EMERGENCY SHELTER & HOUSING": "Refugio de Emergencia y Vivienda",
        "TRANSITIONAL & AFFORDABLE HOUSING": "Vivienda de Transición y Asequible",
        "COORDINATED HOUSING ASSESSMENTS": "Evaluaciones Coordinadas de Vivienda",
        "MEDICAL & HEALTHCARE SERVICES": "Servicios Médicos y de Atención Médica",
        "SUBSTANCE ABUSE & RECOVERY": "Abuso de Sustancias y Recuperación",
        "IDENTIFICATION & VITAL DOCUMENTS": "Identificación y Documentos Vitales",
        "BASIC SERVICES - MAIL, SHOWERS, LAUNDRY": "Servicios Básicos - Correo, Duchas, Lavandería",
        "TRANSPORTATION & BUS PASSES": "Transporte y Pases de Autobús",
        "CLOTHING ASSISTANCE": "Asistencia de Ropa",
        "LEGAL AID & ADVOCACY": "Asistencia Legal y Defensoría",
        "EMPLOYMENT & EDUCATION": "Empleo y Educación",
        "WOMEN, CHILDREN & FAMILY SERVICES": "Servicios para Mujeres, Niños y Familias",
        "SENIOR SERVICES": "Servicios para Adultos Mayores",
        "UTILITIES & FINANCIAL ASSISTANCE": "Servicios Públicos y Asistencia Financiera",
        "SPECIALIZED SERVICES": "Servicios Especializados"
      },
      welcomeMessage: {
        title: "Bienvenido a Casa",
        content: `A quien tenga esta página en sus manos:
No estás perdido para nosotros.
Mantuvimos una luz encendida.

Si el camino ha sido difícil—
si tu nombre se sintió pesado o perdido—
sabe esto: nunca fuiste el problema.

Hay un lugar en nuestra mesa.
Ven como eres; trae cada pedazo.
Traeremos tiempo, cuidado y manos que saben ayudar.

Este condado es un círculo, no una puerta.
Eres parte de nosotros—nuestro vecino, nuestro maestro, nuestro futuro.
Lo que has vivido es sabiduría.
Lo que necesitas, lo compartimos.

Voltea la página cuando estés listo.
Caminaremos a tu paso.
No podemos ser "nosotros" sin ti.
Bienvenido a casa.`,
        signature: "—Tu comunidad del Condado de Travis"
      }
    }
  }

  const t = translations[language]
  
  // Comprehensive translation mappings for resource content
  const resourceTranslations = {
    // Resource Names
    names: {
      "ICEE Crisis Hotline": "Línea de Crisis ICEE",
      "Integral Care Crisis Hotline": "Línea de Crisis Integral Care",
      "SAFE Alliance": "Alianza SAFE",
      "National Suicide and Crisis Lifeline": "Línea Nacional de Prevención del Suicidio y Crisis",
      "Veterans Crisis Line": "Línea de Crisis para Veteranos",
      "Crisis Text Line": "Línea de Crisis por Mensaje de Texto",
      "Austin Police Department Non-Emergency": "Departamento de Policía de Austin No Emergencia",
      "Travis County Emergency Services": "Servicios de Emergencia del Condado de Travis",
      "United Way 211": "United Way 211",
      "Capital Metro Crisis Response Team": "Equipo de Respuesta a Crisis de Capital Metro",
      "Austin State Hospital": "Hospital Estatal de Austin",
      "Capital Area Behavioral Health Consortium": "Consorcio de Salud Conductual del Área Capital",
      "Austin Recovery": "Recuperación Austin",
      "Samaritan Center": "Centro Samaritano",
      "Central Health": "Salud Central",
      "People's Community Clinic": "Clínica Comunitaria de la Gente",
      "CommUnityCare": "CommUnityCare",
      "Capital Area Food Bank": "Banco de Alimentos del Área Capital",
      "Caritas of Austin": "Caritas de Austin",
      "Salvation Army": "Ejército de Salvación",
      "Front Steps": "Front Steps",
      "Austin Resource Center for the Homeless": "Centro de Recursos de Austin para Personas sin Hogar",
      "Texas Legal Aid": "Asistencia Legal de Texas",
      "Volunteer Legal Services": "Servicios Legales Voluntarios"
    },
    // Service Descriptions
    services: {
      "24/7 crisis support, emergency assistance": "Apoyo de crisis 24/7, asistencia de emergencia",
      "24/7 mental health crisis support, immediate emotional support": "Apoyo de crisis de salud mental 24/7, apoyo emocional inmediato",
      "24/7 domestic violence & sexual assault hotline, emergency shelter": "Línea directa 24/7 de violencia doméstica y agresión sexual, refugio de emergencia",
      "24/7 suicide prevention and crisis support": "Prevención de suicidio 24/7 y apoyo de crisis",
      "Crisis support for veterans": "Apoyo de crisis para veteranos",
      "Text-based crisis counseling": "Consejería de crisis basada en mensajes de texto",
      "Non-emergency police assistance, reports, information": "Asistencia policial no de emergencia, reportes, información",
      "Emergency services coordination and response": "Coordinación y respuesta de servicios de emergencia",
      "Information and referrals for health and human services": "Información y referencias para servicios de salud y humanos",
      "Crisis intervention, mental health mobile outreach": "Intervención de crisis, alcance móvil de salud mental",
      "Mental health counseling and therapy": "Consejería y terapia de salud mental",
      "Substance abuse treatment and recovery services": "Tratamiento de abuso de sustancias y servicios de recuperación",
      "Food pantry and meal programs": "Despensa de alimentos y programas de comidas",
      "Emergency shelter and transitional housing": "Refugio de emergencia y vivienda de transición",
      "Medical care and healthcare services": "Atención médica y servicios de salud",
      "Legal aid and advocacy services": "Asistencia legal y servicios de defensoría",
      "Job training and employment assistance": "Capacitación laboral y asistencia de empleo",
      "Financial assistance and utility help": "Asistencia financiera y ayuda con servicios públicos",
      "Transportation services and bus passes": "Servicios de transporte y pases de autobús",
      "Clothing and personal items": "Ropa y artículos personales"
    },
    // Notes
    notes: {
      "Cold weather emergency activation": "Activación de emergencia por clima frío",
      "Text or call available": "Mensaje de texto o llamada disponible",
      "Press 1 for veterans": "Presiona 1 para veteranos",
      "Free and confidential": "Gratis y confidencial",
      "24/7 availability": "Disponibilidad 24/7",
      "Multilingual support available": "Apoyo multilingüe disponible"
    },
    // Common terms and patterns
    common: {
      // Days of the week
      "Monday": "Lunes",
      "Tuesday": "Martes", 
      "Wednesday": "Miércoles",
      "Thursday": "Jueves",
      "Friday": "Viernes",
      "Saturday": "Sábado",
      "Sunday": "Domingo",
      // Time and availability
      "24/7": "24/7",
      "Available": "Disponible",
      "Open": "Abierto",
      "Closed": "Cerrado",
      "Hours": "Horarios",
      "Emergency": "Emergencia",
      // Services and support
      "Crisis": "Crisis",
      "Support": "Apoyo",
      "Hotline": "Línea Directa",
      "Services": "Servicios",
      "Free": "Gratis",
      "Confidential": "Confidencial",
      "Counseling": "Consejería",
      "Therapy": "Terapia",
      "Treatment": "Tratamiento",
      "Recovery": "Recuperación",
      "Assistance": "Asistencia",
      "Help": "Ayuda",
      // Location terms
      "Center": "Centro",
      "Clinic": "Clínica",
      "Hospital": "Hospital",
      "Office": "Oficina",
      "Location": "Ubicación",
      "Address": "Dirección",
      "Austin": "Austin",
      "Texas": "Texas",
      // Contact terms
      "Call": "Llamar",
      "Text": "Mensaje de texto",
      "Email": "Correo electrónico",
      "Website": "Sitio web",
      "Contact": "Contacto",
      // Common phrases
      "Please call": "Por favor llame",
      "Call ahead": "Llame con anticipación",
      "Walk-ins welcome": "Se aceptan visitas sin cita",
      "Appointment required": "Se requiere cita",
      "No cost": "Sin costo",
      "Sliding scale": "Escala móvil"
    }
  }

  // Helper functions for translation
  const translateCategory = (categoryTitle: string) => {
    return (t.categoryNames as Record<string, string>)[categoryTitle] || categoryTitle
  }

  const translateResourceName = (name: string) => {
    if (language === 'en') return name
    // Check for exact match first
    if ((resourceTranslations.names as Record<string, string>)[name]) {
      return (resourceTranslations.names as Record<string, string>)[name]
    }
    // Apply common term translations for partial matches
    let translatedName = name
    Object.entries(resourceTranslations.common).forEach(([en, es]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi')
      translatedName = translatedName.replace(regex, es)
    })
    return translatedName
  }

  const translateServices = (services: string) => {
    if (language === 'en') return services
    // Check for exact match first
    if ((resourceTranslations.services as Record<string, string>)[services]) {
      return (resourceTranslations.services as Record<string, string>)[services]
    }
    // Apply common term translations for partial matches
    let translatedServices = services
    Object.entries(resourceTranslations.common).forEach(([en, es]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi')
      translatedServices = translatedServices.replace(regex, es)
    })
    return translatedServices
  }

  const translateNotes = (notes: string) => {
    if (language === 'en') return notes
    // Check for exact match first
    if ((resourceTranslations.notes as Record<string, string>)[notes]) {
      return (resourceTranslations.notes as Record<string, string>)[notes]
    }
    // Apply common term translations for partial matches
    let translatedNotes = notes
    Object.entries(resourceTranslations.common).forEach(([en, es]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi')
      translatedNotes = translatedNotes.replace(regex, es)
    })
    return translatedNotes
  }

  const translateText = (text: string) => {
    if (language === 'en' || !text) return text
    let translatedText = text
    // Apply common term translations
    Object.entries(resourceTranslations.common).forEach(([en, es]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi')
      translatedText = translatedText.replace(regex, es)
    })
    return translatedText
  }

  const resourceData: ResourceCategory[] = [
    {
      title: "EMERGENCY SERVICES & CRISIS SUPPORT",
      resources: [
        {
          name: "ICEE Crisis Hotline",
          phone: "512-305-4233",
          services: "24/7 crisis support, emergency assistance",
          notes: "Cold weather emergency activation"
        },
        {
          name: "Integral Care Crisis Hotline", 
          phone: "512-472-4357",
          services: "24/7 mental health crisis support, immediate emotional support"
        },
        {
          name: "SAFE Alliance",
          address: "1515 Grove Blvd",
          phone: "Call: 512-267-7233, Text: 737-888-7233",
          services: "24/7 domestic violence & sexual assault hotline, emergency shelter"
        },
        {
          name: "National Suicide and Crisis Lifeline",
          phone: "988",
          services: "24/7 suicide prevention and crisis support"
        },
        {
          name: "Veterans Crisis Line",
          phone: "1-800-273-8255 (press 1) or text 838255",
          services: "Crisis support for veterans"
        },
        {
          name: "Crisis Text Line",
          phone: "Text 'HOME' to 741741",
          services: "Text-based crisis counseling"
        },
        {
          name: "Austin Police Department Non-Emergency",
          phone: "512-311",
          services: "Non-emergency police assistance, reports, information"
        },
        {
          name: "Travis County Emergency Services",
          phone: "512-854-9130",
          website: "www.traviscountytx.gov/emergency-services",
          services: "Emergency assistance, disaster response",
          description: "County-wide emergency response coordination, disaster preparedness, and emergency management services for Travis County residents."
        },
        {
          name: "Texas Crisis Text Line",
          phone: "Text 'TX' to 741741",
          website: "www.crisistextline.org",
          services: "Texas-specific crisis text support",
          description: "Free 24/7 crisis text support specifically for Texas residents. Text TX to 741741 for immediate assistance from trained crisis counselors."
        },
        {
          name: "LGBTQ+ National Hotline",
          phone: "1-888-843-4564",
          website: "www.lgbtqnationalhotline.org",
          services: "Crisis support for LGBTQ+ individuals",
          description: "Confidential peer-support hotline for LGBTQ+ individuals providing crisis intervention, information, and local resources."
        }
      ]
    },
    {
      title: "BEHAVIORAL/MENTAL HEALTH & COUNSELING",
      resources: [
        {
          name: "Austin Grief and Loss Center",
          phone: "512-472-7878",
          website: "www.austingrief.com",
          services: "Grief counseling services",
          description: "Professional grief counseling and support groups for individuals and families dealing with loss, trauma, and life transitions."
        },
        {
          name: "Christi Center",
          phone: "512-467-2600",
          website: "www.christicenter.org",
          services: "Mental health counseling",
          description: "Community mental health center providing counseling, therapy, and psychiatric services on a sliding scale basis."
        },
        {
          name: "Integral Care",
          phone: "512-472-4357",
          services: "Behavioral health, walk-in mental health assessment, case management"
        },
        {
          name: "Shalom Austin",
          phone: "512-735-8000",
          services: "Counseling services, flexible with co-pays"
        },
        {
          name: "Life Works",
          phone: "512-735-2100",
          services: "No age requirements, sliding fee scale for adults, grants for families with children 17 and under"
        },
        {
          name: "Harvest Trauma Center",
          website: "harvesttrc.org/team",
          services: "Counseling, medication management, basic needs case management for survivors of physical violence"
        },
        {
          name: "NAMI Central Texas",
          address: "4110 Guadalupe St, Bldg 781",
          phone: "512-420-9810",
          hours: "9:30AM-4:30PM MON-THURS, 9:30AM-1:30PM FRI",
          services: "Mental health care and support"
        },
        {
          name: "Austin State Hospital",
          address: "4110 Guadalupe St",
          phone: "512-452-0381",
          services: "Inpatient psychiatric services"
        },
        {
          name: "Bluebonnet Trails Community Services",
          phone: "1-800-841-2158",
          services: "Mental health and intellectual disability services"
        },
        {
          name: "Family Life Counseling of Austin",
          phone: "512-454-4606",
          services: "Individual, family, and group counseling"
        }
      ]
    },
    {
      title: "FOOD ASSISTANCE - DAILY MEALS",
      resources: [
        {
          name: "Angel House",
          address: "908 E Cesar Chavez St, Austin, TX 78702",
          phone: "512-643-2327",
          hours: "Daily - Breakfast: 9:30-10AM, Lunch: 11AM-12:30PM",
          services: "Daily sack breakfast & coffee, sack lunch with soup, showers, men's clothes"
        },
        {
          name: "Street Forum Mutual Aid",
          address: "422 Guadalupe St, Austin, TX 78701 (Republic Square)",
          hours: "Sundays: 9-11AM",
          services: "Hot breakfast tacos/sandwiches, coffee, water, hygiene supplies"
        },
        {
          name: "Caritas of Austin",
          address: "611 Neches Street, Austin, TX 78701",
          phone: "512-479-4610",
          hours: "Monday-Friday: 11AM-12:30PM",
          services: "Free nutritious lunch (across from the ARCH)"
        },
        {
          name: "Trinity Center",
          address: "304 E. 7th St, Austin, TX 78701",
          phone: "512-610-3520",
          hours: "Monday-Friday: 9-9:30AM, Sunday: 3:30PM",
          services: "Breakfast served at doors, Sunday lunch with optional worship"
        },
        {
          name: "Sunrise Navigation Center",
          address: "4430 Menchaca Rd, Austin, TX 78745",
          phone: "512-444-4673",
          hours: "Monday-Friday: 9AM-1PM",
          services: "Hot lunch and coffee/tea, coordinated assessments, mail, showers"
        },
        {
          name: "Central Presbyterian Church",
          address: "200 E. 8th St, Austin, TX 78701",
          phone: "512-472-2445",
          hours: "Thursdays: 8-11AM",
          services: "Hot breakfast, hygiene, clothing, support group"
        },
        {
          name: "University Baptist Church (God's Family Dinner)",
          address: "2130 Guadalupe St., Austin, Texas 78705",
          phone: "512-478-8559",
          hours: "Thursdays: 5-6PM",
          services: "Boxed dinners, wifi & outlets available"
        },
        {
          name: "Mobile Loaves and Fishes",
          phone: "512-328-7299",
          hours: "Various times 7AM-7:30PM",
          services: "Mobile food trucks - call for daily locations"
        },
        {
          name: "First United Methodist Church",
          address: "1300 Lavaca St",
          phone: "512-478-5684",
          hours: "Sundays: 12-1PM",
          services: "Free lunch after worship service"
        },
        {
          name: "Austin Presbyterian Seminary",
          address: "100 E 27th St",
          phone: "512-472-6736",
          hours: "Tuesdays: 11:30AM-1PM",
          services: "Free community lunch"
        },
        {
          name: "Salvation Army - East Austin",
          address: "4216 S Congress Ave",
          phone: "512-476-1111",
          hours: "Monday-Friday: 11:30AM-12:30PM",
          services: "Hot lunch, case management services"
        },
        {
          name: "Community First! Village",
          address: "9301 Hog Eye Rd",
          phone: "512-766-6071",
          services: "Community meals, job training, transitional housing"
        },
        {
          name: "Austin Recovery",
          address: "4201 South Congress Ave",
          phone: "512-697-8600",
          hours: "Monday-Friday: 7-8:30AM",
          services: "Breakfast program, recovery support"
        },
        {
          name: "Sacred Heart Catholic Church",
          address: "5909 Reicher Dr",
          phone: "512-926-2550",
          hours: "Saturdays: 10-11AM",
          services: "Food distribution, family assistance"
        },
        {
          name: "St. Matthew's Episcopal Church",
          address: "8134 MoPac Expressway North",
          phone: "512-345-8314",
          hours: "Last Saturday of month: 9-11AM",
          services: "Mobile food pantry, community breakfast"
        },
        {
          name: "Interfaith Action for Economic Justice",
          phone: "512-926-6016",
          services: "Coordinates meals at multiple congregations"
        },
        {
          name: "Austin Christian Fellowship",
          address: "1402 E 6th St",
          phone: "512-477-7730",
          hours: "Sundays: 1-3PM",
          services: "Community lunch, clothing distribution"
        }
      ]
    },
    {
      title: "FOOD ASSISTANCE - GROCERIES & FOOD PANTRIES",
      resources: [
        {
          name: "Central Texas Food Bank",
          phone: "877-541-7905",
          website: "centraltexasfoodbank.org/food-assistance/getfood-now",
          services: "Find free food locations near you"
        },
        {
          name: "Manos de Cristo Food Pantry",
          address: "4911 Harmon Avenue Austin, TX 78751",
          phone: "512-476-5321 #113",
          hours: "Monday-Friday: 8-11AM",
          services: "No income/zip limits, 12 people served daily"
        },
        {
          name: "Hyde Park Baptist Church Food Pantry",
          address: "3810 Speedway, Austin, TX 78751",
          phone: "512-419-0308",
          hours: "Wednesdays: 1-3PM",
          services: "Shelf stable food, household supplies, vegetables, clothing"
        },
        {
          name: "Society of Saint Vincent de Paul Food Pantry",
          address: "901 W. Braker Lane Austin, Texas 78758",
          hours: "Saturday: 8:00AM-11:00AM",
          services: "No access restrictions, bring bags"
        },
        {
          name: "St. Ignatius Martyr Food Pantry",
          address: "2303 Euclid Avenue, Austin, TX 78704",
          phone: "512-442-0226",
          hours: "Mon-Wed: 9AM-1PM, Thu: 9-11AM",
          services: "Groceries twice per month, bus passes, medication vouchers"
        },
        {
          name: "Micah 6",
          address: "2200 San Antonio Street, Austin TX 78705",
          phone: "512-477-7454",
          hours: "Thu: 5:30-7PM, Sat: 9:30-11AM",
          services: "No zip limits, visit once weekly, health screenings Thu"
        },
        {
          name: "Hope Food Pantry",
          address: "7400 Blessing Ave",
          phone: "512-272-6700",
          hours: "Tuesdays and Thursdays: 9AM-12PM",
          services: "Groceries, household items, limited to once per month"
        },
        {
          name: "Harvest Blessings Food Pantry",
          address: "6009 Decker Ln",
          phone: "512-928-4224",
          hours: "Saturdays: 9AM-12PM",
          services: "Free groceries, clothing, household items"
        },
        {
          name: "East Austin Neighborhood Center Food Pantry",
          address: "2015 E 6th St",
          phone: "512-478-7200",
          hours: "Fridays: 1-4PM",
          services: "Emergency food assistance, referral services"
        },
        {
          name: "St. Johns Community Center Food Pantry",
          address: "7500 Blessing Ave",
          phone: "512-926-1313",
          hours: "Wednesdays: 9AM-12PM",
          services: "Groceries, fresh produce when available"
        },
        {
          name: "Travis County Community Center Food Pantry",
          address: "6219 Decker Ln",
          phone: "512-926-3491",
          hours: "Tuesdays: 10AM-1PM",
          services: "Central-Austin area food distribution"
        },
        {
          name: "Bethany Lutheran Church Food Pantry",
          address: "4100 Steck Ave",
          phone: "512-345-8314",
          hours: "Third Saturday: 9-11AM",
          services: "Groceries, personal care items"
        },
        {
          name: "South Austin Community Food Pantry",
          address: "2529 S Lamar Blvd",
          phone: "512-447-7459",
          hours: "Saturdays: 10AM-1PM",
          services: "Fresh produce, canned goods, dairy products"
        },
        {
          name: "Wildflower Terrace Food Pantry",
          address: "1000 E 41st St",
          phone: "512-459-4735",
          hours: "Thursdays: 4-6PM",
          services: "Apartment complex residents and neighbors"
        },
        {
          name: "Austin Food Bank Mobile Pantry",
          phone: "512-684-2550",
          website: "austinfoodbank.org/mobile-food-pantry",
          services: "Multiple locations throughout week, check website"
        },
        {
          name: "Good Samaritan Food Pantry",
          address: "1801 E 6th St",
          phone: "512-478-9471",
          hours: "Mondays: 2-5PM",
          services: "Groceries, hygiene products, baby supplies"
        },
        {
          name: "Westlake Hills Presbyterian Food Pantry",
          address: "1700 Westbank Dr",
          phone: "512-327-6834",
          hours: "First Saturday: 9AM-12PM",
          services: "Groceries, fresh produce, household items"
        },
        {
          name: "Austin Area Interreligious Ministries Food Pantry",
          address: "1708 E 2nd St",
          phone: "512-386-9145",
          hours: "Wednesdays: 3-6PM",
          services: "Emergency food assistance, referral services"
        },
        {
          name: "Helping Hand Home Food Distribution",
          address: "3804 Avenue B",
          phone: "512-454-3743",
          hours: "Second Saturday: 10AM-12PM",
          services: "Senior citizens and disabled residents priority"
        },
        {
          name: "University United Methodist Church Pantry",
          address: "2409 Guadalupe St",
          phone: "512-478-5684",
          hours: "Second and Fourth Thursday: 4-6PM",
          services: "Students and community members welcome"
        }
      ]
    },
    {
      title: "ATX FREE FRIDGES (24/7 ACCESS)",
      resources: [
        {
          name: "Dove Springs Fridge",
          address: "6710 Ripple Run Rd",
          hours: "24/7",
          services: "Free food donations, amount varies"
        },
        {
          name: "2nd Street Fridge", 
          address: "1710 E. 2nd St",
          hours: "24/7",
          services: "Free food donations, amount varies"
        },
        {
          name: "Dittmar Fridge",
          address: "618 W. Dittmar Rd",
          hours: "24/7", 
          services: "Free food donations, clothing racks available"
        },
        {
          name: "Nixta Fridge",
          address: "2512 E 12th St",
          hours: "24/7",
          services: "Free food donations, amount varies"
        },
        {
          name: "Brentwood Fridge",
          address: "1601 W Koenig Ln",
          hours: "24/7",
          services: "Free food donations, amount varies"
        },
        {
          name: "Pearl Street Fridge",
          address: "2000 Pearl St, Austin, TX 78705 (Behind Pearl St Coop)",
          hours: "24/7",
          services: "Free food donations, amount varies"
        }
      ]
    },
    {
      title: "EMERGENCY SHELTER & HOUSING",
      resources: [
        {
          name: "Salvation Army Downtown Shelter",
          address: "501 E 8th St",
          phone: "512-476-1111",
          hours: "8:30AM-4:30PM MON-FRI",
          services: "Emergency shelter for single men and women"
        },
        {
          name: "Austin Shelter for Women and Children",
          address: "3613 Tannehill Ln Bldg 3",
          phone: "512-933-0600",
          hours: "24/7",
          services: "Emergency shelter, case management, employment assistance, child care"
        },
        {
          name: "The Rathgeber Center for Families",
          address: "4613 Tannehill Lane, Bldg 1",
          phone: "737-256-6926",
          services: "Emergency shelter for parents/guardians with children"
        },
        {
          name: "Casa Marianella",
          address: "821 Gunter St",
          phone: "512-385-5571",
          hours: "9AM-7PM THURS-TUES, NOON-7PM WEDS",
          services: "Emergency shelter for recently-arrived immigrants, asylum seekers"
        },
        {
          name: "LifeWorks Emergency Shelter",
          address: "3700 S 1st St",
          phone: "512-735-2400",
          services: "Youth shelter for ages 14-17 and foster youth in emergency"
        },
        {
          name: "The ARCH (Austin Resource Center for the Homeless)",
          address: "500 E 7th St",
          phone: "512-305-4233",
          hours: "24/7",
          services: "Emergency shelter, case management, mail services, day center"
        },
        {
          name: "Front Steps (Downtown)",
          address: "500 E 7th St",
          phone: "512-305-4100",
          services: "Case management, housing assistance, health services coordination"
        },
        {
          name: "Caritas of Austin Emergency Services",
          address: "611 Neches St",
          phone: "512-479-4610",
          hours: "Monday-Friday: 8AM-5PM",
          services: "Emergency housing assistance, utility assistance, food vouchers"
        },
        {
          name: "Foundation for the Homeless",
          phone: "512-476-4035",
          services: "Interfaith Hospitality Network, family shelter rotation among churches"
        },
        {
          name: "Community Advocates for Teens and Parents",
          address: "7501 Blessing Avenue",
          phone: "512-451-0252",
          services: "Shelter and transitional housing for pregnant and parenting adolescents"
        },
        {
          name: "Family Eldercare Emergency Housing",
          phone: "512-450-0844",
          services: "Transitional housing with supportive services for elderly people"
        },
        {
          name: "Austin Emergency Housing Network",
          phone: "512-305-4233",
          services: "Coordinates emergency shelter placements citywide"
        },
        {
          name: "Sacred Heart Community Services",
          address: "5909 Reicher Dr",
          phone: "512-926-2550",
          services: "Emergency housing assistance, rent/utility help"
        },
        {
          name: "Hill Country Community Action",
          phone: "512-847-5913",
          services: "Emergency shelter assistance, housing navigation"
        },
        {
          name: "ECHO (Ending Community Homelessness Coalition)",
          phone: "512-305-4222",
          services: "Coordinated entry system, housing placement assistance"
        },
        {
          name: "Austin Disaster Relief Network",
          phone: "512-806-0800",
          services: "Emergency housing after disasters, temporary shelter coordination"
        }
      ]
    },
    {
      title: "TRANSITIONAL & AFFORDABLE HOUSING",
      resources: [
        {
          name: "Foundation Communities",
          address: "3000 S. I-35 Frontage Rd #300",
          phone: "512-447-2026",
          hours: "9AM-5PM MON-FRI",
          services: "Affordable housing programs"
        },
        {
          name: "Housing Authority of the City of Austin",
          address: "1124 S. IH-35 Frontage Rd",
          phone: "512-477-4488",
          hours: "8AM-5PM MON-FRI",
          website: "www.hacanet.org",
          services: "Housing waiting lists, depends on individual circumstances"
        },
        {
          name: "Travis County Housing Authority",
          address: "502 E Highland Mall Blvd",
          phone: "512-480-8245",
          hours: "8AM-5PM MON-THURS, 8AM-NOON FRI",
          services: "Section 8 rental vouchers, housing waiting lists"
        },
        {
          name: "Green Doors",
          address: "1503 S IH-35",
          phone: "512-469-9130",
          hours: "9AM-5PM MON-FRI",
          services: "Affordable housing to prevent/end homelessness"
        },
        {
          name: "Saint Louise House",
          phone: "512-326-2774",
          website: "saintlouisehouse.org/services",
          services: "Affordable housing for mothers and children experiencing homelessness"
        }
      ]
    },
    {
      title: "COORDINATED HOUSING ASSESSMENTS",
      resources: [
        {
          name: "Sunrise Navigation Center",
          address: "4430 Menchaca Rd",
          phone: "512-522-1097 (NEW HOTLINE)",
          hours: "MON-FRI 9AM-1PM", 
          services: "Coordinated Assessment in person or via hotline"
        },
        {
          name: "Trinity Center",
          address: "304 E 7th Street",
          phone: "512-610-3520",
          services: "Assists 4-5 people Fridays 9AM-12PM, sign up for Friday slot"
        },
        {
          name: "The Charlie Center (Mosaic Church North)",
          address: "12675 Research Blvd",
          phone: "512-922-8954",
          hours: "MON-FRI 9am-1pm",
          services: "Coordinated assessments, hot meals, benefits assistance, ID help"
        },
        {
          name: "SAFE Alliance",
          phone: "512-267-7233",
          hours: "MON-FRI",
          services: "Contact SAFEline for confidential CA screening referral"
        }
      ]
    },
    {
      title: "MEDICAL & HEALTHCARE SERVICES",
      resources: [
        {
          name: "Volunteer Healthcare",
          address: "4215 Medical Parkway Austin, Texas 78756",
          phone: "512-459-6002",
          website: "volclinic.org",
          services: "Walk-in clinic for people with no health insurance"
        },
        {
          name: "Community Care",
          phone: "512-978-9015",
          services: "Multiple locations Austin/Pflugerville ONLY, scheduling appointments"
        },
        {
          name: "Lonestar Circle of Care",
          phone: "877-800-5722",
          services: "Locations in Round Rock, Austin, Pflugerville, Jonestown"
        },
        {
          name: "Peoples Community Clinic",
          phone: "512-478-4939",
          services: "Healthcare services, dental for existing patients only"
        },
        {
          name: "Dell Seton Medical Center at UT",
          address: "1500 Red River St",
          phone: "512-324-7000",
          hours: "24/7",
          services: "Emergency Care"
        },
        {
          name: "East 2nd Street Clinic",
          address: "1631 E. 2nd St",
          phone: "512-472-4357",
          hours: "8AM-5PM MON-FRI",
          services: "Walk-in Clinic"
        },
        {
          name: "Manos de Cristo Dental Center",
          address: "4911 Harmon Ave",
          phone: "512-477-2319",
          hours: "7AM-7PM MON-FRI, 8AM-2PM SAT",
          services: "Emergency dental care for low income individuals"
        },
        {
          name: "WellMed",
          phone: "1-888-781-9355",
          services: "Primary care medical services"
        },
        {
          name: "Suvida Primary Care Doctors",
          phone: "866-278-8432",
          website: "suvidahealthcare.com/about-us",
          services: "Hispanic older adults, bilingual doctors"
        },
        {
          name: "Affordable Dentures",
          phone: "877-867-4924",
          services: "Low-cost dental services"
        },
        {
          name: "Lonestar Circle of Care Pink Bus (Mobile Mammography)",
          phone: "1-844-PINK-BUS",
          website: "lonestarcares.org/service/mobile-mammography-big-pink-bus/",
          services: "Free mammograms for ages 40+, uninsured or select insurance",
          notes: "No mammogram in last 12 months, not pregnant/breastfeeding"
        },
        {
          name: "St. David's Community Health Centers",
          phone: "512-324-3892",
          services: "Multiple clinic locations, sliding fee scale"
        },
        {
          name: "Austin Regional Clinic",
          phone: "512-382-6634",
          services: "Multiple locations, some accept uninsured"
        },
        {
          name: "Central Health MAP",
          phone: "512-978-8000",
          services: "Medical assistance program for Travis County residents"
        },
        {
          name: "Texas Health Steps",
          phone: "1-877-847-8377",
          services: "Checkups and healthcare for children and teens"
        },
        {
          name: "Federally Qualified Health Center Locator",
          phone: "211",
          services: "Find nearby FQHCs providing care regardless of ability to pay"
        }
      ]
    },
    {
      title: "HIV/AIDS & STD SERVICES",
      resources: [
        {
          name: "AIDS Services of Austin",
          address: "7215 Cameron Rd",
          phone: "512-458-2437",
          hours: "9AM-5PM MON-FRI",
          services: "Case management, testing, financial services for HIV+ individuals"
        },
        {
          name: "Kind Clinic",
          address: "Multiple locations",
          phone: "512-472-5463",
          services: "Free STD testing and treatment, HIV testing, PrEP services"
        },
        {
          name: "Austin/Travis County Health Department STD Clinic",
          address: "15 Waller St",
          phone: "512-972-5555",
          services: "STD testing and treatment, HIV testing"
        },
        {
          name: "El Buen Samaritano HIV Services",
          address: "7000 Woodhue Dr",
          phone: "512-439-0700",
          services: "HIV testing, education, case management for Hispanic community"
        },
        {
          name: "Planned Parenthood HIV Testing",
          phone: "1-800-230-PLAN",
          services: "HIV testing and counseling at multiple locations"
        }
      ]
    },
    {
      title: "MENTAL HEALTH & COUNSELING",
      resources: [
        {
          name: "Austin Grief and Loss Center",
          phone: "512-472-7878",
          services: "Grief counseling services"
        },
        {
          name: "Christi Center",
          phone: "512-467-2600",
          services: "Mental health counseling"
        },
        {
          name: "Shalom Austin",
          phone: "512-735-8000",
          services: "Counseling services, flexible with co-pays"
        },
        {
          name: "Life Works",
          phone: "512-735-2100",
          services: "No age requirements, sliding fee scale for adults, grants for families with children 17 and under"
        },
        {
          name: "Harvest Trauma Center",
          website: "harvesttrc.org/team",
          services: "Counseling, medication management, basic needs case management for survivors of physical violence"
        },
        {
          name: "NAMI Central Texas",
          address: "4110 Guadalupe St, Bldg 781",
          phone: "512-420-9810",
          hours: "9:30AM-4:30PM MON-THURS, 9:30AM-1:30PM FRI",
          services: "Mental health care and support"
        }
      ]
    },
    {
      title: "SUBSTANCE ABUSE & RECOVERY",
      resources: [
        {
          name: "Salvation Army Adult Rehabilitation Center (ARC)",
          address: "4216 S. Congress Avenue",
          phone: "512-447-2272",
          services: "6-month residential program"
        },
        {
          name: "SMART Recovery Support Group",
          address: "4110 Guadalupe st. #635",
          hours: "7-8:30PM THURS",
          phone: "512-758-7686",
          services: "Peer support group for addiction recovery"
        },
        {
          name: "Healthcare for Homeless HUB",
          address: "3000 Oak Springs Dr",
          phone: "outreach@integralcare.org",
          hours: "8AM-5PM MON-FRI",
          services: "Walk-ins available, specializes in substance abuse, mental health"
        },
        {
          name: "TX Harm Reduction Alliance",
          address: "1803 E Cesar Chavez St",
          phone: "512-580-0580",
          hours: "11AM-4:30PM TUES-FRI",
          services: "Drop-in center for substance users, harm reduction supplies"
        },
        {
          name: "SAMHSA's National Helpline",
          phone: "1-800-662-4357, TTY: 1-800-487-4889",
          services: "24/7 confidential treatment referral & info for substance use"
        },
        {
          name: "Alcoholics Anonymous (AA)",
          phone: "512-444-0071",
          website: "austinaa.org/meetings",
          services: "12-step meetings for alcohol addiction"
        },
        {
          name: "Narcotics Anonymous Austin Area",
          phone: "512-480-0004",
          website: "centraltexasna.org",
          services: "12-step meetings for drug addiction recovery"
        },
        {
          name: "Crystal Meth Anonymous",
          phone: "512-480-0004",
          services: "12-step recovery program for crystal meth addiction"
        },
        {
          name: "Cocaine Anonymous Austin",
          phone: "512-339-9244",
          services: "12-step program for cocaine and crack addiction"
        },
        {
          name: "Al-Anon Family Groups",
          phone: "512-441-8591",
          services: "Support for families and friends of alcoholics"
        },
        {
          name: "Austin Recovery Inc. Day Treatment",
          address: "4201 S Congress Ave",
          phone: "512-697-8600",
          services: "Intensive outpatient treatment, SMART Recovery meetings"
        },
        {
          name: "Phoenix House Texas",
          address: "2330 E Martin Luther King Jr Blvd",
          phone: "512-472-9734",
          services: "Residential and outpatient addiction treatment"
        },
        {
          name: "Crossroads Treatment Center",
          address: "8402 Cross Park Dr",
          phone: "512-292-1478",
          services: "Methadone maintenance, outpatient addiction treatment"
        },
        {
          name: "Integral Care Addiction Recovery Services",
          address: "3000 Oak Springs Dr",
          phone: "512-440-4080",
          services: "Outpatient addiction treatment, medication-assisted treatment"
        },
        {
          name: "Austin State Hospital Substance Abuse Program",
          address: "4110 Guadalupe St",
          phone: "512-419-2000",
          services: "Inpatient dual diagnosis treatment"
        },
        {
          name: "Rosedale House",
          address: "1805 W 35th St",
          phone: "512-459-3773",
          services: "Sober living for men in recovery"
        },
        {
          name: "Oxford House Austin",
          phone: "512-926-3057",
          services: "Sober living homes for men and women"
        },
        {
          name: "Celebrate Recovery Austin",
          phone: "512-282-2357",
          services: "Christ-centered recovery program at multiple churches"
        },
        {
          name: "Women's Recovery Association",
          address: "1524 S IH-35",
          phone: "512-326-3717",
          services: "Gender-specific addiction treatment and sober living"
        },
        {
          name: "Texas Recovery Network",
          phone: "512-454-3706",
          services: "Peer support services, recovery coaching"
        }
      ]
    },
    {
      title: "IDENTIFICATION & VITAL DOCUMENTS",
      resources: [
        {
          name: "Texas Department of Public Safety - North",
          address: "6121 N Lamar Blvd, Austin, TX 78752",
          phone: "512-424-2076",
          services: "Driver's licenses, state ID cards"
        },
        {
          name: "Texas Department of Public Safety - South", 
          address: "6425 IH 35, Frontage Rd. #180, Austin, TX 78744",
          phone: "512-444-5241",
          services: "Driver's licenses, state ID cards"
        },
        {
          name: "Social Security Administration",
          address: "North: 1025 Camino La Costa, Austin, TX 78752",
          phone: "800-772-1213",
          services: "Social Security cards, benefits"
        },
        {
          name: "Trinity Center",
          address: "304 E 7th St",
          hours: "8:30AM-1PM (TUES) & 9:30AM-1PM (WED)",
          phone: "512-610-3520",
          services: "Government ID help and vouchers for identification retrieval"
        },
        {
          name: "Downtown Austin Community Court",
          address: "505 Barton Springs Rd (1st floor)",
          services: "Vouchers for identification retrieval fees"
        },
        {
          name: "Texas Vital Statistics - Austin Office",
          address: "1100 W 49th St",
          phone: "512-776-7111",
          services: "Birth certificates, death certificates, marriage certificates"
        },
        {
          name: "Travis County Clerk Vital Records",
          address: "5501 Airport Blvd",
          phone: "512-854-9188",
          services: "Marriage licenses, certified copies of vital records"
        },
        {
          name: "Austin Resource Center for Independent Living ID Services",
          address: "825 E. Rundberg Lane, Suite A-1",
          phone: "512-832-6349",
          services: "ID assistance for people with disabilities"
        },
        {
          name: "Passport Acceptance Facilities",
          phone: "1-877-487-2778",
          services: "Multiple locations for passport applications and renewals"
        },
        {
          name: "Legal Aid for the Homeless ID Assistance",
          address: "400 Nueces Street",
          phone: "512-476-4383",
          services: "Legal assistance for obtaining identification documents"
        },
        {
          name: "Casa Marianella Document Recovery",
          address: "821 Gunter St",
          phone: "512-385-5571",
          services: "Assistance obtaining documents for immigrants and asylum seekers"
        },
        {
          name: "Austin Immigration Legal Services",
          phone: "512-474-1961",
          services: "Document replacement for immigrants, USCIS applications"
        },
        {
          name: "Veterans Service Office ID Assistance",
          address: "5451 W Highway 290, Building 8",
          phone: "512-854-4091",
          services: "VA ID cards, military records, discharge papers"
        },
        {
          name: "Texas Department of Criminal Justice ID Program",
          phone: "512-475-0571",
          services: "ID assistance for people reentering from incarceration"
        },
        {
          name: "Homeless Services ID Recovery Program",
          phone: "512-305-4233",
          services: "Coordinated ID recovery services for homeless individuals"
        },
        {
          name: "Salvation Army Document Recovery",
          address: "501 E 8th St",
          phone: "512-476-1111",
          services: "Assistance obtaining replacement documents for clients"
        }
      ]
    },
    {
      title: "BASIC SERVICES - MAIL, SHOWERS, LAUNDRY",
      resources: [
        {
          name: "Trinity Center - Mail",
          address: "304 E. 7th St",
          phone: "512-610-3520",
          services: "Mail services, showers (Women Mon 9:30-12pm), clothing"
        },
        {
          name: "Sunrise Navigation Center - Mail & Showers",
          address: "4430 Menchaca Rd",
          phone: "512-368-2685", 
          hours: "MON-FRI 9AM-1PM",
          services: "Mail, showers 8:30AM-11AM, phone use, device charging"
        },
        {
          name: "Angel House - Showers",
          address: "908 E Cesar Chavez St",
          phone: "512-643-2327",
          hours: "9:30-10AM, 11AM-12:30PM DAILY",
          services: "Showers, meals, men's clothing"
        },
        {
          name: "Lighter Loads - Laundry",
          website: "facebook.com/lighterloadsatx",
          hours: "9AM-Noon SAT",
          services: "Mobile laundry (1 load/person, max 9lbs, no voucher needed)"
        },
        {
          name: "Mission Accomplished - Laundry",
          services: "Free laundry vouchers at Sunrise Navigation Center (Mon 9AM-12PM) and Violet Storage (Tue 9AM-12PM)"
        },
        {
          name: "Front Steps Day Resource Center",
          address: "500 E 7th St",
          phone: "512-305-4100",
          services: "Day center services, case management, phone use, restrooms"
        },
        {
          name: "The ARCH Day Services",
          address: "500 E 7th St",
          phone: "512-305-4233",
          hours: "6AM-8PM daily",
          services: "Lockers, charging stations, restrooms, water fountain"
        },
        {
          name: "Caritas of Austin Day Center",
          address: "611 Neches St",
          phone: "512-479-4610",
          hours: "Monday-Friday: 8AM-5PM",
          services: "Phone use, restrooms, water, limited storage"
        },
        {
          name: "Austin Public Library - Central Branch",
          address: "710 W Cesar Chavez St",
          phone: "512-974-7400",
          services: "Free wifi, computer access, restrooms, water fountains"
        },
        {
          name: "Community First! Village Laundry",
          address: "9301 Hog Eye Rd",
          phone: "512-766-6071",
          services: "Laundry facilities, community showers, mail services"
        },
        {
          name: "Casa Marianella Basic Services",
          address: "821 Gunter St",
          phone: "512-385-5571",
          services: "Showers, laundry, mail, phone use for residents and clients"
        },
        {
          name: "Austin Disaster Relief Network Mobile Services",
          phone: "512-806-0800",
          services: "Mobile shower trailers during disasters and events"
        },
        {
          name: "Salvation Army Basic Services",
          address: "501 E 8th St",
          phone: "512-476-1111",
          services: "Showers, laundry access, mail services for program participants"
        },
        {
          name: "Life Works Hygiene Center",
          address: "3700 S 1st St",
          phone: "512-735-2400",
          services: "Showers, laundry, basic hygiene supplies for youth"
        },
        {
          name: "SafePlace Hygiene Services",
          address: "1515 Grove Blvd",
          phone: "512-267-7233",
          services: "Showers, laundry, personal care items for survivors"
        },
        {
          name: "Austin Recovery Basic Services",
          address: "4201 S Congress Ave",
          phone: "512-697-8600",
          services: "Showers, laundry, mail for program participants"
        },
        {
          name: "Mobile Giving Tuesday - Hygiene",
          phone: "512-789-4357",
          services: "Mobile hygiene services, rotating locations"
        },
        {
          name: "Keep Austin Housed Shower Program",
          phone: "512-305-4100",
          services: "Shower vouchers and transportation assistance"
        },
        {
          name: "University United Methodist Hygiene Pantry",
          address: "2409 Guadalupe St",
          phone: "512-478-5684",
          services: "Hygiene supplies, personal care items distribution"
        }
      ]
    },
    {
      title: "TRANSPORTATION & BUS PASSES",
      resources: [
        {
          name: "Trinity Center",
          address: "304 E 7th St",
          phone: "512-610-3500",
          hours: "8AM WED",
          services: "Bus passes for first 50 people (arrive before 8AM)"
        },
        {
          name: "Central Presbyterian Church",
          address: "200 E. 8th St",
          phone: "512-472-2445",
          hours: "8-9AM THURS",
          services: "Bus passes available"
        },
        {
          name: "Street Forum",
          address: "422 Guadalupe St", 
          hours: "9-11AM SUN",
          services: "31-day bus passes"
        },
        {
          name: "Drive a Senior - North Central Austin",
          phone: "512-472-6339",
          website: "driveasenioratx.org",
          services: "Transportation for seniors"
        },
        {
          name: "Drive a Senior - Northwest/West Austin",
          phone: "512-250-5021",
          website: "driveaseniornorthwest.org",
          services: "Transportation for seniors"
        },
        {
          name: "Capital Metro",
          phone: "512-474-1200",
          website: "capmetro.org",
          services: "Public transportation, route information"
        },
        {
          name: "Capital Metro Reduced Fare Program",
          phone: "512-369-6040",
          services: "Discounted bus passes for seniors, students, and people with disabilities"
        },
        {
          name: "Medical Transportation Management (MTM)",
          phone: "1-855-687-4786",
          services: "Medicaid transportation to medical appointments"
        },
        {
          name: "Austin Transit Partnership",
          phone: "512-916-5465",
          services: "Project Connect transit improvements, accessibility services"
        },
        {
          name: "Rides for Recovery",
          phone: "512-782-4831",
          services: "Transportation to treatment appointments and meetings"
        },
        {
          name: "Community Care Transportation",
          phone: "512-978-9015",
          services: "Medical transportation for Community Care patients"
        },
        {
          name: "Easter Seals Transportation",
          phone: "512-478-2581",
          services: "Transportation services for people with disabilities"
        },
        {
          name: "Yellow Cab Austin",
          phone: "512-452-9999",
          services: "Taxi service, wheelchair accessible vehicles available"
        },
        {
          name: "Austin B-cycle",
          phone: "512-717-7718",
          services: "Bike share program, low-income discount available"
        },
        {
          name: "Lyft Access",
          services: "Reduced-rate rides for eligible low-income users"
        },
        {
          name: "Uber Health",
          services: "Healthcare transportation coordination"
        },
        {
          name: "GoAustin Shuttle",
          phone: "512-474-1200",
          services: "Airport shuttle service, some free routes"
        },
        {
          name: "Hill Country Transit",
          phone: "512-478-7433",
          services: "Regional bus service to surrounding counties"
        },
        {
          name: "Greyhound Bus Station",
          address: "916 E Koenig Ln",
          phone: "512-458-4463",
          services: "Long-distance bus travel, reduced fares available"
        },
        {
          name: "Megabus Austin",
          website: "megabus.com",
          services: "Low-cost intercity bus service"
        }
      ]
    },
    {
      title: "CLOTHING ASSISTANCE",
      resources: [
        {
          name: "Trinity Center Women's Clothing Closet",
          address: "304 E 7th St",
          phone: "512-610-3500",
          hours: "Mondays: 10am-12pm",
          services: "Women's clothing"
        },
        {
          name: "Angel House Men's Clothing",
          address: "908 E Cesar Chavez St",
          phone: "512-643-2327",
          hours: "9-10AM SAT",
          services: "Men's clothing closet"
        },
        {
          name: "St Vincent De Paul Thrift Store",
          address: "901 W Braker Ln Austin, TX 78758",
          phone: "512-442-5652",
          hours: "Tuesday-Saturday 10am-5pm",
          services: "Thrift store, donation drop-off"
        },
        {
          name: "Casa Marianella",
          address: "821 Gunter St",
          phone: "512-385-5571",
          hours: "9AM-7PM THURS-TUES, NOON-7PM WEDS",
          services: "Various clothing from donations"
        },
        {
          name: "Dress for Success",
          address: "701 Tillery St. Ste A-5",
          phone: "512-389-3723",
          services: "Professional women's clothing (appointment only)"
        },
        {
          name: "Treasure City Thrift Free Market",
          address: "2142 E 7th St",
          phone: "512-524-2820",
          hours: "2-5PM last Sunday of every month",
          services: "Free clothes market in parking lot"
        },
        {
          name: "Goodwill Industries Donation Centers",
          phone: "512-637-7100",
          services: "Multiple locations, affordable clothing, free vouchers available"
        },
        {
          name: "Salvation Army Family Store",
          address: "Multiple locations",
          phone: "512-476-1111",
          services: "Affordable clothing, vouchers for emergency needs"
        },
        {
          name: "Austin Clothing Bank",
          phone: "512-478-2604",
          services: "Free professional and casual clothing"
        },
        {
          name: "Community First! Village Clothing Closet",
          address: "9301 Hog Eye Rd",
          phone: "512-766-6071",
          services: "Free clothing for residents and community members"
        },
        {
          name: "LifeWorks Clothing Closet",
          address: "3700 S 1st St",
          phone: "512-735-2400",
          services: "Free clothing for youth and young adults"
        },
        {
          name: "SafePlace Clothing Assistance",
          address: "1515 Grove Blvd",
          phone: "512-267-7233",
          services: "Free clothing for domestic violence survivors"
        },
        {
          name: "Caritas of Austin Clothing Vouchers",
          address: "611 Neches St",
          phone: "512-479-4610",
          services: "Clothing vouchers and direct assistance"
        },
        {
          name: "Austin Recovery Clothing Program",
          address: "4201 S Congress Ave",
          phone: "512-697-8600",
          services: "Professional and casual clothing for people in recovery"
        },
        {
          name: "Men's Wearhouse Suit Drive",
          phone: "1-800-776-4587",
          services: "Professional attire for job interviews and work"
        },
        {
          name: "Women's Storybook Project Clothing",
          phone: "512-785-7803",
          services: "Professional clothing for formerly incarcerated women"
        },
        {
          name: "Austin Area Interreligious Ministries Clothing",
          address: "1708 E 2nd St",
          phone: "512-386-9145",
          services: "Emergency clothing assistance"
        },
        {
          name: "Hill Country Community Action Clothing",
          phone: "512-847-5913",
          services: "Seasonal clothing assistance, winter coats"
        },
        {
          name: "One Warm Coat Austin",
          website: "onewarmcoat.org",
          services: "Free winter coat distribution at multiple locations"
        },
        {
          name: "Back to School Clothing Drives",
          phone: "512-974-6700",
          services: "Annual clothing drives for children and students"
        },
        {
          name: "Mobile Loaves and Fishes Clothing Truck",
          phone: "512-328-7299",
          services: "Mobile clothing distribution with food trucks"
        }
      ]
    },
    {
      title: "LEGAL AID & ADVOCACY",
      resources: [
        {
          name: "Texas Legal Services Center",
          address: "1920 E Riverside Dr Suite A-120",
          phone: "1-844-303-SAFE",
          hours: "9AM-5PM MON-FRI",
          services: "Free legal assistance to crime victims and sexual assault survivors"
        },
        {
          name: "Austin Tenants Council",
          address: "205 Chicon St",
          phone: "512-474-1961",
          hours: "9AM-Noon and 1-4PM MON-THURS, 9AM-Noon FRI",
          services: "Assistance with rental and landlord issues"
        },
        {
          name: "Texas Rio Grande Legal Aid",
          address: "4920 North IH-35, Austin, TX 78751",
          phone: "512-374-2700, Toll free: 800-369-9270",
          website: "trla.org",
          services: "Free civil legal assistance: housing, employment, public benefits, civil rights"
        },
        {
          name: "Legal Aid for the Homeless",
          address: "400 Nueces Street, Austin TX",
          phone: "512-476-4383",
          services: "SSDI, SSI, TANF, food stamps, camping tickets, unemployment, veterans benefits"
        },
        {
          name: "Texas Rio Grande Legal Aid - Eviction",
          phone: "General info: 512-374-2700, Legal assistance: 956-996-8752",
          services: "Eviction legal assistance (phone lines busy, keep calling)"
        },
        {
          name: "Volunteer Legal Services of Central Texas",
          address: "1208 Baylor St",
          phone: "512-476-5550",
          services: "Pro bono legal assistance, family law, immigration, housing"
        },
        {
          name: "American Gateways Legal Services",
          address: "314 E Highland Mall Blvd, Suite 501",
          phone: "512-478-0738",
          services: "Immigration law, asylum, citizenship, family reunification"
        },
        {
          name: "Texas Fair Defense Project",
          address: "510 S Congress Ave, Suite 104",
          phone: "512-637-5572",
          services: "Criminal justice reform, bail reform, indigent defense"
        },
        {
          name: "Workers Defense Project",
          address: "5604 Manor Rd",
          phone: "512-391-2305",
          services: "Workers' rights, wage theft, workplace safety, immigration"
        },
        {
          name: "Texas Legal Services Center",
          address: "1920 E Riverside Dr Suite A-120",
          phone: "1-844-303-SAFE",
          services: "Crime victims' rights, sexual assault survivors, trafficking victims"
        },
        {
          name: "Disability Rights Texas",
          address: "2222 W Braker Ln",
          phone: "512-454-4816",
          services: "Legal advocacy for people with disabilities"
        },
        {
          name: "Equal Justice Center",
          address: "510 S Congress Ave, Suite 206",
          phone: "512-474-0007",
          services: "Low-wage workers' rights, farmworker advocacy"
        },
        {
          name: "Texas Appleseed",
          address: "1609 Shoal Creek Blvd, Suite 201",
          phone: "512-473-2800",
          services: "Public interest law, systemic advocacy, policy reform"
        },
        {
          name: "ACLU of Texas - Austin",
          address: "1500 E 6th St",
          phone: "512-478-7300",
          services: "Civil liberties, constitutional rights, discrimination cases"
        },
        {
          name: "Student Legal Services (UT)",
          address: "2.302 Student Services Bldg",
          phone: "512-471-7777",
          services: "Legal assistance for UT students"
        },
        {
          name: "Travis County Law Library",
          address: "1000 Guadalupe St, 4th Floor",
          phone: "512-854-9073",
          services: "Legal research assistance, self-help resources"
        },
        {
          name: "State Bar of Texas Lawyer Referral Service",
          phone: "1-800-252-9690",
          services: "Attorney referrals, reduced-fee consultations"
        },
        {
          name: "Austin Bar Association Pro Bono Program",
          phone: "512-472-8303",
          services: "Free legal assistance referrals"
        },
        {
          name: "Legal Line - Austin Bar Association",
          phone: "512-472-8303",
          services: "Free legal advice hotline (first Tuesday of each month)"
        },
        {
          name: "Consumer Rights Coalition",
          phone: "512-477-4431",
          services: "Consumer protection, debt collection, bankruptcy"
        },
        {
          name: "Texas Veterans Legal Aid Network",
          phone: "1-877-457-5342",
          services: "Legal assistance for veterans and their families"
        }
      ]
    },
    {
      title: "EMPLOYMENT & EDUCATION",
      resources: [
        {
          name: "Texas Workforce Commission",
          services: "Employment assistance, job training programs"
        },
        {
          name: "Austin Public Library - Carver Business & Employment Center",
          address: "1161 Angelina St Austin",
          services: "Employment specialist on duty M-Th 2PM-8PM, Fri-Sat 11AM-4PM, computer lab with skills classes"
        },
        {
          name: "Christian Women's Job Corps of Austin",
          address: "P.O. Box 500193, Austin, Texas 75750",
          phone: "512-963-5330",
          hours: "M-F",
          services: "Equip women in need for life and employment"
        },
        {
          name: "Austin Learning Academy (Virtual)",
          phone: "512-337-2044 or 512-650-8832",
          services: "ESL classes via Zoom, morning/afternoon/evening classes available"
        },
        {
          name: "Foundation Communities",
          address: "4320 S Congress Ave, Austin, TX 78745",
          phone: "512-610-4020",
          hours: "MON-FRI, 9am-5pm",
          services: "In-person and online morning/evening classes, free childcare"
        },
        {
          name: "Austin Community College Career Services",
          phone: "512-223-4636",
          services: "Career counseling, job placement, resume assistance, interview prep"
        },
        {
          name: "University of Texas Career Services",
          address: "2.302 Student Services Bldg",
          phone: "512-471-3366",
          services: "Career counseling, job fairs, networking events (community access)"
        },
        {
          name: "ReServe Austin",
          phone: "512-472-6267",
          services: "Part-time employment opportunities for adults 55+"
        },
        {
          name: "AARP Foundation Work for Yourself@50+",
          phone: "1-855-850-2525",
          services: "Entrepreneurship training for adults 50+"
        },
        {
          name: "Austin Job Corps Center",
          address: "3401 Webberville Rd",
          phone: "512-926-5327",
          services: "Free education and job training for ages 16-24"
        },
        {
          name: "Skills for Austin's Future",
          phone: "512-223-5000",
          services: "Workforce development, employer connections, skills training"
        },
        {
          name: "Dell Connected Classroom",
          phone: "512-728-7000",
          services: "Technology training, digital literacy, certification programs"
        },
        {
          name: "Temporary Staffing Services",
          services: "Multiple agencies: Manpower (512-477-7373), Kelly Services (512-477-7272), Adecco (512-476-6336)"
        },
        {
          name: "Texas Workforce Solutions - Highland",
          address: "6505 Airport Blvd",
          phone: "512-223-5000",
          services: "One-stop employment services, training programs, childcare assistance"
        },
        {
          name: "Texas Workforce Solutions - Riverside",
          address: "2410 S IH-35",
          phone: "512-223-5000",
          services: "Employment services, Spanish-speaking counselors available"
        },
        {
          name: "Dress for Success Austin Employment Support",
          address: "701 Tillery St. Ste A-5",
          phone: "512-389-3723",
          services: "Career coaching, interview skills, professional development"
        },
        {
          name: "Austin Area Urban League Employment",
          address: "524 E 53rd St",
          phone: "512-478-7176",
          services: "Job placement, skills training, entrepreneurship support"
        },
        {
          name: "Project QUEST Austin",
          phone: "512-464-1001",
          services: "Healthcare career training, job placement, financial support"
        },
        {
          name: "Hispanic Chamber of Commerce Employment",
          phone: "512-476-7502",
          services: "Job fairs, networking, small business development"
        },
        {
          name: "Austin Black Chamber of Commerce",
          phone: "512-459-1181",
          services: "Professional development, networking, business opportunities"
        },
        {
          name: "I Live Here I Give Here Job Board",
          website: "ilivehereigivhere.org/jobs",
          services: "Nonprofit job opportunities, volunteer-to-hire programs"
        },
        {
          name: "The Entrepreneurs Foundation",
          phone: "512-472-1231",
          services: "Small business mentoring, startup resources"
        }
      ]
    },
    {
      title: "WOMEN, CHILDREN & FAMILY SERVICES",
      resources: [
        {
          name: "WIC (Women, Infants, and Children)",
          phone: "1-800-942-3678",
          services: "Nutrition assistance for children under 5, pregnant/breastfeeding women, 16 sites in Austin"
        },
        {
          name: "Any Baby Can",
          address: "6207 Sheridan Ave",
          phone: "512-454-3743",
          services: "Services for children, expecting parents, parents of young kids"
        },
        {
          name: "Planned Parenthood Locations",
          services: "Various healthcare services",
          notes: "South Austin: 512-351-4660, Downtown: 512-477-5846, Central: 512-477-5846, North: 512-331-1288"
        },
        {
          name: "CapCityKids (AISD)",
          address: "901 Neal Street, Austin, Texas 78702",
          phone: "512-414-3690",
          services: "School enrollment, tutoring, supplies, clothing, summer camp, child care for homeless families"
        },
        {
          name: "Austin Child Guidance Center",
          address: "810 W 45th St",
          phone: "512-451-2242",
          services: "Mental health services for children, family therapy, parenting classes"
        },
        {
          name: "Family Resource Center Network",
          phone: "512-854-3867",
          services: "Family support services, parenting education, childcare assistance"
        },
        {
          name: "Austin/Travis County Family Court Services",
          address: "1000 Guadalupe St",
          phone: "512-854-4044",
          services: "Child custody mediation, parenting classes, family counseling"
        },
        {
          name: "Texas Department of Family and Protective Services",
          phone: "1-800-252-5400",
          services: "Child protective services, foster care, adoption services"
        },
        {
          name: "Austin Children's Shelter",
          address: "4800 Manor Rd",
          phone: "512-499-0090",
          services: "Emergency shelter, foster care, adoption, family preservation"
        },
        {
          name: "Children's Partnership",
          address: "1001 Springdale Rd, Bldg 2",
          phone: "512-831-2292",
          services: "Early childhood mental health, trauma services"
        },
        {
          name: "Hill Country Community Action Head Start",
          phone: "512-847-5947",
          services: "Early childhood education, family support, nutrition"
        },
        {
          name: "YMCA Child Care Services",
          phone: "512-291-9622",
          services: "Before/after school care, summer camps, scholarships available"
        },
        {
          name: "Boys and Girls Club Extended Care",
          phone: "512-472-1139",
          services: "After-school programs, homework help, meals, transportation"
        },
        {
          name: "Communities in Schools Family Support",
          phone: "512-414-9095",
          services: "School-based family services, case management"
        },
        {
          name: "Ronald McDonald House Charities",
          address: "1315 Barbara Jordan Blvd",
          phone: "512-472-9844",
          services: "Housing for families of hospitalized children"
        },
        {
          name: "Make-A-Wish Central and South Texas",
          phone: "512-329-9474",
          services: "Wish granting for children with critical illnesses"
        },
        {
          name: "Easter Seals Family Services",
          address: "8001 Centre Park Dr, Suite 100",
          phone: "512-478-2581",
          services: "Services for children with disabilities and their families"
        },
        {
          name: "SafePlace Children's Services",
          address: "1515 Grove Blvd",
          phone: "512-267-7233",
          services: "Counseling and support for children affected by domestic violence"
        },
        {
          name: "Austin Recovery Family Program",
          address: "4201 S Congress Ave",
          phone: "512-697-8600",
          services: "Family therapy, children's groups, parenting in recovery"
        },
        {
          name: "Nurturing Parenting Program",
          phone: "512-472-5437",
          services: "Parenting classes, family strengthening, child development"
        },
        {
          name: "Texas Parents Anonymous",
          phone: "1-800-252-5400",
          services: "Parent support groups, child abuse prevention"
        },
        {
          name: "Single Parent Provisions",
          phone: "512-454-4727",
          services: "Support groups and resources for single parents"
        },
        {
          name: "Austin Diaper Bank",
          phone: "512-494-0444",
          services: "Free diapers and supplies for families in need"
        }
      ]
    },
    {
      title: "SENIOR SERVICES",
      resources: [
        {
          name: "Area Agency On Aging (AAACAP)",
          phone: "512-916-6062",
          website: "capcog.org/divisions/area-agency-on-aging",
          services: "Serves older adults, people with disabilities, caregivers with variety of services"
        },
        {
          name: "Meals on Wheels",
          phone: "512-476-6325",
          services: "Meal delivery, sliding fee scale for in-home care"
        },
        {
          name: "AGE of Central Texas",
          phone: "512-451-4611",
          website: "ageofcentraltx.org",
          services: "Medical equipment lending program, accepts donations"
        },
        {
          name: "Senior Home Shares",
          website: "seniorhomeshares.com",
          services: "Roommate matching for elderly"
        },
        {
          name: "Healthy Options Program for the Elderly (H.O.P.E.)",
          phone: "855-366-3401",
          services: "Ages 55+: 15-20lbs nonperishable groceries, Ages 60+: 25-30lbs groceries"
        },
        {
          name: "Senior Access",
          phone: "512-451-4611",
          services: "Information and referral services for older adults"
        },
        {
          name: "Caritas Senior Services",
          address: "611 Neches St",
          phone: "512-479-4610",
          services: "Emergency assistance, food vouchers, utility help for seniors"
        },
        {
          name: "AARP Austin",
          phone: "1-888-687-2277",
          services: "Advocacy, volunteer opportunities, tax preparation assistance"
        },
        {
          name: "Austin Senior Centers",
          phone: "512-974-6700",
          services: "Multiple locations offering meals, activities, transportation"
        },
        {
          name: "Silver Fox Taxi",
          phone: "512-444-7777",
          services: "Medical transportation for seniors, wheelchair accessible"
        },
        {
          name: "Senior Planet Austin",
          address: "3710 Cedar St",
          phone: "512-275-6080",
          services: "Fitness, computer classes, social activities for 50+"
        },
        {
          name: "Family Eldercare Adult Day Health",
          phone: "512-450-0844",
          services: "Adult day care, respite care, caregiver support"
        },
        {
          name: "Meals on Wheels Central Texas",
          phone: "512-476-6325",
          services: "Home-delivered meals, wellness checks, pet food delivery"
        },
        {
          name: "Senior Farmers Market Nutrition Program",
          phone: "512-854-7120",
          services: "Fresh produce coupons for low-income seniors"
        },
        {
          name: "Benefits Outreach Network",
          phone: "512-451-4611",
          services: "Medicare enrollment, benefits screening, SNAP assistance"
        },
        {
          name: "Austin Alzheimer's Association",
          phone: "512-241-0420",
          services: "Support groups, education, respite care"
        },
        {
          name: "Legal Hotline for Older Texans",
          phone: "1-800-622-2520",
          services: "Free legal advice for Texans 60+"
        },
        {
          name: "Elder Financial Protection",
          phone: "1-800-252-5400",
          services: "Financial abuse prevention, investigation"
        },
        {
          name: "Grandparents Raising Grandchildren",
          phone: "512-451-4611",
          services: "Support groups, resources for kinship caregivers"
        },
        {
          name: "Austin Senior Companion Program",
          phone: "512-451-4611",
          services: "Volunteer companions for isolated seniors"
        },
        {
          name: "Home Instead Senior Care",
          phone: "512-219-3300",
          services: "In-home care services, companionship (sliding scale available)"
        }
      ]
    },
    {
      title: "UTILITIES & FINANCIAL ASSISTANCE",
      resources: [
        {
          name: "Travis County CEAP",
          phone: "512-854-9130",
          services: "Emergency rental and utility assistance"
        },
        {
          name: "Plus One Program",
          services: "Austin Energy bills only, clients call providers directly"
        },
        {
          name: "All Saint Episcopal Church",
          phone: "512-476-3589",
          services: "Utility assistance"
        },
        {
          name: "Neighborhood Services Unit",
          phone: "512-972-5780",
          services: "Austin Energy customers only (call only, no text/walk-ins)"
        },
        {
          name: "First Call for Help (United Way)",
          phone: "Dial 211 or 512-973-9203",
          services: "Information and referrals to community resources"
        },
        {
          name: "Texas Gas Service Customer Assistance",
          phone: "1-800-700-2443",
          services: "Budget billing, payment assistance, energy efficiency programs"
        },
        {
          name: "Austin Energy Customer Assistance Program",
          phone: "512-494-9400",
          services: "Bill payment assistance, budget billing, energy efficiency rebates"
        },
        {
          name: "Austin Water Utility Customer Assistance",
          phone: "512-494-9400",
          services: "Payment plans, utility assistance, leak adjustment program"
        },
        {
          name: "Texas Low Income Housing and Energy Assistance",
          phone: "1-877-541-7905",
          services: "LIHEAP energy assistance, weatherization assistance"
        },
        {
          name: "Community Action Inc. Utility Assistance",
          phone: "512-244-2500",
          services: "Emergency utility assistance, weatherization"
        },
        {
          name: "Salvation Army Financial Assistance",
          address: "501 E 8th St",
          phone: "512-476-1111",
          services: "Emergency financial assistance, rent/utility help"
        },
        {
          name: "Austin Energy CARE Program",
          phone: "512-494-9400",
          services: "Reduced rates for qualified low-income customers"
        },
        {
          name: "CenterPoint Energy LITE-UP Program",
          phone: "1-800-752-8036",
          services: "Bill payment assistance for natural gas customers"
        },
        {
          name: "Atmos Energy Share the Warmth",
          phone: "1-888-286-6700",
          services: "Energy assistance fund for qualifying customers"
        },
        {
          name: "Emergency Food and Shelter Program",
          phone: "512-476-4035",
          services: "Emergency assistance for rent, utilities, food"
        },
        {
          name: "Catholic Charities Emergency Assistance",
          phone: "512-651-6100",
          services: "Financial assistance for basic needs"
        },
        {
          name: "Travis County Emergency Rental Assistance",
          phone: "512-854-9130",
          services: "COVID-19 related rental and utility assistance"
        },
        {
          name: "City of Austin Housing Assistance",
          phone: "512-974-3100",
          services: "Tenant-based rental assistance, emergency assistance"
        },
        {
          name: "United Way Emergency Assistance",
          phone: "512-973-9203",
          services: "Coordinated emergency assistance programs"
        },
        {
          name: "Texas Department of Housing Emergency Assistance",
          phone: "512-475-3800",
          services: "Emergency rental assistance, utility assistance"
        }
      ]
    },
    {
      title: "ADDITIONAL COMPREHENSIVE RESOURCES",
      resources: [
        {
          name: "Austin Resource Recovery",
          phone: "512-974-4343",
          services: "Waste and recycling services, bulky item pickup, hazardous waste disposal"
        },
        {
          name: "Austin Code Complaint Services",
          phone: "512-974-2750",
          services: "Property code violations, housing conditions, neighborhood issues"
        },
        {
          name: "Travis County Constable Services",
          phone: "512-854-9697",
          services: "Civil process, warrant service, community policing"
        },
        {
          name: "Austin Municipal Court",
          address: "800 Guadalupe St",
          phone: "512-974-4800",
          services: "Traffic tickets, municipal violations, payment plans"
        },
        {
          name: "Texas Department of Motor Vehicles",
          phone: "1-888-368-4689",
          services: "Vehicle registration, titles, license plates"
        },
        {
          name: "Austin Animal Services",
          address: "7201 Levander Loop",
          phone: "512-978-0500",
          services: "Pet adoption, licensing, animal control, low-cost services"
        },
        {
          name: "Capital Metro Access",
          phone: "512-369-6086",
          services: "Paratransit services for people with disabilities"
        },
        {
          name: "Austin Fire Department Community Outreach",
          phone: "512-974-0130",
          services: "Fire safety education, smoke detector installation"
        },
        {
          name: "Austin Police Department Community Liaisons",
          phone: "512-974-5000",
          services: "Community policing, neighborhood safety, crime prevention"
        },
        {
          name: "Texas Department of Criminal Justice Reentry",
          phone: "512-475-0571",
          services: "Reentry services, halfway houses, parole support"
        },
        {
          name: "Austin Travis County EMS",
          phone: "512-972-7000",
          services: "Emergency medical services, community paramedicine"
        },
        {
          name: "Capital Area Council of Governments",
          phone: "512-916-6000",
          services: "Regional planning, workforce development, aging services"
        },
        {
          name: "Texas Comptroller Property Tax Assistance",
          phone: "1-800-531-5441",
          services: "Property tax exemptions, protests, assistance"
        },
        {
          name: "Austin Public Health",
          phone: "512-972-5520",
          services: "Immunizations, health education, disease prevention"
        },
        {
          name: "Travis County Veterans Treatment Court",
          phone: "512-854-4044",
          services: "Alternative court program for veterans with charges"
        }
      ]
    },
    {
      title: "SPECIALIZED SERVICES",
      resources: [
        {
          name: "ARCIL (Austin Resource Center for Independent Living)",
          address: "825 E. Rundberg Lane, Suite A-1, Austin, Texas 78753",
          phone: "512-832-6349",
          email: "arcil@arcil.com",
          services: "Independent living services for persons with disabilities"
        },
        {
          name: "Queertopia",
          email: "Queertopians@gmail.com",
          services: "Housing assistance and mutual aid for LGBTQ+ individuals and people of color"
        },
        {
          name: "AIDS Services of Austin",
          address: "7215 Cameron Rd",
          phone: "512-458-2437",
          hours: "9AM-5PM MON-FRI",
          services: "Case management, testing, financial services for HIV+ individuals"
        },
        {
          name: "The Trans Lifeline",
          phone: "1-877-565-8860",
          services: "Crisis support for transgender individuals"
        },
        {
          name: "The Trevor Lifeline",
          phone: "1-866-488-7386",
          services: "Crisis support for LGBTQ+ youth"
        },
        {
          name: "Queer and Trans Community Hygiene Closet",
          phone: "512-419-1233",
          services: "Serves LGBTQ youth, 31-day bus passes available"
        }
      ]
    },
    {
      title: "VETERANS SERVICES",
      resources: [
        {
          name: "Travis County Veterans Service Office",
          address: "5451 W Highway 290, Building 8",
          phone: "512-854-4091",
          services: "VA benefits assistance, claims filing, disability ratings"
        },
        {
          name: "Austin Vet Center",
          address: "2015 S IH-35, Suite 207",
          phone: "512-416-1314",
          services: "Counseling, readjustment services for combat veterans"
        },
        {
          name: "American Legion Post 76",
          address: "3401 Ed Bluestein Blvd",
          phone: "512-926-4024",
          services: "Veteran support, benefits assistance, community"
        },
        {
          name: "VFW Post 8587",
          address: "10602 N Lamar Blvd",
          phone: "512-836-5230",
          services: "Veteran support services, advocacy"
        },
        {
          name: "Austin VA Outpatient Clinic",
          address: "7901 Metropolis Dr",
          phone: "512-901-1900",
          services: "Medical care, mental health services for veterans"
        },
        {
          name: "Disabled American Veterans Chapter 96",
          phone: "512-419-6274",
          services: "Transportation to VA appointments, benefits assistance"
        },
        {
          name: "Operation Finally Home",
          website: "operationfinallyhome.org",
          services: "Custom homes for wounded, ill, and injured veterans"
        }
      ]
    },
    {
      title: "IMMIGRATION SERVICES",
      resources: [
        {
          name: "Casa Marianella",
          address: "821 Gunter St",
          phone: "512-385-5571",
          hours: "9AM-7PM THURS-TUES, NOON-7PM WEDS",
          services: "Emergency shelter for recently-arrived immigrants, asylum seekers"
        },
        {
          name: "El Buen Samaritano",
          address: "7000 Woodhue Dr",
          phone: "512-439-0700",
          services: "Immigration legal services, citizenship classes, interpretation"
        },
        {
          name: "Austin Immigration Legal Services",
          phone: "512-474-1961",
          services: "Low-cost immigration legal assistance"
        },
        {
          name: "American Gateways",
          address: "314 E Highland Mall Blvd, Suite 501",
          phone: "512-478-0738",
          services: "Legal services for immigrants and refugees"
        },
        {
          name: "Immigration Legal Services Coalition",
          phone: "512-374-2700",
          services: "Immigration legal representation referrals"
        },
        {
          name: "Catholic Charities Immigration Services",
          phone: "512-651-6100",
          services: "Immigration counseling, citizenship preparation"
        }
      ]
    },
    {
      title: "YOUTH SERVICES (EXPANDED)",
      resources: [
        {
          name: "LifeWorks Emergency Shelter",
          address: "3700 S 1st St",
          phone: "512-735-2400",
          services: "Youth shelter for ages 14-17 and foster youth in emergency"
        },
        {
          name: "SafePlace Youth Services",
          address: "1515 Grove Blvd",
          phone: "512-267-7233",
          services: "Shelter, counseling, legal advocacy for youth escaping violence"
        },
        {
          name: "Boys and Girls Club of Austin",
          phone: "512-472-1139",
          services: "After-school programs, mentoring, academic support"
        },
        {
          name: "Austin Youth River Watch",
          phone: "512-974-3019",
          services: "Environmental education, job training for youth"
        },
        {
          name: "Big Brothers Big Sisters of Central Texas",
          phone: "512-472-5437",
          services: "Youth mentoring programs"
        },
        {
          name: "Youth Rise Texas",
          phone: "512-474-6641",
          services: "Leadership development, advocacy training for youth"
        },
        {
          name: "Austin Parks and Recreation Youth Programs",
          phone: "512-974-6700",
          services: "Sports leagues, camps, recreational activities"
        },
        {
          name: "Communities in Schools",
          phone: "512-414-9095",
          services: "In-school support services, mentoring, case management"
        }
      ]
    },
    {
      title: "DISABILITY SERVICES (EXPANDED)",
      resources: [
        {
          name: "ARCIL (Austin Resource Center for Independent Living)",
          address: "825 E. Rundberg Lane, Suite A-1",
          phone: "512-832-6349",
          services: "Independent living services, advocacy, peer support"
        },
        {
          name: "Easter Seals Central Texas",
          address: "8001 Centre Park Dr, Suite 100",
          phone: "512-478-2581",
          services: "Disability services, job training, transportation"
        },
        {
          name: "Any Baby Can",
          address: "6207 Sheridan Ave",
          phone: "512-454-3743",
          services: "Services for children with disabilities and their families"
        },
        {
          name: "The Arc of the Capital Area",
          phone: "512-476-7044",
          services: "Advocacy, information, services for people with intellectual disabilities"
        },
        {
          name: "Texas Rehabilitation Commission",
          phone: "1-800-628-5115",
          services: "Vocational rehabilitation, job placement, training"
        },
        {
          name: "Goodwill Industries",
          phone: "512-637-7100",
          services: "Job training and placement for people with disabilities"
        },
        {
          name: "Austin Resource Center for Independent Living - San Marcos",
          address: "San Marcos location",
          phone: "512-396-5827",
          services: "Independent living services for surrounding counties"
        }
      ]
    },
    {
      title: "FAITH-BASED SERVICES",
      resources: [
        {
          name: "Central Presbyterian Church",
          address: "200 E. 8th St",
          phone: "512-472-2445",
          hours: "Thursdays: 8-11AM",
          services: "Hot breakfast, hygiene, clothing, support group, bus passes"
        },
        {
          name: "University Baptist Church",
          address: "2130 Guadalupe St",
          phone: "512-478-8559",
          hours: "Thursdays: 5-6PM",
          services: "Boxed dinners, wifi & outlets available"
        },
        {
          name: "All Saints Episcopal Church",
          phone: "512-476-3589",
          services: "Utility assistance, emergency aid"
        },
        {
          name: "Hyde Park Baptist Church",
          address: "3810 Speedway",
          phone: "512-419-0308",
          hours: "Wednesdays: 1-3PM",
          services: "Food pantry, household supplies, vegetables, clothing"
        },
        {
          name: "St. Ignatius Martyr Catholic Church",
          address: "2303 Euclid Avenue",
          phone: "512-442-0226",
          hours: "Mon-Wed: 9AM-1PM, Thu: 9-11AM",
          services: "Groceries, bus passes, medication vouchers"
        },
        {
          name: "Society of Saint Vincent de Paul",
          address: "901 W. Braker Lane",
          hours: "Saturday: 8:00AM-11:00AM",
          services: "Food pantry, no access restrictions"
        },
        {
          name: "Mosaic Church North (The Charlie Center)",
          address: "12675 Research Blvd",
          phone: "512-922-8954",
          hours: "MON-FRI 9am-1pm",
          services: "Coordinated assessments, hot meals, benefits assistance, ID help"
        },
        {
          name: "St. Louise House",
          phone: "512-326-2774",
          website: "saintlouisehouse.org/services",
          services: "Affordable housing for mothers and children experiencing homelessness"
        }
      ]
    },
    {
      title: "COMMUNITY CENTERS",
      resources: [
        {
          name: "Neighborhood Center Services",
          address: "2209 Rosewood Ave",
          phone: "512-322-2341",
          services: "12 centers in Austin/Travis County, food, shelter, clothing, tutoring, medical services, WIC"
        },
        {
          name: "Dove Springs Recreation Center",
          address: "5801 Ainez Dr",
          phone: "512-972-6926",
          services: "Recreation programs, community events, meeting space"
        },
        {
          name: "Pan Am Recreation Center",
          address: "2100 E 3rd St",
          phone: "512-974-6060",
          services: "Fitness, sports programs, community activities"
        },
        {
          name: "Asian Family Support Services",
          phone: "512-451-8681",
          services: "Culturally appropriate services for Asian families"
        },
        {
          name: "Mexican American Cultural Center",
          address: "600 River St",
          phone: "512-974-3772",
          services: "Cultural programs, community events, meeting space"
        },
        {
          name: "George Washington Carver Museum",
          address: "1165 Angelina St",
          phone: "512-974-4926",
          services: "Cultural center, genealogy resources, community programs"
        }
      ]
    },
    {
      title: "EDUCATIONAL SUPPORT PROGRAMS",
      resources: [
        {
          name: "Austin Learning Academy (Virtual)",
          phone: "512-337-2044 or 512-650-8832",
          services: "ESL classes via Zoom, morning/afternoon/evening classes available"
        },
        {
          name: "Foundation Communities Education Programs",
          address: "4320 S Congress Ave",
          phone: "512-610-4020",
          hours: "MON-FRI, 9am-5pm",
          services: "In-person and online classes, free childcare"
        },
        {
          name: "CapCityKids (AISD)",
          address: "901 Neal Street",
          phone: "512-414-3690",
          services: "School enrollment, tutoring, supplies, clothing, summer camp, child care for homeless families"
        },
        {
          name: "Austin Public Library Literacy Programs",
          phone: "512-974-7400",
          services: "Adult literacy, ESL classes, computer training"
        },
        {
          name: "Literacy Coalition of Central Texas",
          phone: "512-478-7323",
          services: "Adult education, GED preparation, job skills"
        },
        {
          name: "Austin Community College Continuing Education",
          phone: "512-223-4ACC",
          services: "GED, ESL, workforce training, continuing education"
        },
        {
          name: "Goodwill Excel Center",
          address: "Multiple locations",
          phone: "512-637-7100",
          services: "High school diploma program for adults"
        }
      ]
    },
    {
      title: "JOB TRAINING & VOCATIONAL SERVICES",
      resources: [
        {
          name: "Workforce Solutions Capital Area",
          address: "6505 Airport Blvd",
          phone: "512-223-5000",
          services: "Job search assistance, skills training, unemployment benefits"
        },
        {
          name: "Austin Community College Workforce Education",
          phone: "512-223-4ACC",
          services: "Certificate programs, job training, continuing education"
        },
        {
          name: "Goodwill Industries Job Training",
          address: "1015 Norwood Park Blvd",
          phone: "512-637-7100",
          services: "Job training, placement services, life skills classes"
        },
        {
          name: "Urban League of Greater Austin",
          address: "524 E 53rd St",
          phone: "512-478-7176",
          services: "Job training, entrepreneurship programs, workforce development"
        },
        {
          name: "Capital IDEA",
          address: "5407 IH 35 N",
          phone: "512-457-9000",
          services: "Career training for healthcare, IT, and advanced manufacturing"
        },
        {
          name: "Construction Career Collaborative",
          phone: "512-454-8242",
          services: "Pre-apprenticeship construction training, job placement"
        },
        {
          name: "Women's Storybook Project Job Training",
          phone: "512-785-7803",
          services: "Job training and support for formerly incarcerated women"
        },
        {
          name: "DRIVE (Driving Real Innovation for a Vibrant Economy)",
          phone: "512-916-6000",
          services: "Manufacturing and logistics training, apprenticeships"
        },
        {
          name: "Texas Veterans Commission",
          phone: "512-463-5538",
          services: "Veteran job training and placement services"
        },
        {
          name: "Easter Seals Central Texas Vocational Services",
          phone: "512-478-2581",
          services: "Job training and placement for people with disabilities"
        }
      ]
    },
    {
      title: "FINANCIAL COUNSELING & BANKING",
      resources: [
        {
          name: "Austin Credit Union Financial Counseling",
          phone: "512-302-5555",
          services: "Free financial counseling, credit repair, budgeting"
        },
        {
          name: "Consumer Credit Counseling Service",
          phone: "512-448-3328",
          services: "Debt management, bankruptcy counseling, homebuyer education"
        },
        {
          name: "University Federal Credit Union Community Services",
          phone: "512-467-8080",
          services: "Financial literacy, first-time homebuyer programs"
        },
        {
          name: "Foundation Communities Financial Coaching",
          phone: "512-610-4020",
          services: "Financial coaching, credit building, savings programs"
        },
        {
          name: "iACT Financial Literacy Program",
          phone: "512-386-9145",
          services: "Financial education, credit counseling, tax preparation"
        },
        {
          name: "YWCA Greater Austin Financial Empowerment",
          phone: "512-548-3860",
          services: "Financial coaching for women, credit building"
        },
        {
          name: "Prosperity Bank Community Development",
          phone: "512-349-6000",
          services: "Financial education, small business lending"
        },
        {
          name: "Texas State Affordable Housing Corporation",
          phone: "512-477-3555",
          services: "Homebuyer education, down payment assistance"
        }
      ]
    },
    {
      title: "TECHNOLOGY & INTERNET ACCESS",
      resources: [
        {
          name: "Austin Public Library Computer Access",
          phone: "512-974-7400",
          services: "Free computer and internet access at all library locations"
        },
        {
          name: "Austin Free-Net",
          website: "austinfree.net",
          services: "Low-cost internet access, digital literacy training"
        },
        {
          name: "PCs for People Austin",
          phone: "855-728-3621",
          services: "Affordable computers, low-cost internet for low-income families"
        },
        {
          name: "Goodwill Computer Works",
          address: "1015 Norwood Park Blvd",
          phone: "512-637-7100",
          services: "Computer training, refurbished computer sales"
        },
        {
          name: "Digital Inclusion Alliance",
          phone: "512-900-1884",
          services: "Digital literacy training, device access programs"
        },
        {
          name: "Austin ISD Community Technology Centers",
          phone: "512-414-9223",
          services: "After-hours computer lab access, digital skills training"
        },
        {
          name: "Senior Planet Austin",
          address: "3710 Cedar St",
          phone: "512-275-6080",
          services: "Technology training for seniors, computer classes"
        },
        {
          name: "Latinitas Digital Media Program",
          phone: "512-900-0304",
          services: "Technology training for Latina youth and families"
        }
      ]
    },
    {
      title: "PET SERVICES",
      resources: [
        {
          name: "Austin Pets Alive! Pet Food Bank",
          address: "1156 W Cesar Chavez St",
          phone: "512-961-6519",
          services: "Free pet food for families in need"
        },
        {
          name: "Town Lake Animal Center",
          address: "1156 W Cesar Chavez St",
          phone: "512-978-0500",
          services: "Low-cost veterinary services, pet adoption"
        },
        {
          name: "EmancipPET",
          phone: "512-635-7774",
          services: "Free spay/neuter for low-income pet owners"
        },
        {
          name: "PAWS (Pets Are Worth Saving)",
          phone: "512-961-6519",
          services: "Emergency pet care assistance, food bank"
        },
        {
          name: "Austin Humane Society Veterinary Clinic",
          address: "124 W Anderson Ln",
          phone: "512-646-7387",
          services: "Low-cost veterinary services, pet supplies"
        },
        {
          name: "Thrive Pet Healthcare Mobile Clinic",
          phone: "512-900-4357",
          services: "Mobile veterinary services, vaccination clinics"
        },
        {
          name: "Safe Place for Pets",
          phone: "512-267-7233",
          services: "Emergency pet care for domestic violence survivors"
        },
        {
          name: "SPCA of Texas Austin",
          phone: "512-916-4775",
          services: "Animal cruelty investigations, emergency pet assistance"
        }
      ]
    },
    {
      title: "SEASONAL/WEATHER EMERGENCY SERVICES",
      resources: [
        {
          name: "City of Austin Cold Weather Shelters",
          phone: "512-305-4233",
          services: "Activated when temperature drops below 35°F"
        },
        {
          name: "Salvation Army Extreme Weather Response",
          phone: "512-476-1111",
          services: "Additional shelter capacity during weather emergencies"
        },
        {
          name: "Austin Disaster Relief Network",
          phone: "512-806-0800",
          services: "Disaster response, emergency supplies, temporary housing"
        },
        {
          name: "American Red Cross Central Texas",
          phone: "512-928-4271",
          services: "Emergency shelter, disaster relief, emergency supplies"
        },
        {
          name: "Travis County Emergency Management",
          phone: "512-854-4100",
          services: "Weather alerts, evacuation assistance, emergency coordination"
        },
        {
          name: "Austin Energy Emergency Line",
          phone: "512-322-9100",
          services: "Power outage reports, emergency power assistance"
        },
        {
          name: "Community Emergency Response Team (CERT)",
          phone: "512-974-0130",
          services: "Community disaster preparedness, emergency response training"
        },
        {
          name: "Austin Area Urban League Emergency Services",
          phone: "512-478-7176",
          services: "Emergency assistance during natural disasters"
        }
      ]
    },
    {
      title: "RECREATION & SOCIAL PROGRAMS",
      resources: [
        {
          name: "Austin Parks and Recreation Department",
          phone: "512-974-6700",
          services: "Recreation centers, sports leagues, community programs"
        },
        {
          name: "YMCA of Austin",
          phone: "512-291-9622",
          services: "Fitness programs, childcare, youth programs, financial assistance available"
        },
        {
          name: "Boys and Girls Club of Austin",
          phone: "512-472-1139",
          services: "After-school programs, summer camps, youth development"
        },
        {
          name: "Austin Parks Foundation",
          phone: "512-477-6533",
          services: "Community events, park programs, volunteer opportunities"
        },
        {
          name: "Lifetime Learning Institute",
          phone: "512-974-1960",
          services: "Senior adult education and social programs"
        },
        {
          name: "Austin Tennis Academy",
          phone: "512-443-1334",
          services: "Low-cost tennis programs, youth development through sports"
        },
        {
          name: "SafePlace Recreation Therapy",
          phone: "512-267-7233",
          services: "Therapeutic recreation for trauma survivors"
        },
        {
          name: "Special Olympics Texas - Austin",
          phone: "512-961-3888",
          services: "Sports programs for individuals with intellectual disabilities"
        },
        {
          name: "Austin Rowing Club Community Programs",
          phone: "512-467-7664",
          services: "Adaptive rowing, youth programs, scholarships available"
        }
      ]
    },
    {
      title: "GOVERNMENT ASSISTANCE PROGRAMS",
      resources: [
        {
          name: "Texas Health and Human Services",
          phone: "1-877-541-7905",
          services: "SNAP, TANF, Medicaid, CHIP applications and renewals"
        },
        {
          name: "Travis County Health and Human Services",
          phone: "512-854-7120",
          services: "Local assistance programs, emergency aid"
        },
        {
          name: "Social Security Administration Austin Office",
          address: "1025 Camino La Costa",
          phone: "1-800-772-1213",
          services: "Social Security benefits, disability applications, Medicare"
        },
        {
          name: "Texas Department of Family and Protective Services",
          phone: "1-800-252-5400",
          services: "Child protective services, adult protective services"
        },
        {
          name: "Austin City Council District Offices",
          phone: "512-974-2000",
          services: "Local government assistance, constituent services"
        },
        {
          name: "Travis County Commissioners Court",
          phone: "512-854-9020",
          services: "County services, public assistance programs"
        },
        {
          name: "Texas Workforce Commission",
          phone: "512-463-2222",
          services: "Unemployment benefits, job training, workforce development"
        },
        {
          name: "U.S. Department of Veterans Affairs",
          phone: "1-800-827-1000",
          services: "Veterans benefits, healthcare, disability compensation"
        },
        {
          name: "Internal Revenue Service Taxpayer Assistance",
          phone: "1-800-829-1040",
          services: "Tax preparation help, EITC, child tax credit assistance"
        }
      ]
    },
    {
      title: "HOUSING REPAIRS & ACCESSIBILITY",
      resources: [
        {
          name: "Austin Housing Repair Coalition",
          phone: "512-385-4663",
          services: "Home repairs for low-income homeowners, accessibility modifications"
        },
        {
          name: "Habitat for Humanity Austin ReStore",
          address: "310 Comal St",
          phone: "512-472-8788",
          services: "Affordable building materials, home repair assistance"
        },
        {
          name: "Travis County Housing and Weatherization",
          address: "5021 Cesar Chavez",
          phone: "512-385-4036",
          services: "Home repairs, handicap access, emergency plumbing/electrical, energy efficiency"
        },
        {
          name: "Rebuilding Together Austin",
          phone: "512-610-4020",
          services: "Free home repairs for low-income homeowners and nonprofits"
        },
        {
          name: "Austin Energy Weatherization Program",
          phone: "512-482-5346",
          services: "Energy efficiency improvements, weatherization assistance"
        },
        {
          name: "Christmas in April Austin",
          phone: "512-719-5432",
          services: "Annual home repair event, volunteer-based repairs"
        },
        {
          name: "Texas Department of Housing and Community Affairs",
          phone: "512-475-3800",
          services: "Housing rehabilitation programs, accessibility modifications"
        },
        {
          name: "Independent Living Resources",
          phone: "512-832-6349",
          services: "Home accessibility assessments, modification assistance"
        }
      ]
    },
    {
      title: "ADDITIONAL COMMUNITY SUPPORT SERVICES",
      resources: [
        {
          name: "Austin Neighborhood Centers",
          phone: "512-322-2341",
          services: "Multiple community centers offering various support services"
        },
        {
          name: "East Austin Advocacy Group",
          phone: "512-928-4355",
          services: "Community advocacy, tenant rights, neighborhood organizing"
        },
        {
          name: "Rundberg Community Alliance",
          phone: "512-832-1001",
          services: "Community organizing, resource coordination, advocacy"
        },
        {
          name: "Austin Revitalization Authority",
          phone: "512-974-3100",
          services: "Community development, housing initiatives"
        },
        {
          name: "East Cesar Chavez Neighborhood Planning Team",
          phone: "512-974-6700",
          services: "Community planning, neighborhood improvements"
        },
        {
          name: "Del Valle Community Coalition",
          phone: "512-386-4412",
          services: "Community organizing, resource development"
        },
        {
          name: "Dove Springs Community Development",
          phone: "512-972-6926",
          services: "Neighborhood revitalization, community programs"
        },
        {
          name: "St. Johns Community Garden",
          phone: "512-926-1313",
          services: "Community gardening, fresh food access, education"
        },
        {
          name: "Austin Tool Library",
          address: "2507 E 12th St",
          phone: "512-394-2635",
          services: "Tool lending, repair cafes, skill sharing"
        },
        {
          name: "Community Resilience Hub Network",
          phone: "512-974-6700",
          services: "Emergency preparedness, community organizing, climate resilience"
        },
        {
          name: "Austin Mutual Aid Networks",
          services: "Grassroots community support, resource sharing, emergency assistance"
        },
        {
          name: "Neighborhood Watch Coordinator",
          phone: "512-974-5000",
          services: "Community safety programs, crime prevention"
        },
        {
          name: "Austin Community Land Trust",
          phone: "512-385-4663",
          services: "Affordable housing development, anti-displacement work"
        },
        {
          name: "Community First! Village Tours",
          address: "9301 Hog Eye Rd",
          phone: "512-766-6071",
          services: "Educational tours, volunteer opportunities, community engagement"
        },
        {
          name: "Keep Austin Housed Coalition",
          phone: "512-305-4100",
          services: "Housing advocacy, tenant organizing, policy reform"
        },
        {
          name: "Austin Justice Coalition",
          phone: "512-900-3737",
          services: "Criminal justice reform, community organizing, advocacy"
        },
        {
          name: "Workers Defense Action Fund",
          address: "5604 Manor Rd",
          phone: "512-391-2305",
          services: "Worker organizing, policy advocacy, community education"
        },
        {
          name: "Austin Interfaith",
          phone: "512-926-6016",
          services: "Faith-based organizing, social justice advocacy"
        },
        {
          name: "Central Texas Immigrant Workers Rights Center",
          phone: "512-391-2305",
          services: "Immigrant rights advocacy, worker protection, community organizing"
        },
        {
          name: "Texas Organizing Project",
          address: "1715 E 6th St",
          phone: "512-474-6741",
          services: "Community organizing, voter engagement, policy advocacy"
        },
        {
          name: "Austin Tenant Council Fair Housing",
          address: "205 Chicon St",
          phone: "512-474-1961",
          services: "Fair housing advocacy, discrimination investigations"
        },
        {
          name: "Community Information Exchange",
          phone: "512-973-9203",
          services: "Resource coordination, information sharing, referral network"
        },
        {
          name: "Austin Recovery Oriented System of Care",
          phone: "512-472-4357",
          services: "Recovery support coordination, peer services"
        },
        {
          name: "Central Texas Food Security Coalition",
          phone: "512-684-2550",
          services: "Food justice advocacy, policy coordination"
        },
        {
          name: "Housing Works Austin",
          phone: "512-385-4663",
          services: "Housing advocacy, policy research, community organizing"
        },
        {
          name: "Austin Area Sustainability Network",
          phone: "512-974-2000",
          services: "Environmental justice, community gardens, sustainability education"
        },
        {
          name: "Faith Action Network",
          phone: "512-926-6016",
          services: "Interfaith advocacy, community organizing, social justice"
        },
        {
          name: "Austin Community Health Workers Coalition",
          phone: "512-972-5520",
          services: "Community health advocacy, health equity initiatives"
        },
        {
          name: "Digital Inclusion Austin",
          phone: "512-900-1884",
          services: "Digital equity advocacy, technology access programs"
        },
        {
          name: "Austin Transportation Equity Network",
          phone: "512-916-5465",
          services: "Transportation justice, public transit advocacy"
        },
        {
          name: "Community Land Advocacy Network",
          phone: "512-385-4663",
          services: "Land use advocacy, gentrification resistance, community control"
        },
        {
          name: "Austin Anti-Displacement Coalition",
          phone: "512-474-6741",
          services: "Anti-gentrification organizing, tenant protection advocacy"
        },
        {
          name: "Central Texas Criminal Justice Coalition",
          phone: "512-637-5572",
          services: "Criminal justice reform, reentry support advocacy"
        },
        {
          name: "Austin Area Immigration Coalition",
          phone: "512-478-0738",
          services: "Immigrant rights advocacy, policy coordination"
        },
        {
          name: "Community Healing Initiative",
          phone: "512-267-7233",
          services: "Trauma-informed community support, healing circles"
        },
        {
          name: "Grassroots Leadership",
          address: "1210 Rosewood Ave",
          phone: "512-473-2800",
          services: "Prison abolition organizing, immigrant detention advocacy"
        },
        {
          name: "Austin EcoNetwork",
          phone: "512-974-2000",
          services: "Environmental advocacy, climate justice, community education"
        },
        {
          name: "Community Resilience Trust",
          phone: "512-385-4663",
          services: "Community-controlled development, cooperative economics"
        },
        {
          name: "Austin Cooperative Business Association",
          phone: "512-474-1937",
          services: "Cooperative development, worker ownership, economic democracy"
        },
        {
          name: "Community Arts Network",
          phone: "512-974-3772",
          services: "Community-based arts programs, cultural organizing"
        },
        {
          name: "Austin Community Acupuncture Network",
          phone: "512-394-2635",
          services: "Community health, alternative healing, sliding scale services"
        },
        {
          name: "Healing Justice Austin",
          services: "Community healing, transformative justice, collective care"
        },
        {
          name: "Food Not Bombs Austin",
          phone: "512-391-0824",
          services: "Free food distribution, community organizing, mutual aid"
        },
        {
          name: "Really Really Free Market",
          services: "Gift economy events, resource sharing, community building"
        },
        {
          name: "Austin Time Exchange Network",
          phone: "512-394-2635",
          services: "Time banking, skill sharing, community currency"
        },
        {
          name: "Community Garden Network Austin",
          phone: "512-974-6700",
          services: "Community gardens coordination, urban agriculture support"
        },
        {
          name: "Austin Bike Zoo",
          address: "2415 E 6th St",
          phone: "512-524-2453",
          services: "Community bike shop, bike repair education, transportation justice"
        },
        {
          name: "Indigenous Cultures Institute",
          phone: "512-472-6267",
          services: "Indigenous community support, cultural programming"
        },
        {
          name: "Blackland Community Development Corporation",
          phone: "512-926-1313",
          services: "Community development, affordable housing, neighborhood organizing"
        },
        {
          name: "Austin Tenants Union",
          phone: "512-474-1961",
          services: "Tenant organizing, rent strike support, housing justice advocacy"
        },
        {
          name: "Community First! Village Resource Center",
          address: "9301 Hog Eye Rd",
          phone: "512-827-4730",
          services: "Tiny home community, housing support, dignity village model"
        },
        {
          name: "Austin Street Medicine",
          phone: "512-978-8130",
          services: "Mobile healthcare, street-based medical care, harm reduction"
        },
        {
          name: "Keep Austin Housed Coalition",
          phone: "512-385-4663",
          services: "Housing preservation, eviction prevention, housing policy advocacy"
        },
        {
          name: "Central Texas Harm Reduction Coalition",
          phone: "512-391-0824",
          services: "Needle exchange, overdose prevention, safe use education"
        },
        {
          name: "Austin Community Land Trust",
          phone: "512-385-4663",
          services: "Community-controlled land, affordable housing preservation"
        },
        {
          name: "Sunrise Movement Austin",
          phone: "512-394-2635",
          services: "Climate justice organizing, youth environmental activism"
        },
        {
          name: "Austin Justice Coalition",
          address: "1106 E 12th St",
          phone: "512-900-1884",
          services: "Criminal justice reform, police accountability, community safety"
        },
        {
          name: "Central Austin Community Development Corporation",
          phone: "512-474-1961",
          services: "Affordable housing development, community organizing"
        },
        {
          name: "Austin Mutual Aid Network",
          services: "Emergency assistance coordination, disaster response, community support"
        }
      ]
    }
  ]

  const getFilteredResourceData = () => {
    if (Object.keys(selectedCategories).length === 0 || 
        Object.values(selectedCategories).every(selected => selected)) {
      return resourceData
    }

    return resourceData.filter(category => selectedCategories[category.title])
  }

  const getTotalResourceCount = () => {
    return getFilteredResourceData().reduce((total, category) => total + category.resources.length, 0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading resources...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen print:bg-white">
      {/* Category Selection Interface - Hidden on Print */}
      <div className="category-selector print:hidden mb-8">
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowCategorySelector(!showCategorySelector)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>{showCategorySelector ? t.hideCategories : t.showCategories}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showCategorySelector ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Controls: Language & Layout Toggle */}
          <div className="flex items-center space-x-4">
            {/* Layout Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Layout:</span>
              <button
                onClick={() => setLayoutMode(layoutMode === 'compact' ? 'cards' : 'compact')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {layoutMode === 'compact' ? 'Card View' : 'Compact View'}
              </button>
            </div>
            
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Language:</span>
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
              >
                {language === 'en' ? 'Español' : 'English'}
              </button>
            </div>
          </div>
        </div>
        
        {showCategorySelector && (
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.selectCategories}</h2>
        
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {t.selectAll} ({resourceData.length} {t.categoriesText})
              </button>
              
              <button
                onClick={handleDeselectAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                {t.clearAll}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {resourceData.map((category, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedCategories[category.title] || false}
                    onChange={() => handleCategoryToggle(category.title)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800 block">
                      {translateCategory(category.title)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {category.resources.length} {t.resources}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{t.selected}:</span> {getSelectedCategoriesCount()} {language === 'es' ? 'de' : 'of'} {resourceData.length} {t.categoriesText}<br/>
                <span className="font-medium">{t.resourcesToPrint}</span> {getTotalResourceCount()}
              </div>
              
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
              >
                {getTotalResourceCount() === resourceData.reduce((total, cat) => total + cat.resources.length, 0) ? t.printAll : t.printSelected} ({getTotalResourceCount()})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Print Header with Welcome Message - Page 1 Only */}
      <div className="hidden print:block">
        {/* Resource Guide Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.printHeader}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {t.printSubtitle} - {getTotalResourceCount()} {t.resources}
          </p>
        </div>

        {/* Welcome Message - Page 1 Only */}
        <div className="text-center mb-12 print:break-after-page">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t.welcomeMessage.title}
          </h1>
          
          <div className="max-w-2xl mx-auto text-left">
            <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-line mb-6">
              {t.welcomeMessage.content}
            </div>
            
            <div className="text-right text-lg italic text-gray-700">
              {t.welcomeMessage.signature}
            </div>
          </div>
        </div>

        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'For the most up-to-date information, please call the numbers provided. Services and hours may change without notice.'
              : 'Para obtener la información más actualizada, llame a los números proporcionados. Los servicios y horarios pueden cambiar sin previo aviso.'}
          </p>
        </div>
      </div>

      {/* Page Header - Screen Only */}
      <div className="print:hidden mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.pageTitle}</h1>
        <p className="text-lg text-gray-600 mb-4">{t.pageSubtitle}</p>
        <div className="text-sm text-gray-500">
          {t.showing} <span className="font-semibold text-blue-600">{getTotalResourceCount()}</span> {t.resources} 
          {getSelectedCategoriesCount() < resourceData.length && (
            <span> {language === 'es' ? 'en' : 'from'} <span className="font-semibold">{getSelectedCategoriesCount()}</span> {language === 'es' ? 'de' : 'of'} {resourceData.length} {t.categoriesText}</span>
          )}
        </div>
      </div>

      {/* Resources Display */}
      <div className="space-y-8 bg-white print:bg-transparent rounded-2xl p-6 print:p-0 shadow-sm print:shadow-none">
        {getFilteredResourceData().map((category, categoryIndex) => (
          <div key={categoryIndex} className="print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
              {translateCategory(category.title)}
            </h2>
            
            {/* Conditional Layout Based on Mode */}
            {layoutMode === 'compact' ? (
              /* Compact Table Layout - Optimized for Print */
              <div className="compact-resource-table">
                <div className="hidden print:block mb-2 text-xs text-gray-600 font-medium border-b border-gray-300 pb-1">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">Resource & Contact</div>
                    <div className="col-span-6">Services & Description</div>
                    <div className="col-span-2">Website</div>
                  </div>
                </div>
                {category.resources.map((resource, resourceIndex) => (
                  <div 
                    key={resourceIndex} 
                    className="grid grid-cols-12 gap-2 py-1.5 text-xs border-b border-gray-100 print:break-inside-avoid hover:bg-gray-50 print:hover:bg-transparent"
                  >
                    {/* Column 1: Resource Name & Contact */}
                    <div className="col-span-4 space-y-0.5">
                      <div className="font-semibold text-gray-900 text-sm leading-tight">
                        {translateResourceName(resource.name)}
                      </div>
                      {resource.phone && (
                        <div className="text-blue-600 font-mono">
                          📞 {resource.phone}
                        </div>
                      )}
                      {resource.address && (
                        <div className="text-gray-600">
                          📍 {translateText(resource.address)}
                        </div>
                      )}
                      {resource.email && (
                        <div className="text-gray-600 break-all">
                          ✉️ {resource.email}
                        </div>
                      )}
                      {resource.hours && (
                        <div className="text-gray-600">
                          🕒 {translateText(resource.hours)}
                        </div>
                      )}
                    </div>
                    
                    {/* Column 2: Services & Description */}
                    <div className="col-span-6">
                      {resource.services && (
                        <div className="text-gray-800 mb-1">
                          <span className="font-medium">Services:</span> {translateServices(resource.services)}
                        </div>
                      )}
                      {resource.notes && (
                        <div className="text-gray-700 italic">
                          <span className="font-medium">Note:</span> {translateNotes(resource.notes)}
                        </div>
                      )}
                    </div>
                    
                    {/* Column 3: Website */}
                    <div className="col-span-2">
                      {resource.website && (
                        <div className="text-blue-600 break-all">
                          🌐 {resource.website}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Original Card Layout - Better for Screen Viewing */
              <div className="grid gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <div 
                    key={resourceIndex} 
                    className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow print:break-inside-avoid print:border-gray-400 print:shadow-none"
                  >
                  <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                    {translateResourceName(resource.name)}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    {resource.address && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">{t.address}:</span>
                          <span className="ml-2">{translateText(resource.address)}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.phone && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">{t.phone}:</span>
                          <span className="ml-2 font-mono text-blue-600">{resource.phone}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.website && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-gray-800">{t.website}:</span>
                          <span className="ml-2 text-blue-600 break-all">{resource.website}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.email && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-gray-800">{t.email}:</span>
                          <span className="ml-2 text-blue-600 break-all">{resource.email}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.hours && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">{t.hours}:</span>
                          <span className="ml-2">{translateText(resource.hours)}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.services && (
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">{t.services}:</span>
                          <span className="ml-2">{translateServices(resource.services)}</span>
                        </div>
                      </div>
                    )}
                    
                    {resource.notes && (
                      <div className="flex items-start space-x-2 mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-yellow-800">{t.notes}:</span>
                          <span className="ml-2 italic text-yellow-700">{translateNotes(resource.notes)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  ))}
                </div>
              )
            }
          </div>
        ))}
      </div>

      {/* Important Phone Numbers Section - Always printed at bottom */}
      <div className="mt-12 print:mt-8">
        <h2 className="text-2xl font-bold text-red-700 mb-4 border-b-2 border-red-200 pb-2">
          {t.emergencyNumbers}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg">
          <div className="bg-red-50 p-5 rounded-xl border-2 border-red-200 shadow-sm text-center">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-14 0a6 6 0 0012 0 6 6 0 00-12 0zm7-3a1 1 0 10-2 0v3a1 1 0 001 1h3a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="font-bold text-red-800 mb-2">{t.emergency}</div>
            <div className="font-mono text-2xl text-red-700 font-black">911</div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200 shadow-sm text-center">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div className="font-bold text-blue-800 mb-2">{t.crisis}</div>
            <div className="font-mono text-2xl text-blue-700 font-black">988</div>
          </div>
          
          <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200 shadow-sm text-center">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="font-bold text-green-800 mb-2">{t.info}</div>
            <div className="font-mono text-2xl text-green-700 font-black">211</div>
          </div>
          
          <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200 shadow-sm text-center">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="font-bold text-purple-800 mb-2">{t.domestic}</div>
            <div className="font-mono text-lg text-purple-700 font-black">512-267-SAFE</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mt-4">
          <div className="bg-yellow-50 p-4 rounded border-2 border-yellow-200">
            <div className="font-bold text-yellow-800 mb-2">{t.mental}</div>
            <div className="font-mono text-xl">512-472-4357</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded border-2 border-orange-200">
            <div className="font-bold text-orange-800 mb-2">{t.foodBank}</div>
            <div className="font-mono text-xl">877-541-7905</div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded border-2 border-indigo-200">
            <div className="font-bold text-indigo-800 mb-2">{t.housing}</div>
            <div className="font-mono text-xl">512-522-1097</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
            <div className="font-bold text-gray-800 mb-2">{t.weather}</div>
            <div className="font-mono text-xl">512-305-4233</div>
          </div>
        </div>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>{t.printFooter} | {t.lastUpdated} {new Date().toLocaleDateString()}</p>
        <p>{t.compiled} | {t.visitWebsite}</p>
      </div>

      <style jsx>{`
        @media print {
          @page {
            margin: 0.75in;
            size: letter;
          }
          
          .container {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .print\\:break-before-page {
            break-before: page;
            page-break-before: always;
          }
          
          .print\\:break-after-page {
            break-after: page;
            page-break-after: always;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}