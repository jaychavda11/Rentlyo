export type UserRole = 'renter' | 'supplier' | 'admin';

export type AhmedabadZone = 'Central' | 'West' | 'North' | 'East' | 'South';

export interface AhmedabadArea {
  id: string;
  name: string;
  zone: AhmedabadZone;
  popular?: boolean;
}

export interface CityInfo {
  id: string;
  name: string;
  state: string;
  status: 'active' | 'coming_soon';
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  subcategories: string[];
  bannerImage: string;
  itemCount: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  phone?: string;
  ahmedabadArea: string;
  businessName?: string;
  createdAt: string;
}

export interface EmailNotification {
  id: string;
  toEmail: string;
  toName: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  type: 'booking_request' | 'booking_confirmed' | 'handover_otp' | 'deposit_refund' | 'welcome';
  read: boolean;
  relatedBookingId?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  description: string;
  features: string[];
  specs?: Record<string, string>;
  images: string[];
  hourlyPrice: number;
  dailyPrice: number;
  weeklyPrice?: number;
  securityDeposit: number;
  ahmedabadArea: string;
  ahmedabadZone: AhmedabadZone;
  distanceKm: number; // dynamically computed relative to selected area, base distance stored
  baseDistanceKm: number;
  supplierId: string;
  supplierName: string;
  supplierEmail?: string;
  supplierVerified: boolean;
  supplierType: 'Local Business' | 'Verified Peer Host';
  supplierRating: number;
  supplierReviewCount: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  minRentalHours: number;
  handoverMethod: 'Pickup & Delivery' | 'Self Pickup Only' | 'Delivery Available';
  campaignBadge?: string;
  discountPercent?: number;
  originalDailyPrice?: number;
  status: 'approved' | 'pending_approval' | 'rejected';
  createdAt: string;
}

export interface CampaignOffer {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  discountPercentage: number;
  applicableCategories: string[];
  bannerImage: string;
  status: 'active' | 'upcoming';
  validUntil: string;
  type: 'festival' | 'category' | 'app_launch' | 'product';
  ctaText: string;
  ctaLink: string;
}

export interface RentalRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  categoryId: string;
  categoryName: string;
  ahmedabadArea: string;
  neededDate: string;
  neededTime: string;
  durationText: string;
  budgetInr: number;
  notes: string;
  status: 'open' | 'offers_received' | 'fulfilled' | 'closed';
  offersCount: number;
  createdAt: string;
}

export interface SupplierOffer {
  id: string;
  requestId: string;
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  productName: string;
  offeredPrice: number;
  securityDeposit: number;
  deliveryOption: string;
  notes: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Booking {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  categoryId: string;
  renterId: string;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  supplierId: string;
  supplierName: string;
  supplierEmail?: string;
  ahmedabadArea: string;
  rentalDurationType: 'hourly' | 'daily';
  rentalUnits: number; // e.g. 4 hours or 2 days
  startDate: string;
  startTime: string;
  endDate: string;
  rentalFee: number;
  securityDeposit: number;
  platformFee: number; // 15% commission
  totalPaid: number;
  status: 'pending_supplier' | 'confirmed' | 'active_rental' | 'returned_inspecting' | 'completed' | 'cancelled';
  handoverOtp: string;
  returnOtp: string;
  depositStatus: 'held' | 'refunded' | 'partial_deducted';
  refundAmount?: number;
  damageNotes?: string;
  paymentMethod: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userArea: string;
  rating: number;
  comment: string;
  date: string;
  verifiedRental: boolean;
}

export interface WaitlistEntry {
  id: string;
  type: 'city' | 'mobile_app';
  targetCity?: string;
  name: string;
  email: string;
  phone?: string;
  interestedCategories?: string[];
  createdAt: string;
}

export interface PlatformSettings {
  commissionPercent: number;
  taxPercent: number;
  defaultSecurityDepositRule: string;
  supportPhone: string;
  supportEmail: string;
  primaryLocation: string;
  requireAdminApproval: boolean;
}
