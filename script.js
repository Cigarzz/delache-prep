/* ==========================================================================
   DELACHE PRE-CALL PREP FUNNEL - CLIENT LOGIC & FUNCTIONALITY
   ========================================================================== */

// ─── CONFIGURATION CONSTANTS ───
// Paste your GHL / Zapier webhook endpoint URL here:
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/uNpijTJXkgTHkG4aTsRu/webhook-trigger/c4e561df-119b-4f3e-ba21-70f8980e9fd7';
// Fallback phone and contact details branded for Delache Designs:
const CONTACT_PHONE = '+61 416 831 736';
const CONTACT_EMAIL = 'hello@delache.com.au';

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. VIDEO PLAYER IFRAME LOADER ───

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

  // ─── 2. STRATEGY FORM WEBHOOK AJAX SUBMISSION ───

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

      const contactNameVal = document.getElementById('contactName').value;
      const businessNameVal = document.getElementById('businessName').value;
      const contactEmailVal = document.getElementById('contactEmail').value;
      const contactPhoneVal = document.getElementById('contactPhone').value;
      const successPlanVal = document.getElementById('successPlan').value;
      const customerAcquisitionVal = document.getElementById('customerAcquisition').value;

      // Payload compilation as requested
      const payload = {
        timestamp: new Date().toISOString(),
        name: contactNameVal,
        business: businessNameVal,
        email: contactEmailVal,
        phone: contactPhoneVal,
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
