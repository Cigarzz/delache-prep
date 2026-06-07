/* ==========================================================================
   DELACHE PRE-CALL PREP FUNNEL - CLIENT LOGIC & FUNCTIONALITY
   ========================================================================== */

// ─── CONFIGURATION CONSTANTS ───
// Paste your GHL / Zapier webhook endpoint URL here:
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/BrisbaneSwappableWebhookSlot';
// Fallback phone and contact details branded for Delache Designs:
const CONTACT_PHONE = '+61 416 831 736';
const CONTACT_EMAIL = 'hello@delache.com.au';

document.addEventListener('DOMContentLoaded', () => {
  
  // ─── 1. URL PARAMETERS BINDING & PARSING ───
  
  // Parse query parameters (supporting both lowercase and capitalized keys for resilience)
  const getParam = (key) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key) || searchParams.get(key.charAt(0).toUpperCase() + key.slice(1)) || '';
  };

  const nameVal = getParam('name') || 'there';
  const businessVal = getParam('business') || 'your business';
  const demoVal = getParam('demo'); // loads png image if present
  const timeVal = getParam('time'); // booked time slots

  // Inject dynamic variables into HTML elements
  const injectText = (selector, val) => {
    const elems = document.querySelectorAll(selector);
    elems.forEach(el => {
      // Preserve original casing or modify accordingly
      if (el.classList.contains('dynamic-val-upper')) {
        el.textContent = val.toUpperCase();
      } else {
        el.textContent = val;
      }
    });
  };

  // Perform basic DOM personalization injections
  injectText('.dynamic-val', nameVal);
  injectText('#hero-name', nameVal);
  injectText('#success-name', nameVal);
  injectText('#booked-name', nameVal);
  injectText('#embed-name', nameVal);
  injectText('#poster-name', nameVal);
  
  injectText('#hero-business', businessVal);
  injectText('#meta-business', businessVal);
  injectText('#video-business', businessVal);
  injectText('#bullets-business', businessVal);
  injectText('#poster-business', businessVal);
  injectText('#toolbar-business-title', businessVal);
  injectText('#mock-logo-text', businessVal);
  injectText('#mock-footer-text', businessVal);
  injectText('#log-business', businessVal);
  injectText('#log-name', nameVal);

  // Helper: format date to AEST (Australia/Brisbane)
  function formatAESTDate(dateObj) {
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Australia/Brisbane' }).format(dateObj);
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'Australia/Brisbane' }).format(dateObj);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'Australia/Brisbane' }).format(dateObj);
    
    const timePartsString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Australia/Brisbane'
    }).format(dateObj);
    
    const [hourStr, minuteStr] = timePartsString.split(':');
    const h24 = parseInt(hourStr, 10) % 24;
    const period = h24 >= 12 ? 'pm' : 'am';
    const displayHour = h24 % 12 === 0 ? 12 : h24 % 12;
    
    return `${weekday} ${day} ${month} · ${displayHour}:${minuteStr}${period}`;
  }

  let isBooked = false;
  let formattedTime = '';
  let dateObj = null;

  if (timeVal) {
    const cleanTimeVal = timeVal.trim();
    const testDate = new Date(cleanTimeVal);
    if (!isNaN(testDate.getTime())) {
      const aesTimeStr = cleanTimeVal.includes('GMT') || cleanTimeVal.includes('UTC') || cleanTimeVal.includes('+')
        ? cleanTimeVal
        : cleanTimeVal + " GMT+1000";
      
      const aesDate = new Date(aesTimeStr);
      if (!isNaN(aesDate.getTime())) {
        dateObj = aesDate;
        formattedTime = formatAESTDate(dateObj);
        isBooked = true;
      }
    }
  }

  // ─── 2. CALENDAR VIEWPORT TOGGLE & LINKS GENERATOR ───

  const calendarBookedCard = document.getElementById('calendar-booked-card');
  const calendarSchedulerCard = document.getElementById('calendar-scheduler-card');

  if (isBooked && dateObj) {
    // Show booked state, hide scheduler iframe slot
    calendarBookedCard.classList.remove('hidden');
    calendarSchedulerCard.classList.add('hidden');

    // Inject formatted time
    injectText('#log-time', formattedTime);
    injectText('#booked-time-span', formattedTime);

    // Generate Calendar Add buttons dynamically
    setupAddToCalendarButtons(dateObj);
  } else {
    // Show scheduler GHL embed slot, hide booked card
    calendarBookedCard.classList.add('hidden');
    calendarSchedulerCard.classList.remove('hidden');
    
    // Clear/hide any broken log date
    injectText('#log-time', 'Not Booked');
  }

  // Helper: setup calendar redirection links
  function setupAddToCalendarButtons(eventDate) {
    const googleLink = document.getElementById('calendar-add-google');
    const appleLink = document.getElementById('calendar-add-apple');

    // Dates formatting for Google (YYYYMMDDTHHMMSSZ)
    const formatGoogleDate = (date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const startDate = new Date(eventDate.getTime());
    const endDate = new Date(eventDate.getTime() + 15 * 60 * 1000); // 15 mins strategy session

    const googleStart = formatGoogleDate(startDate);
    const googleEnd = formatGoogleDate(endDate);

    const title = encodeURIComponent('Website Strategy Session with Delache Designs');
    const details = encodeURIComponent(`Strategy consultation. Check your invite for the Zoom or Google Meet link.\n\nReview your custom strategy overview here: ${window.location.href}`);
    const location = encodeURIComponent('Zoom / Google Meet');

    // Inject Google link
    googleLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${googleStart}/${googleEnd}&details=${details}&location=${location}`;

    // Create Apple Calendar (.ics) download file data URI
    const formatIcsDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Delache Designs//Strategy Session//EN',
      'BEGIN:VEVENT',
      `UID:strategy_session_${Date.now()}@delache.com.au`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      'SUMMARY:Website Strategy Session with Delache Designs',
      `DESCRIPTION:Check your invite for the Zoom or Google Meet link. Review your strategy overview: ${window.location.href}`,
      'LOCATION:Zoom / Google Meet',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    appleLink.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
  }

  // Helper: parses dates from text strings like "Thursday 2pm"
  function parseConsultationTime(timeString) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const now = new Date();
    let targetDay = -1;
    let targetHour = 10; // default 10:00am
    let targetMinute = 0;

    const lowerString = timeString.toLowerCase();

    // 1. Identify weekday
    for (let i = 0; i < days.length; i++) {
      if (lowerString.includes(days[i])) {
        targetDay = i;
        break;
      }
    }

    // 2. Identify time (E.g. 2pm, 10:30am)
    const timeMatch = lowerString.match(/(\d+)(?::(\d+))?\s*(am|pm)?/);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      const ampm = timeMatch[3];

      if (ampm === 'pm' && hours < 12) hours += 12;
      if (ampm === 'am' && hours === 12) hours = 0;

      targetHour = hours;
      targetMinute = minutes;
    }

    const resultDate = new Date();
    resultDate.setHours(targetHour, targetMinute, 0, 0);

    if (targetDay !== -1) {
      const currentDay = now.getDay();
      let daysToAdd = targetDay - currentDay;
      if (daysToAdd <= 0) daysToAdd += 7; // look ahead to next week
      resultDate.setDate(now.getDate() + daysToAdd);
    } else {
      // Fallback tomorrow if day parsing failed
      resultDate.setDate(now.getDate() + 1);
    }

    return resultDate;
  }


  // ─── 3. VIDEO PLAYER IFRAME LOADER ───

  const playBtn = document.getElementById('play-btn');
  const videoPoster = document.getElementById('video-poster');
  const realVideoContainer = document.getElementById('real-video-container');

  if (playBtn && videoPoster && realVideoContainer) {
    playBtn.addEventListener('click', () => {
      // Hide poster overlay
      videoPoster.classList.add('hidden');
      
      // Inject Loom autoplay embed iframe
      realVideoContainer.innerHTML = `<div style="position: relative; padding-bottom: 56.25%; height: 0; width: 100%;"><iframe src="https://www.loom.com/embed/5a637907c15b443cb487632173c790b2?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
      
      // Reveal container
      realVideoContainer.classList.remove('hidden');
    });
  }




  // ─── 7. STRATEGY FORM WEBHOOK AJAX SUBMISSION ───

  const webhookForm = document.getElementById('webhook-submission-form');
  const formInputsView = document.getElementById('form-inputs-view');
  const formSuccessView = document.getElementById('form-success-view');
  const formErrorView = document.getElementById('form-error-view');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const errorMessageText = document.getElementById('error-message-text');

  const editBtn = document.getElementById('form-edit-btn');
  const retryBtn = document.getElementById('form-retry-btn');

  if (webhookForm) {
    webhookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Toggle button loading state
      submitBtn.disabled = true;
      submitBtnText.textContent = 'Submitting Details...';

      const successPlanVal = document.getElementById('successPlan').value;
      const customerAcquisitionVal = document.getElementById('customerAcquisition').value;

      // Payload compilation as requested
      const payload = {
        timestamp: new Date().toISOString(),
        name: nameVal,
        business: businessVal,
        success_goal: successPlanVal,
        customer_source: customerAcquisitionVal
      };

      try {
        // Run fetch request with timeout abort
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors', // Avoids local CORS testing locks
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Success state injection
        setTimeout(() => {
          formInputsView.classList.add('hidden');
          formSuccessView.classList.remove('hidden');
          formErrorView.classList.add('hidden');
          submitBtn.disabled = false;
          submitBtnText.textContent = 'Submit Answers';
        }, 800);

      } catch (err) {
        console.error('Webhook post error:', err);
        // Fallback error UI display
        setTimeout(() => {
          formInputsView.classList.add('hidden');
          formSuccessView.classList.add('hidden');
          formErrorView.classList.remove('hidden');
          errorMessageText.innerHTML = `Couldn't submit — text us on <strong class="text-accent">${CONTACT_PHONE}</strong> or email <strong class="text-accent">${CONTACT_EMAIL}</strong> instead.`;
          submitBtn.disabled = false;
          submitBtnText.textContent = 'Submit Answers';
        }, 800);
      }
    });

    // Edit answers back action
    const resetFormViews = () => {
      formInputsView.classList.remove('hidden');
      formSuccessView.classList.add('hidden');
      formErrorView.classList.add('hidden');
    };

    if (editBtn) editBtn.addEventListener('click', resetFormViews);
    if (retryBtn) retryBtn.addEventListener('click', resetFormViews);
  }

});
