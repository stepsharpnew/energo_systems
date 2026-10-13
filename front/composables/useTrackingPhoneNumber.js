import { DEFAULT_PHONE_NUMBER } from '~/utils/callTracking'

export const useTrackingPhoneNumber = () => useState('1ats-phone-number', () => DEFAULT_PHONE_NUMBER)
