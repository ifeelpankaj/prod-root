export const generic_msg = {
    email_sending_failed: (email) => `Failed to send email to ${email}. Please try again later.`,
    email_sending_success: (email) => `Email has been sent successfully to ${email}`,
    operation_success: (name) => `${name} Success! Your request was completed without a hitch.`,
    operation_failed: (name) => `${name} Failed! Sorry we are unable to complete your request`,
    resource_not_found: (entity) => `Sorry we are unable to found this ${entity} in our system.Please check and try again.`,
    too_many_attempts: (entity) => `Too many incorrect ${entity} attempts. Please try again after sometime.`,
    invalid_input: (entity) => `${entity} is not valid. kindly check your ${entity} and resubmit.`,
    resource_update_success: (entity) => ` ${entity} updated successfully. You’re all set!`,
    unauthorized_access: `Permission Denied`,
    file_uploading_error: `Cannot able to upload your files`,
    too_manay_request: ` Too many requests in a short time. Please slow down and try again later.`,
    something_went_wrong: `Opps! Something went wrong`,
    //New one
    no_change_found_in_profile: 'Profile Look good as new !',
    profile_update_fails: 'Opps ! failed to update youur profile.',
    logout_failed: 'Unable to logout, An error occured during logout.',
    no_cab_found: `Unable to find any cab for your booking`,
    cab_fetching_fails: 'Sorry we are unable to fetch cab for you',
    no_order_yet: 'Currently you dont have any bookings',
    order_cancelled:
        'Your booking is cancelled sorry for the inconvience by us if you have made payment we will return it to you within 3 to 4 buisness days',
    invalid_document: 'Invalid document format. Only JPEG, PNG, and PDF up to 2 MB allowed.',
    page_not_found: `Oops! The page you're looking for seems to have wandered off into the digital void.`
};
