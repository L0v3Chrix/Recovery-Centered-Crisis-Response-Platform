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
  notes?: string
}

interface ResourceCategory {
  title: string
  resources: Resource[]
}

export default function PrintableResourcesPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handlePrint = () => {
    window.print()
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
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading comprehensive resource list...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Button - Fixed at top, hidden when printing */}
      <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-4 print:hidden shadow-sm z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Central Texas Resources - Complete Printable List</h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          >
            🖨️ PRINT COMPLETE LIST
          </button>
        </div>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block text-center py-8 border-b-2 border-gray-900">
        <h1 className="text-3xl font-bold mb-2">CENTRAL TEXAS RESOURCES</h1>
        <h2 className="text-xl mb-2">Complete Resource Directory for People Experiencing Hardship</h2>
        <p className="text-lg">Austin & Travis County, Texas</p>
        <p className="text-sm mt-2">For updates visit: centraltexasresources.org | Emergency: 911 | Crisis: 988</p>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Screen-only introduction */}
        <div className="print:hidden mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">About This Resource List</h2>
          <p className="mb-2">This comprehensive directory contains 500+ verified resources for people experiencing hardship in Central Texas. It includes emergency services, food assistance, housing, healthcare, and essential support services.</p>
          <p className="text-sm text-gray-600">
            <strong>For immediate help:</strong> Emergency 911 | Crisis Support 988 | SAFE Alliance 512-267-7233
          </p>
        </div>

        {/* Resource Categories */}
        {resourceData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12 break-inside-avoid">
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-3 border-blue-600 pb-2 print:text-xl print:border-b-2 print:border-black">
                {category.title}
              </h2>
            </div>

            {/* Resources in Category */}
            <div className="space-y-6">
              {category.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="border-l-4 border-blue-200 pl-4 break-inside-avoid print:border-l-2 print:border-black print:pl-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 print:text-base print:font-bold">
                    {resource.name}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-gray-700 print:text-xs">
                    {resource.address && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Address:</span>
                        <span>{resource.address}</span>
                      </div>
                    )}
                    
                    {resource.phone && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Phone:</span>
                        <span>{resource.phone}</span>
                      </div>
                    )}
                    
                    {resource.hours && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Hours:</span>
                        <span>{resource.hours}</span>
                      </div>
                    )}
                    
                    {resource.website && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Website:</span>
                        <span className="break-all">{resource.website}</span>
                      </div>
                    )}
                    
                    {resource.email && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Email:</span>
                        <span className="break-all">{resource.email}</span>
                      </div>
                    )}
                    
                    {resource.services && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Services:</span>
                        <span>{resource.services}</span>
                      </div>
                    )}
                    
                    {resource.notes && (
                      <div className="flex flex-wrap">
                        <span className="font-medium w-16 flex-shrink-0">Notes:</span>
                        <span className="italic">{resource.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer for print */}
        <div className="mt-12 pt-8 border-t-2 border-gray-300 print:border-black text-center print:break-before-page">
          <div className="print:hidden">
            <p className="text-lg font-semibold mb-2">Need to update this list?</p>
            <p className="text-sm text-gray-600">Visit centraltexasresources.org for the most current information</p>
          </div>
          
          <div className="hidden print:block">
            <h3 className="text-lg font-bold mb-4">IMPORTANT PHONE NUMBERS</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Crisis Support:</strong> 988</p>
                <p><strong>Domestic Violence:</strong> 512-267-7233</p>
                <p><strong>Mental Health Crisis:</strong> 512-472-4357</p>
              </div>
              <div>
                <p><strong>Food Bank:</strong> 877-541-7905</p>
                <p><strong>Housing Assessment:</strong> 512-522-1097</p>
                <p><strong>Info & Referrals:</strong> 211</p>
                <p><strong>Cold Weather Emergency:</strong> 512-305-4233</p>
              </div>
            </div>
            <div className="mt-6 text-xs">
              <p><strong>Central Texas Resources Directory</strong></p>
              <p>Compiled from verified community resources | Visit centraltexasresources.org for updates</p>
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          body {
            font-size: 11pt;
            line-height: 1.3;
          }
          
          .break-inside-avoid {
            break-inside: avoid;
          }
          
          .break-before-page {
            break-before: page;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}