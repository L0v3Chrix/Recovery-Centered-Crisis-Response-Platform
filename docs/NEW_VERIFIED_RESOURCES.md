# New Verified Resources for HelpNow Quiz Seeding

This document contains the initial seed data for the HelpNow Quiz system. These 12 resources represent a cross-section of high-quality, verified resources from the existing database.

## Crisis Resources

### 988 Suicide & Crisis Lifeline
- **Category:** Crisis
- **Phone:** 988
- **Website:** https://988lifeline.org
- **Hours:** 24/7
- **Services:** Crisis counseling, suicide prevention, mental health support, referrals
- **Tags:** crisis:immediate, access:phone, available:24/7
- **Location:** National (serves Austin area)
- **Notes:** Free, confidential support. Available in English and Spanish.

### Austin Travis County Integral Care
- **Category:** Crisis  
- **Phone:** (512) 472-4357
- **Address:** 1430 Collier Street, Austin, TX 78702
- **Website:** https://integralcare.org
- **Hours:** 24/7
- **Services:** 24-hour crisis hotline, crisis intervention, suicide prevention, walk-in mental health assessment
- **Tags:** crisis:immediate, access:walk-in, access:phone, available:24/7
- **Location:** East Austin
- **Notes:** Walk-in assessments available at Rundberg location

## Food Resources

### Angel House
- **Category:** Food
- **Phone:** (512) 478-0447
- **Address:** 908 E Cesar Chavez St, Austin, TX 78702
- **Hours:** Daily 7:00 AM - 2:00 PM
- **Services:** Hot breakfast (7-11am), sack lunch with soup (11am-2pm), coffee, showers
- **Tags:** food:breakfast, food:lunch, access:walk-in, no-questions-asked
- **Location:** East Austin
- **Notes:** No questions asked policy. Also provides showers and clothing.

### Central Texas Food Bank - Mobile Pantry
- **Category:** Food
- **Phone:** (512) 684-2550
- **Website:** https://www.centraltexasfoodbank.org
- **Hours:** Various locations and times
- **Services:** Free groceries, fresh produce, food stamps application assistance
- **Tags:** food:groceries, mobile-service, no-id-required
- **Location:** Various Austin locations
- **Notes:** Mobile pantry visits different neighborhoods. Call for schedule.

## Shelter Resources

### LifeWorks Emergency Services
- **Category:** Shelter
- **Phone:** (512) 441-6914
- **Address:** 3700 S 1st St, Austin, TX 78704
- **Website:** https://lifeworksaustin.org
- **Hours:** 24/7 intake
- **Services:** Crisis intervention, 24-hour intake, emergency shelter, case management
- **Tags:** shelter:emergency, age:18-26, access:walk-in, available:24/7
- **Location:** South Austin
- **Notes:** Serves homeless youth and young adults 18-26 years old

## Healthcare Resources

### Austin Recovery Center
- **Category:** Healthcare/Recovery
- **Phone:** (512) 444-6600
- **Address:** 4209 S Lamar Blvd, Austin, TX 78704
- **Hours:** Monday-Friday 8:00 AM - 5:00 PM
- **Services:** Addiction treatment, MAT (medication-assisted treatment), counseling
- **Tags:** recovery:MAT, recovery:treatment, access:appointment
- **Location:** South Austin
- **Notes:** Insurance and sliding scale available

### CommUnity Care Health Centers
- **Category:** Healthcare
- **Phone:** (512) 978-9015
- **Address:** Multiple locations
- **Website:** https://www.communitycare.com
- **Hours:** Varies by location
- **Services:** Primary care, mental health, dental, pharmacy services
- **Tags:** healthcare:primary, healthcare:mental-health, multiple-locations
- **Location:** Multiple Austin locations
- **Notes:** Federally Qualified Health Center with sliding fee scale

## Legal Resources

### Texas RioGrande Legal Aid
- **Category:** Legal
- **Phone:** (512) 374-2700
- **Address:** 4920 N IH 35, Austin, TX 78751
- **Website:** https://www.trla.org
- **Hours:** Monday-Friday 8:00 AM - 5:00 PM
- **Services:** Free legal services, immigration help, housing issues, public benefits
- **Tags:** legal:free, legal:immigration, legal:housing
- **Location:** North Austin
- **Notes:** Income eligibility requirements apply

## Transportation Resources

### Capital Metro ACCESS
- **Category:** Transportation
- **Phone:** (512) 369-6040
- **Website:** https://www.capmetro.org/access
- **Hours:** Monday-Friday 6:00 AM - 10:00 PM, weekends 8:00 AM - 6:00 PM
- **Services:** Paratransit services for people with disabilities
- **Tags:** transportation:disability, access:phone, requires-application
- **Location:** Austin metro area
- **Notes:** ADA paratransit service. Application and eligibility required.

## Mental Health Resources

### Austin Child Guidance Center
- **Category:** Mental Health
- **Phone:** (512) 451-2242
- **Address:** 810 W 45th St, Austin, TX 78751
- **Website:** https://www.austinchildguidance.org
- **Hours:** Monday-Friday 8:00 AM - 5:00 PM
- **Services:** Child and family therapy, psychiatric services, crisis intervention
- **Tags:** mental-health:child, mental-health:family, age:child-teen
- **Location:** Central Austin
- **Notes:** Specializes in children and adolescents. Sliding scale fees available.

## Documentation Resources

### Austin Public Health - Vital Records
- **Category:** Documentation
- **Phone:** (512) 978-8350
- **Address:** 15 Waller St, Austin, TX 78702
- **Hours:** Monday-Friday 7:30 AM - 4:30 PM
- **Services:** Birth certificates, death certificates, marriage licenses
- **Tags:** documents:vital-records, documents:id
- **Location:** East Austin
- **Notes:** Fees required for most services. Cash, check, or money order accepted.

## Financial Assistance

### Salvation Army Austin
- **Category:** Financial
- **Phone:** (512) 476-1111
- **Address:** 501 E 8th St, Austin, TX 78701
- **Hours:** Monday-Friday 9:00 AM - 12:00 PM, 1:00 PM - 4:00 PM
- **Services:** Emergency financial assistance, rent/utility help, food assistance
- **Tags:** financial:emergency, financial:rent-utility, requires-appointment
- **Location:** Central Austin
- **Notes:** Call for appointment. Documentation required for assistance.

---

## Data Seeding Instructions

These resources should be converted to the standard Resource interface format and stored in:
- `data/resources/crisis.json`
- `data/resources/food.json`
- `data/resources/shelter.json`
- `data/resources/healthcare.json`
- `data/resources/legal.json`
- `data/resources/transportation.json`
- `data/resources/mental-health.json`
- `data/resources/documentation.json`
- `data/resources/financial.json`

Each resource should include:
- Full contact information
- Precise coordinates (lat/lng)
- Standardized hours format
- Complete service arrays
- Proper category and recovery stage classifications
- Accessibility and language information where applicable