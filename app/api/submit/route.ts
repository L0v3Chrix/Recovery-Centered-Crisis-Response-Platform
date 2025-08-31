import { NextRequest, NextResponse } from 'next/server'

// GHL API v2 Configuration
const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com'
const GHL_PIT = process.env.GHL_PIT || 'pit-8963fa78-8ed3-4c4f-99fb-898f76fc6620'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 's64yjTf17LupdrR0UtVQ'
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID
const GHL_PIPELINE_STAGE_ID = process.env.GHL_PIPELINE_STAGE_ID
const GHL_USER_ID = process.env.GHL_USER_ID

interface ResourceSubmission {
  // Contact Information
  contactName: string
  contactEmail: string
  contactPhone?: string
  
  // Resource Details
  resourceName: string
  resourceDescription: string
  resourceCategory: string
  resourceWebsite?: string
  resourceAddress?: string
  resourcePhone?: string
  
  // Additional Details
  servicesOffered: string
  hoursOfOperation?: string
  eligibilityCriteria?: string
  costInfo?: string
  
  // Meta
  submissionSource: string
}

interface GHLContact {
  firstName: string
  lastName: string
  email: string
  phone?: string
  tags?: string[]
  customFields?: Array<{key: string, field_value: string}>
  source?: string
}

interface GHLOpportunity {
  pipelineId: string
  stageId: string
  assignedTo: string
  title: string
  name: string
  monetaryValue: number
  status: string
}

interface GHLNote {
  body: string
  userId?: string
}

// Create note attached to contact in GoHighLevel
async function createGHLNote(contactId: string, noteData: GHLNote): Promise<boolean> {
  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_PIT}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(noteData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      console.error(`GHL Note Creation Failed: ${response.status}`, errorData)
      return false
    }

    const result = await response.json()
    console.log('GHL Note Created:', { noteId: result.note?.id || result.id })
    return true
  } catch (error) {
    console.error('Error creating GHL note:', error)
    return false
  }
}

// Format resource submission as comprehensive note content
function formatResourceNote(data: ResourceSubmission): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `🔄 RESOURCE SUBMISSION - ${timestamp}

📍 RESOURCE DETAILS:
• Name: ${data.resourceName}
• Category: ${data.resourceCategory}
• Description: ${data.resourceDescription}

📞 CONTACT INFORMATION:
• Phone: ${data.resourcePhone || 'Not provided'}
• Website: ${data.resourceWebsite || 'Not provided'}  
• Address: ${data.resourceAddress || 'Not provided'}

ℹ️ ADDITIONAL INFORMATION:
• Services Offered: ${data.servicesOffered || 'Not specified'}
• Hours of Operation: ${data.hoursOfOperation || 'Not specified'}
• Eligibility Criteria: ${data.eligibilityCriteria || 'Not specified'}
• Cost Information: ${data.costInfo || 'Not specified'}

📤 SUBMISSION DETAILS:
• Source: ${data.submissionSource || 'helpnowatx.org/submit'}
• Submitted: ${timestamp}
• Status: Pending Review
• Contact ID: Will be updated after processing

⚡ NEXT STEPS:
• Verify resource information
• Contact organization to confirm details  
• Add to verified resource database
• Send confirmation email when live`
}

