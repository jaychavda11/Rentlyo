import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CampaignOffer,
  RentalRequest,
  SupplierOffer,
  Booking,
  UserRole,
  PlatformSettings,
  WaitlistEntry,
  UserAccount,
  EmailNotification,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_REQUESTS,
  INITIAL_SUPPLIER_OFFERS,
  INITIAL_BOOKINGS,
  INITIAL_SETTINGS,
  INITIAL_USERS,
  INITIAL_EMAILS,
} from '../data/mockData';
import { calculateAhmedabadDistance } from '../data/constants';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'offer' | 'payout' | 'system' | 'email';
  targetRole: UserRole;
  read: boolean;
}

interface AppContextType {
  // Navigation / View
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Location UX
  currentCity: string;
  currentArea: string; // e.g. 'Vastrapur' or 'All Ahmedabad'
  setCurrentArea: (area: string) => void;
  openLocationModal: boolean;
  setOpenLocationModal: (open: boolean) => void;

  // Authentication & Users
  currentUser: UserAccount | null;
  users: UserAccount[];
  login: (email: string, password?: string) => { success: boolean; user?: UserAccount; message?: string };
  signup: (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    avatarUrl?: string;
    phone?: string;
    ahmedabadArea: string;
    businessName?: string;
  }) => { success: boolean; user: UserAccount };
  logout: () => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;

  // Email Notifications Inbox
  emails: EmailNotification[];
  openEmailInboxModal: boolean;
  setOpenEmailInboxModal: (open: boolean) => void;
  markEmailRead: (emailId: string) => void;
  sendEmail: (email: Omit<EmailNotification, 'id' | 'date' | 'read'>) => void;
  latestEmailAlert: EmailNotification | null;
  dismissEmailAlert: () => void;

  // Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Products
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'baseDistanceKm'>) => void;
  updateProductStatus: (productId: string, status: 'approved' | 'rejected') => void;

  // Selected Product Detail Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Rental Requests
  rentalRequests: RentalRequest[];
  postRentalRequest: (requestData: Omit<RentalRequest, 'id' | 'userId' | 'userAvatar' | 'offersCount' | 'status' | 'createdAt'>) => void;
  supplierOffers: SupplierOffer[];
  submitSupplierOffer: (offerData: Omit<SupplierOffer, 'id' | 'status' | 'createdAt'>) => void;
  acceptSupplierOffer: (offerId: string) => void;

  // Bookings
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'handoverOtp' | 'returnOtp' | 'depositStatus'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status'], otp?: string) => { success: boolean; message: string };
  completeReturnAndRefund: (bookingId: string, deductionAmount?: number, damageNotes?: string) => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;

  // Offers & Campaigns
  offers: CampaignOffer[];
  createOffer: (offer: CampaignOffer) => void;
  toggleOfferStatus: (offerId: string) => void;

  // Waitlist
  waitlistEntries: WaitlistEntry[];
  joinWaitlist: (entry: Omit<WaitlistEntry, 'id' | 'createdAt'>) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Settings
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;

  // Helpers
  getProductDistance: (productArea: string) => number;
  openBookingModal: boolean;
  setOpenBookingModal: (open: boolean) => void;
  bookingTargetProduct: Product | null;
  setBookingTargetProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Location State: Default is Vastrapur, Ahmedabad
  const [currentCity] = useState<string>('Ahmedabad');
  const [currentArea, setCurrentAreaState] = useState<string>('Vastrapur');
  const [openLocationModal, setOpenLocationModal] = useState<boolean>(false);

  // Authentication & Users State
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('rentlyo_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('rentlyo_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Jay Chavda (Supplier)
  });

  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Role State (synced with current user)
  const [currentRole, setCurrentRole] = useState<UserRole>(currentUser ? currentUser.role : 'renter');

  // Email Notification Inbox State
  const [emails, setEmails] = useState<EmailNotification[]>(() => {
    const saved = localStorage.getItem('rentlyo_emails');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [openEmailInboxModal, setOpenEmailInboxModal] = useState<boolean>(false);
  const [latestEmailAlert, setLatestEmailAlert] = useState<EmailNotification | null>(null);

  // Database States with localStorage sync
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rentlyo_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>(() => {
    const saved = localStorage.getItem('rentlyo_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [supplierOffers, setSupplierOffers] = useState<SupplierOffer[]>(() => {
    const saved = localStorage.getItem('rentlyo_supplier_offers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIER_OFFERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('rentlyo_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [offers, setOffers] = useState<CampaignOffer[]>(() => {
    const saved = localStorage.getItem('rentlyo_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('rentlyo_wishlist');
    return saved ? JSON.parse(saved) : ['prod-canon-1500d', 'prod-jbl-party-speaker'];
  });

  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>(() => {
    const saved = localStorage.getItem('rentlyo_waitlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('rentlyo_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Booking Confirmed in Vastrapur',
      message: 'Your JBL PartyBox 310 rental is confirmed. Supplier EventBox Ahmedabad is preparing handover.',
      time: '15 mins ago',
      type: 'booking',
      targetRole: 'renter',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'New Nearby Rental Request',
      message: 'Rohit in Navrangpura is looking for a projector for 10 Oct (Budget ₹800). Send an offer now.',
      time: '1 hour ago',
      type: 'offer',
      targetRole: 'supplier',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Navratri Rental Campaign Live',
      message: 'Special 20% discount applied to party speakers and cameras across Ahmedabad.',
      time: '4 hours ago',
      type: 'system',
      targetRole: 'renter',
      read: false,
    },
    {
      id: 'notif-4',
      title: 'Payout Ready for Disbursement',
      message: '₹4,200 pending payout for returned rentals ready for transfer.',
      time: '1 day ago',
      type: 'payout',
      targetRole: 'supplier',
      read: true,
    },
  ]);

  // Modal Dialogs
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [bookingTargetProduct, setBookingTargetProduct] = useState<Product | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rentlyo_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rentlyo_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rentlyo_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rentlyo_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('rentlyo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rentlyo_requests', JSON.stringify(rentalRequests));
  }, [rentalRequests]);

  useEffect(() => {
    localStorage.setItem('rentlyo_supplier_offers', JSON.stringify(supplierOffers));
  }, [supplierOffers]);

  useEffect(() => {
    localStorage.setItem('rentlyo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('rentlyo_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('rentlyo_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('rentlyo_waitlist', JSON.stringify(waitlistEntries));
  }, [waitlistEntries]);

  // Dynamic Distance helper
  const getProductDistance = (productArea: string): number => {
    return calculateAhmedabadDistance(currentArea, productArea);
  };

  const setCurrentArea = (area: string) => {
    setCurrentAreaState(area);
  };

  // Auth Methods
  const login = (email: string, _password?: string) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      setCurrentRole(existing.role);
      setCurrentAreaState(existing.ahmedabadArea);
      // Automatically route according to role!
      if (existing.role === 'supplier') {
        setActiveView('supplier-dashboard');
      } else {
        setActiveView('renter-dashboard');
      }
      return { success: true, user: existing };
    }

    // Auto-create test account if not found so login is effortless
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: 'supplier',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '9824884860',
      ahmedabadArea: currentArea === 'All Ahmedabad' ? 'Vastrapur' : currentArea,
      businessName: `${email.split('@')[0]} Rentals Ahmedabad`,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole(newUser.role);
    setActiveView('supplier-dashboard');
    return { success: true, user: newUser };
  };

  const signup = (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    avatarUrl?: string;
    phone?: string;
    ahmedabadArea: string;
    businessName?: string;
  }) => {
    const existing = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    const userToSet: UserAccount = existing
      ? { ...existing, ...data }
      : {
          id: `user-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          avatarUrl:
            data.avatarUrl ||
            (data.role === 'supplier'
              ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
          phone: data.phone || '9824884860',
          ahmedabadArea: data.ahmedabadArea || 'Vastrapur',
          businessName: data.businessName || (data.role === 'supplier' ? `${data.name} Rentals Ahmedabad` : undefined),
          createdAt: new Date().toISOString(),
        };

    if (!existing) {
      setUsers((prev) => [userToSet, ...prev]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === userToSet.id ? userToSet : u)));
    }

    setCurrentUser(userToSet);
    setCurrentRole(userToSet.role);
    setCurrentAreaState(userToSet.ahmedabadArea);

    // Send Welcome Email
    sendEmail({
      toEmail: userToSet.email,
      toName: userToSet.name,
      subject: `Welcome to Rentlyo Ahmedabad as a ${userToSet.role === 'supplier' ? 'Verified Supplier' : 'Renter'}!`,
      preview: `Your ${userToSet.role} account is now active in ${userToSet.ahmedabadArea}, Ahmedabad.`,
      content: `Hi ${userToSet.name},\n\nWelcome to Rentlyo! You are registered as a ${userToSet.role.toUpperCase()} in ${userToSet.ahmedabadArea}, Ahmedabad.\n\n${
        userToSet.role === 'supplier'
          ? 'You can now list your electronics, cameras, tools, or event sound equipment for rent. Whenever a renter books your item, you will instantly receive an email notification and dashboard alert with all booking details.'
          : 'You can now browse and rent useful items from verified nearby suppliers in your neighborhood without buying expensive products for temporary occasions.'
      }\n\nSupport & Inquiries: +91 9824884860 | jay.bizconnect@gmail.com\n\nBest regards,\nThe Rentlyo Team`,
      type: 'welcome',
    });

    // Auto navigate according to chosen role
    if (userToSet.role === 'supplier') {
      setActiveView('supplier-dashboard');
    } else {
      setActiveView('renter-dashboard');
    }

    return { success: true, user: userToSet };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('renter');
    setActiveView('home');
  };

  // Email Notification Sending
  const sendEmail = (emailData: Omit<EmailNotification, 'id' | 'date' | 'read'>) => {
    const newEmail: EmailNotification = {
      ...emailData,
      id: `email-${Date.now()}`,
      date: 'Just now',
      read: false,
    };
    setEmails((prev) => [newEmail, ...prev]);
    setLatestEmailAlert(newEmail);
  };

  const markEmailRead = (emailId: string) => {
    setEmails((prev) => prev.map((e) => (e.id === emailId ? { ...e, read: true } : e)));
  };

  const dismissEmailAlert = () => {
    setLatestEmailAlert(null);
  };

  // Wishlist handler
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add Product (Supplier)
  const addProduct = (
    productData: Omit<Product, 'id' | 'createdAt' | 'status' | 'distanceKm' | 'baseDistanceKm'>
  ) => {
    const id = `prod-user-${Date.now()}`;
    const newProd: Product = {
      ...productData,
      id,
      supplierId: currentUser?.id || productData.supplierId || 'sup-custom',
      supplierName: currentUser?.businessName || currentUser?.name || productData.supplierName || 'My Ahmedabad Store',
      supplierEmail: currentUser?.email || productData.supplierEmail || 'jay.bizconnect@gmail.com',
      distanceKm: calculateAhmedabadDistance(currentArea, productData.ahmedabadArea),
      baseDistanceKm: 2.0,
      status: 'approved', // Live directly for smooth demo flow
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProd, ...prev]);

    // Add in-app notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Product Listed Successfully',
        message: `${newProd.title} is now live and discoverable for renters across ${newProd.ahmedabadArea} and Ahmedabad.`,
        time: 'Just now',
        type: 'system',
        targetRole: 'supplier',
        read: false,
      },
      ...prev,
    ]);

    // Confirmation email to supplier
    if (newProd.supplierEmail) {
      sendEmail({
        toEmail: newProd.supplierEmail,
        toName: newProd.supplierName,
        subject: `Your rental listing "${newProd.title}" is now LIVE in Ahmedabad`,
        preview: `Your item is active with daily rate ₹${newProd.dailyPrice} and deposit ₹${newProd.securityDeposit}.`,
        content: `Hi ${newProd.supplierName},\n\nYour item "${newProd.title}" is now published and active on the Rentlyo marketplace in ${newProd.ahmedabadArea}, Ahmedabad.\n\n• Daily Rental Rate: ₹${newProd.dailyPrice}/day\n• Hourly Rate: ₹${newProd.hourlyPrice}/hr\n• Refundable Security Deposit: ₹${newProd.securityDeposit}\n• Handover Method: ${newProd.handoverMethod}\n\nWhen a renter books this item, you will instantly receive an email notification and booking request on your Supplier Dashboard.\n\nBest regards,\nRentlyo Ahmedabad`,
        type: 'welcome',
      });
    }
  };

  // Update Product status (Admin)
  const updateProductStatus = (productId: string, status: 'approved' | 'rejected') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status } : p))
    );
  };

  // Post Rental Request (Renter)
  const postRentalRequest = (
    requestData: Omit<RentalRequest, 'id' | 'userId' | 'userAvatar' | 'offersCount' | 'status' | 'createdAt'>
  ) => {
    const newReq: RentalRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      userId: currentUser?.id || 'user-renter-demo',
      userName: currentUser?.name || requestData.userName || 'Rohan Mehra',
      userAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      status: 'open',
      offersCount: 0,
      createdAt: new Date().toISOString(),
    };
    setRentalRequests((prev) => [newReq, ...prev]);

    // Supplier alert
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Rental Request in ' + newReq.ahmedabadArea,
        message: `A renter requested "${newReq.title}" with budget ₹${newReq.budgetInr}.`,
        time: 'Just now',
        type: 'offer',
        targetRole: 'supplier',
        read: false,
      },
      ...prev,
    ]);
  };

  // Submit Supplier Offer (Supplier)
  const submitSupplierOffer = (offerData: Omit<SupplierOffer, 'id' | 'status' | 'createdAt'>) => {
    const newOffer: SupplierOffer = {
      ...offerData,
      id: `off-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setSupplierOffers((prev) => [newOffer, ...prev]);

    // Increment count on request
    setRentalRequests((prev) =>
      prev.map((r) =>
        r.id === offerData.requestId
          ? { ...r, offersCount: r.offersCount + 1, status: 'offers_received' }
          : r
      )
    );

    // Notify Renter
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Offer Received!',
        message: `${offerData.supplierName} submitted an offer of ₹${offerData.offeredPrice} for your request.`,
        time: 'Just now',
        type: 'offer',
        targetRole: 'renter',
        read: false,
      },
      ...prev,
    ]);
  };

  // Accept Supplier Offer (Renter)
  const acceptSupplierOffer = (offerId: string) => {
    setSupplierOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'accepted' } : o))
    );
    const targetOffer = supplierOffers.find((o) => o.id === offerId);
    if (targetOffer) {
      setRentalRequests((prev) =>
        prev.map((r) => (r.id === targetOffer.requestId ? { ...r, status: 'fulfilled' } : r))
      );
    }
  };

  // Create Booking (When a renter books an item)
  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'handoverOtp' | 'returnOtp' | 'depositStatus'>
  ): Booking => {
    // Determine target supplier email
    const matchedProduct = products.find((p) => p.id === bookingData.productId);
    const targetSupplierEmail =
      bookingData.supplierEmail ||
      matchedProduct?.supplierEmail ||
      (bookingData.supplierId === currentUser?.id ? currentUser?.email : null) ||
      'jay.bizconnect@gmail.com';

    const newBooking: Booking = {
      ...bookingData,
      supplierEmail: targetSupplierEmail,
      id: `bkg-${Date.now().toString().slice(-5)}`,
      status: 'confirmed',
      handoverOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      returnOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      depositStatus: 'held',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // 1) SEND REALISTIC EMAIL NOTIFICATION TO THE SUPPLIER'S EMAIL!
    sendEmail({
      toEmail: targetSupplierEmail,
      toName: newBooking.supplierName,
      subject: `🔔 New Rental Request: "${newBooking.productTitle}" booked by ${newBooking.renterName}!`,
      preview: `${newBooking.renterName} (${newBooking.renterEmail}) has booked your item for ₹${newBooking.rentalFee} in ${newBooking.ahmedabadArea}, Ahmedabad.`,
      content: `Hi ${newBooking.supplierName},\n\nYou have received a new verified rental booking!\n\n📋 BOOKING DETAILS:\n• Item: ${newBooking.productTitle}\n• Renter: ${newBooking.renterName}\n• Renter Contact: ${newBooking.renterPhone} | ${newBooking.renterEmail}\n• Rental Duration: ${newBooking.rentalUnits} ${newBooking.rentalDurationType === 'hourly' ? 'hours' : 'days'}\n• Dates: ${newBooking.startDate} (${newBooking.startTime}) to ${newBooking.endDate}\n• Handover Location: ${newBooking.ahmedabadArea}, Ahmedabad\n\n💰 PAYMENT & ESCROW:\n• Rental Fee: ₹${newBooking.rentalFee} (Secured)\n• Security Deposit: ₹${newBooking.securityDeposit} (Held safely in Escrow)\n• Total Paid by Renter: ₹${newBooking.totalPaid}\n\n🔐 HANDOVER SECURITY:\nAt physical handover, ask the renter for their 4-digit Handover OTP: ${newBooking.handoverOtp}. Verify this in your Supplier Dashboard to activate the rental.\n\nBest regards,\nThe Rentlyo Ahmedabad Marketplace Team`,
      type: 'booking_request',
      relatedBookingId: newBooking.id,
    });

    // 2) SEND CONFIRMATION EMAIL TO RENTER
    sendEmail({
      toEmail: newBooking.renterEmail,
      toName: newBooking.renterName,
      subject: `Booking Confirmed: "${newBooking.productTitle}" in ${newBooking.ahmedabadArea}`,
      preview: `Your Handover OTP is ${newBooking.handoverOtp}. Supplier ${newBooking.supplierName} has been notified.`,
      content: `Hi ${newBooking.renterName},\n\nYour rental reservation is confirmed!\n\n• Item: ${newBooking.productTitle}\n• Supplier: ${newBooking.supplierName} (${targetSupplierEmail})\n• Handover Locality: ${newBooking.ahmedabadArea}, Ahmedabad\n• Total Paid: ₹${newBooking.totalPaid} (Includes ₹${newBooking.securityDeposit} refundable deposit)\n\n🔑 YOUR HANDOVER OTP: ${newBooking.handoverOtp}\nShare this 4-digit OTP with the supplier when you pick up or receive the item.\n\nReturn OTP: ${newBooking.returnOtp}\n\nHave a great rental experience!\nRentlyo Ahmedabad`,
      type: 'booking_confirmed',
      relatedBookingId: newBooking.id,
    });

    // 3) In-App Notifications for both parties
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}-1`,
        title: 'Booking Confirmed!',
        message: `Your rental for "${newBooking.productTitle}" is confirmed. Handover OTP: ${newBooking.handoverOtp}.`,
        time: 'Just now',
        type: 'booking',
        targetRole: 'renter',
        read: false,
      },
      {
        id: `notif-${Date.now()}-2`,
        title: `New Rental Request from ${newBooking.renterName}!`,
        message: `Email alert sent to ${targetSupplierEmail}. Item: "${newBooking.productTitle}". Rental Fee: ₹${newBooking.rentalFee}.`,
        time: 'Just now',
        type: 'email',
        targetRole: 'supplier',
        read: false,
      },
      ...prev,
    ]);

    return newBooking;
  };

  // Update Booking Status with OTP verification
  const updateBookingStatus = (
    bookingId: string,
    nextStatus: Booking['status'],
    otp?: string
  ): { success: boolean; message: string } => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found' };

    if (nextStatus === 'active_rental') {
      if (otp && otp !== booking.handoverOtp) {
        return { success: false, message: 'Invalid Handover OTP. Please ask the renter.' };
      }
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: nextStatus } : b))
    );

    return { success: true, message: `Status updated to ${nextStatus}` };
  };

  // Return & Deposit Refund
  const completeReturnAndRefund = (
    bookingId: string,
    deductionAmount: number = 0,
    damageNotes?: string
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const refund = Math.max(0, b.securityDeposit - deductionAmount);
        return {
          ...b,
          status: 'completed',
          depositStatus: deductionAmount > 0 ? 'partial_deducted' : 'refunded',
          refundAmount: refund,
          damageNotes,
        };
      })
    );

    const b = bookings.find((item) => item.id === bookingId);
    const refundAmt = b ? Math.max(0, b.securityDeposit - deductionAmount) : 0;

    // Send refund email to renter
    if (b) {
      sendEmail({
        toEmail: b.renterEmail,
        toName: b.renterName,
        subject: `Security Deposit Refunded: ₹${refundAmt} for "${b.productTitle}"`,
        preview: `Item return inspection complete. ₹${refundAmt} has been released back to your account.`,
        content: `Hi ${b.renterName},\n\nThe supplier ${b.supplierName} has verified and accepted the return of "${b.productTitle}".\n\n• Refundable Security Deposit: ₹${b.securityDeposit}\n• Deductions: ₹${deductionAmount}${damageNotes ? ` (${damageNotes})` : ''}\n• Net Refund Amount: ₹${refundAmt}\n\nThe funds have been transferred back to your original payment method.\n\nThank you for choosing Rentlyo Ahmedabad!`,
        type: 'deposit_refund',
        relatedBookingId: b.id,
      });
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Security Deposit Refunded',
        message: `₹${refundAmt} refunded to ${b?.renterName || 'renter'} after item inspection.`,
        time: 'Just now',
        type: 'booking',
        targetRole: 'renter',
        read: false,
      },
      ...prev,
    ]);
  };

  // Offer Admin
  const createOffer = (offer: CampaignOffer) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const toggleOfferStatus = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId ? { ...o, status: o.status === 'active' ? 'upcoming' : 'active' } : o
      )
    );
  };

  // Waitlist
  const joinWaitlist = (entry: Omit<WaitlistEntry, 'id' | 'createdAt'>) => {
    const newEntry: WaitlistEntry = {
      ...entry,
      id: `wl-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setWaitlistEntries((prev) => [newEntry, ...prev]);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Settings
  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        currentCity,
        currentArea,
        setCurrentArea,
        openLocationModal,
        setOpenLocationModal,
        currentUser,
        users,
        login,
        signup,
        logout,
        openAuthModal,
        setOpenAuthModal,
        authModalMode,
        setAuthModalMode,
        emails,
        openEmailInboxModal,
        setOpenEmailInboxModal,
        markEmailRead,
        sendEmail,
        latestEmailAlert,
        dismissEmailAlert,
        currentRole,
        setCurrentRole,
        products,
        addProduct,
        updateProductStatus,
        selectedProduct,
        setSelectedProduct,
        rentalRequests,
        postRentalRequest,
        supplierOffers,
        submitSupplierOffer,
        acceptSupplierOffer,
        bookings,
        createBooking,
        updateBookingStatus,
        completeReturnAndRefund,
        wishlistIds,
        toggleWishlist,
        offers,
        createOffer,
        toggleOfferStatus,
        waitlistEntries,
        joinWaitlist,
        notifications,
        markNotificationRead,
        clearNotifications,
        settings,
        updateSettings,
        getProductDistance,
        openBookingModal,
        setOpenBookingModal,
        bookingTargetProduct,
        setBookingTargetProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

