export const en = {
  admin: {
    dashboard_home: {
      booking_system: "BOOKING SYSTEM",
      current_status: "Current Status",
      status_open: "OPEN",
      status_closed: "CLOSED",
      open_close_booking: "Open/Close Booking",
      create_new_booking: "Create New Booking",
      broadcast_news: "Broadcast News",
      export_data: "Export Data",
      total_customers: "TOTAL CUSTOMERS",
      total_bookings: "TOTAL BOOKINGS",
      remaining_capacity: "REMAINING CAPACITY",
      booked_label: "BOOKED",
      total_label: "TOTAL",
      peak_engagement: "Peak Engagement Period",
      peak_engagement_desc: "Capacity utilization is at its highest during Saturday morning sessions. Consider opening additional time slots.",
      trending_up: "TRENDING UP ↑",
      recent_bookings: "Recent Bookings",
      view_all: "VIEW ALL",
      table_customer: "Customer",
      table_service: "Service",
      table_date: "Date",
      table_status: "Status",
      nav_dashboard: "Dashboard",
      nav_bookings: "Bookings",
      nav_customers: "Customers",
      nav_settings: "Settings"
    },
    add_new_customer: {
      back_to_customers: "Back to Customers",
      add_new_member: "Add New Member",
      subtitle: "Invite a new individual to the Sacred Spaces community. Please ensure the phone number is accurate to facilitate seamless communication.",
      full_name_label: "Full Name",
      full_name_placeholder: "Enter first and last name",
      phone_number_label: "Phone Number",
      phone_number_placeholder: "98765 43210",
      info_text: "Adding a member allows them to receive booking confirmations and spiritual session reminders directly via SMS and WhatsApp.",
      add_customer_button: "Add Customer",
      cancel_button: "Cancel",
      adding: "Adding...",
      success_message: "Member Added!",
      error_name: "Name is required",
      error_phone: "Please enter a valid 10-digit phone number"
    },
    manage_sessions: {
      title: "Manage Sessions",
      subtitle: "Oversee and organize the spiritual calendar.",
      create_button: "CREATE NEW SESSION",
      filter_all: "ALL SESSIONS",
      filter_active: "ACTIVE",
      filter_drafts: "DRAFTS",
      filter_past: "PAST",
      published_by: "PUBLISHED BY",
      schedule_title: "Schedule Future Event",
      schedule_desc: "Add a new recurring or one-time session to the calendar."
    }
  },
  user: {
    home_booking_status: {
      welcome: "Welcome, Brother",
      subtitle: "Find your next moment of spiritual connection and community gathering below.",
      available_sessions: "Available Sessions",
      booking_open: "Booking Open",
      coming_up: "Coming Up This Sunday",
      slots_left: "{{count}} Slots Left",
      reserve_seat: "Reserve Your Seat",
      view_all: "View All Sessions",
      no_active_bookings: "No Active Bookings",
      empty_desc: "All current sessions are fully booked or completed. Check back later for upcoming sessions.",
      notify_me: "Notify Me of New Slots"
    },
    login: {
      welcome_back: "Welcome back",
      phone_subtitle: "Please enter your registered phone number to continue your journey.",
      phone_label: "Phone Number",
      phone_placeholder: "555 0123",
      restriction_info: "Access is limited to numbers pre-registered by the community administrators.",
      login_button: "Login",
      need_help: "Need help accessing your account?",
      error_phone: "Please enter a valid 10-digit phone number",
      sending_otp: "Sending OTP..."
    },
    otp_verification: {
      title: "Verify Code",
      subtitle: "We've sent a 6-digit verification code to {{phone}}.",
      code_label: "Verification Code",
      verify_button: "Verify & Continue",
      resend_text: "Resend Code",
      resend_timer: "Resend Code in {{seconds}}s",
      verifying: "Verifying...",
      error_otp: "OTP must be 6 digits"
    }
  }
};

export const hi: typeof en = { ...en };