export async function POST(request: NextRequest) {
  try {
    const data: ResourceSubmission = await request.json()
    
    // Validate required fields
    if (!data.contactName || !data.contactEmail || !data.resourceName || !data.resourceDescription) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'contactName, contactEmail, resourceName, and resourceDescription are required' },
        { status: 400 }
      )
    }

    // Validate GHL configuration
    if (!GHL_PIT || !GHL_LOCATION_ID) {
      console.error('GHL configuration missing:', { GHL_PIT: !!GHL_PIT, GHL_LOCATION_ID: !!GHL_LOCATION_ID })
      return NextResponse.json(
        { error: 'Server configuration error', details: 'GHL integration not properly configured' },
        { status: 500 }
      )
    }

    // Prepare GHL contact data
    const [firstName, ...lastNameParts] = data.contactName.trim().split(' ')
    const lastName = lastNameParts.join(' ') || 'Unknown'

    const contactData: GHLContact = {
      firstName,
      lastName,
      email: data.contactEmail,
      source: 'helpnowatx.org'
    }

    // Add phone if provided
    if (data.contactPhone?.trim()) {
      contactData.phone = data.contactPhone.trim()
    }

    // Step 1: Create or update contact in GHL
    const contactResponse = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_PIT}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify({
        ...contactData,
        locationId: GHL_LOCATION_ID
      })
    })

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text()
      console.error('GHL Contact Creation Failed:', {
        status: contactResponse.status,
        statusText: contactResponse.statusText,
        error: errorText,
        contactData: JSON.stringify(contactData, null, 2)
      })

      // Webhook fallback - attempt to send data to a backup endpoint
      await webhookFallback(data, `GHL Contact Creation Failed: ${contactResponse.status}`)

      return NextResponse.json(
        { error: 'Failed to create contact', details: 'Contact submission failed but has been logged for manual processing' },
        { status: contactResponse.status }
      )
    }

    const contactResult = await contactResponse.json()
    const contactId = contactResult.contact?.id
    console.log('GHL Contact Created:', { contactId, email: data.contactEmail })

    // Step 2: Create comprehensive note with all resource details
    if (contactId) {
      const noteContent = formatResourceNote(data)
      const noteData: GHLNote = {
        body: noteContent
      }

      console.log('Creating comprehensive note for contact:', contactId)
      const noteCreated = await createGHLNote(contactId, noteData)
      
      if (noteCreated) {
        console.log('Resource details successfully attached as note')
      } else {
        console.error('Failed to attach resource details as note')
      }
    }

    // Step 3: Create opportunity if pipeline info is available
    if (GHL_PIPELINE_ID && GHL_PIPELINE_STAGE_ID && contactResult.contact?.id) {
      const opportunityData: GHLOpportunity = {
        pipelineId: GHL_PIPELINE_ID,
        stageId: GHL_PIPELINE_STAGE_ID,
        assignedTo: GHL_USER_ID || contactResult.contact.id,
        title: `Resource Submission: ${data.resourceName}`,
        name: `${data.resourceName} - ${data.resourceCategory}`,
        monetaryValue: 0,
        status: 'open'
      }

      const opportunityResponse = await fetch(`${GHL_BASE_URL}/opportunities/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_PIT}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
          'X-LC-Tenant': GHL_LOCATION_ID
        },
        body: JSON.stringify({
          ...opportunityData,
          contactId: contactResult.contact.id
        })
      })

      if (!opportunityResponse.ok) {
        console.error('GHL Opportunity Creation Failed:', {
          status: opportunityResponse.status,
          statusText: opportunityResponse.statusText,
          error: await opportunityResponse.text()
        })
        // Continue - contact was created successfully
      } else {
        const opportunityResult = await opportunityResponse.json()
        console.log('GHL Opportunity Created:', { opportunityId: opportunityResult.opportunity?.id })
      }
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Resource submission received successfully',
      contactId: contactResult.contact?.id,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Resource Submission Error:', error)
    
    // Attempt webhook fallback
    try {
      const data = await request.json()
      await webhookFallback(data, `API Error: ${error}`)
    } catch (fallbackError) {
      console.error('Webhook fallback also failed:', fallbackError)
    }

    return NextResponse.json(
      { error: 'Internal server error', details: 'Submission failed but has been logged for manual processing' },
      { status: 500 }
    )
  }
}

// Webhook fallback system
async function webhookFallback(data: ResourceSubmission, errorReason: string) {
  try {
    // In a real implementation, this would post to a backup webhook service
    // For now, we'll log the data for manual processing
    console.log('WEBHOOK FALLBACK TRIGGERED:', {
      timestamp: new Date().toISOString(),
      reason: errorReason,
      submissionData: JSON.stringify(data, null, 2)
    })

    // Could implement email notifications, Slack webhooks, or backup database storage here
    // Example: await sendToSlackWebhook(data, errorReason)
    // Example: await saveToBackupDatabase(data, errorReason)
    
    return true
  } catch (error) {
    console.error('Webhook fallback failed:', error)
    return false
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Resource Submission API',
    ghlConfigured: !!(GHL_PIT && GHL_LOCATION_ID),
    timestamp: new Date().toISOString()
  })
}