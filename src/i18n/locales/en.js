export default {
  auth: {
    change_password: {
      btn_save: 'Save',
      success: 'Change password successfully! Please login again.',
      placeholder: {
        new_password_confirm: 'New password confirm',
        new_password: 'New password',
        password: 'Password'
      }
    },
    forgot_password: {
      btn_send: 'Send',
      success: 'We have e-mailed your password reset link!',
      placeholder: {
        email: 'Email'
      }
    },
    login: {
      btn_login: 'Login',
      btn_facebook: 'Facebook',
      btn_google: 'Google',
      failed: 'Cannot login into Nice Meal!',
      forgot_password: 'Forgot Password ?',
      order_account: 'or login with your social account',
      placeholder: {
        email: 'Email',
        password: 'Password'
      },
      success: 'Login successfully!'
    },
    register: {
      btn_register: 'Register',
      failed: 'Cannot register!',
      placeholder: {
        date_of_birth: 'Date of birth',
        email: 'Email',
        full_name: 'Full name',
        password: 'Password',
        password_confirm: 'Confirm password',
        phone: 'Phone number',
        male: 'Male',
        female: 'Female'
      },
      success: 'Register successfully!'
    }
  },
  app: {
    welcome: 'Welcome to Nice Meal!',
    network_disconnected: 'Network disconnected, please check again!'
  },
  cart: {
    no_item: 'There are no items in the shopping cart!',
    btn_add: 'Add to Cart',
    btn_order_now: 'Order Now',
    btn_check_voucher: 'Check',
    btn_apply_sync: 'Apply Synchronize',
    validate: {
      voucher: "Input voucher can't be empty!",
      service: 'Please choose service!',
      payment_method: 'Please choose payment method!',
      reach_minimum_order: 'Please add more item to reach the minimum order value!'
    },
    free_item_alert: {
      title: 'Notification',
      content: 'You have not selected free item ?',
      cancel: 'Stay',
      ok: 'Continue'
    },
    placeholder: {
      voucher: 'Enter your voucher here...',
      order_note: 'Order note...'
    },
    promotion: {
      apply_to_bill: 'Your bill reached mount from %{from_value} VND to %{to_value} VND.So you can choice %{quantity} free item.',
      apply_to_order: 'You bought items have promotion "%{item_name}" .So can choice maximum %{quantity} free items'
    },
    title: {
      information: '💰 Information',
      free_item: '🎁 Free Items',
      customization: 'Customization',
      cart_item: '🛒 Cart Items'
    },
    delivery: 'Delivery',
    pickup: 'Pickup',
    cod: 'COD',
    online: 'Online',
    service: 'Service:',
    payment: 'Payment:',
    take_red_invoice: 'Take red invoice:',
    min_order: 'Min order:',
    option: ' 🔸 %{option_name} : %{quantity} x %{price} VND',
    info: {
      sub_total: 'Subtotal:',
      promotion: 'Promotion:',
      delivery_fee: 'Delivery fee:',
      tax: 'Tax %{resource}%:',
      order_total: 'Order total:',
      reach_minimum_order: 'Please add more item to reach the minimum order value!'
    }
  },
  common: {
    currency: '%{resource} VND',
    currency_usd: '%{resource} USD',
    create: {
      success: 'Create successfully!'
    },
    delete: {
      success: 'Delete successfully!',
      title: 'Notification!',
      content: 'You want to delete ?',
      cancel: 'Cancel',
      ok: 'Ok'
    },
    edit: {
      success: 'Edit successfully!'
    },
    exit: {
      title: 'Notification!',
      content: 'You want to exit?',
      cancel: 'Cancel',
      ok: 'Ok'
    },
    validate: {
      email: 'Invalid email!',
      password: 'Password must be 8 characters including letters, numbers, capital letters, special characters!',
      password_confirm: 'The confirm password does not match!',
      empty: "The input field can't be empty!",
      phone: 'Phone numbers must be numbers and have at least 10 characters!',
      option: "The option field can't be empty",
      full_name: "Full name can't be empty!",
      full_address: "Full address can't be empty!",
      payment_amount_invalid: 'Payment Amount Invalid!',
      payment_amount_need_large: 'Payment Amount need large than total value!',
      delivery_time: 'Delivery time must be at least 30 minute!',
      otp: 'Invalid otp code!'
    },
    days: {
      all_time: 'All times',
      all_day: 'All days',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday'
    }
  },
  checkout: {
    btn_checkout: 'Checkout',
    placeholder: {
      title: '--Choose Your Title--',
      residence: '--Select Residence Type--',
      ward: '--Select Ward--',
      payment_amount: '--Choose Payment Amount--',
      delivery_time: '--Select Delivery Time--',
      select_hour: '--Select hour--',
      select_minute: '--Select minute--'
    },
    paypal_note: 'PayPal does not support the currency VND, so in PayPal you will be charged in USD.The exchange rate that will be used from USD to VND is: %{resource} VNĐ.You will be redirected to secure payment (SSL) of PayPal.',
    section: {
      contact_info: {
        title: '🤵 Contact Info:',
        gender: 'Title',
        full_name: 'Fullname',
        email: 'Email',
        phone_number: 'Phone Number',
        password: 'Password'
      },
      delivery_info: {
        title: '🚗 Delivery Info:',
        residence: 'Residence Type',
        full_address: 'Full Address',
        district: 'District',
        ward: 'Ward'
      },
      note_info: {
        title: '📝 Note:',
        direction: 'Direction',
        payment_amount: 'Payment Amount',
        pay_with: 'You Will Pay With:',
        delivery_time: 'Delivery Time'
      },
      restaurant_info: {
        title: '🏪 Pick up info:',
        name: 'Name',
        address: 'Address',
        email: 'Email',
        phone: 'Phone'
      }
    }
  },
  online_payment: {
    btn_go_paypal: 'Payment with PayPal',
    btn_go_nganluong: 'Payment with NganLuong',
    btn_payment: 'Payment',
    btn_cancel: 'Cancel',
    btn_continue: 'Continue shopping',
    status: {
      create_failed: 'Create payment failed!',
      completed: 'Payment completed successfully!',
      not_completed: 'Payment not successful!',
      rejected: 'Payment rejected!'
    },
    order_total: 'Order Total: %{resource}'
  },
  otp: {
    btn_send: 'Send',
    btn_resend: 'Resend OTP',
    btn_close: 'Close',
    btn_continue: 'Continue Shopping',
    status: {
      success: 'Order successfully!'
    },
    otp_expired: 'Your otp has been expired, please resend!',
    contact_phone: 'Please contact this phone number'
  },
  enums: {
    checkout: {
      delivery_time: {
        other: 'Other',
        possible: 'As soon as possible'
      },
      residence_type: {
        building: 'Building',
        compound: 'Compound',
        house: 'House',
        hotel: 'Hotel'
      },
      title: {
        ms: 'Ms. ',
        mr: 'Mr. '
      },
      payment_amount: {
        exact_total_bill: 'Pay exact total bill',
        order: 'Order'
      }
    },
    filter: {
      all: 'All',
      payment_method: {
        cod: 'COD',
        online: 'Online Payment'
      },
      status: {
        high_quality: 'High Quality',
        new: 'New',
        no_status: 'No Status',
        polular: 'Polular',
        promotion: 'Promotion'
      },
      service: {
        delivery: 'Delivery',
        pickup: 'Pickup'
      },
      sort: {
        delivery_fee: 'Delivery fee',
        min_order: 'Min order amount',
        name: 'Name',
        no_sort: 'No Sort',
        ranking: 'Ranking'
      }
    },
    restaurant_status: {
      close: 'Closed',
      open: 'Open Now'
    }
  },
  header: {
    alternative_info: 'Alternative Info',
    alternative_info_create: 'Create Alternative Info',
    alternative_info_edit: 'Edit Alternative Info',
    authenticate: 'Authenticate',
    change_password: 'Change Password',
    forgot_password: 'Forgot Password',
    login: 'Login',
    order_history: 'Order History',
    profile: 'Profile',
    profile_edit: 'Edit Info',
    register: 'Register',
    cart: 'Cart',
    checkout: 'Checkout',
    online_payment: 'Online Payment',
    otp: 'Confirm OTP'
  },
  home: {
    go_to_location: {
      title: 'Notification!',
      content: 'Do you want to re-select the location ?',
      cancel: 'Cancel',
      ok: 'Ok'
    },
    btn_seemore: 'See more',
    btn_refresh: 'Refresh',
    sub_title: '%{resource} restaurants ready to serve you now',
    no_data: "Don't have any restaurant!",
    review: '%{resource} reviews',
    delivery: 'Delivery',
    pickup: 'Pickup',
    cod: 'COD',
    online: 'Online Payment',
    min_order: 'Min: %{resource} VND',
    filter: {
      tab: {
        filter: 'Filters',
        sort: 'Sorting'
      },
      cuisine: 'Cuisine',
      category: 'Category',
      status: 'Status',
      service: 'Service',
      payment: 'Payment',
      sort: 'Sort by'
    }
  },
  detail: {
    tab: {
      menu: 'Menu',
      info: 'Info',
      promotion: 'Promotion'
    },
    intro: {
      delivery_cost: 'Delivery: %{resource} VND',
      price_min: 'Min: %{resource} VND',
      restaurant_address: 'Restaurant address:',
      working_time: 'Working time:',
      payment_method: 'Payment method:',
      delivery: 'Delivery',
      pickup: 'Pickup',
      cod: 'COD',
      online: 'Online Payment',
      available_service: 'Available Services:',
      delivery_content: 'Available locations that can be delivered:',
      location: 'Location',
      minimum: 'Minimum',
      delivery_fee: 'Delivery Fee'
    },
    menu: {
      placeholder: {
        search: 'Search (Search Food Name)'
      },
      no_data: "Don't have any dish!"
    },
    promotion: {
      title: {
        content: '🔸 Content',
        affected_product: '🔸 Affected Products',
        free_item: '🔸 Free Items',
        available_time: '🔸 Available Time'
      },
      discount: 'Discount %{discount_value} VND',
      discount_maximum: 'Discount %{discount_value} maximum %{maximum_value} VND',
      free_item: 'Free items',
      for_order: '%{resource} for order has total amount from %{from_value} VND to %{to_value} VND.',
      for_item: '%{resource} for item value from %{from_value} VND to %{to_value} VND.',
      for_affected_item: '%{resource} when buying affected items.',
      for_category: '%{resource} for item value from %{from_value} VND to %{to_value} VND.',
      no_data: "Don't have any promotion"
    }
  },
  order_history: {
    status: {
      admin_accepted: 'Admin Accepted',
      accepted: 'Accepted',
      canceled: 'Canceled',
      delivered: 'Delivered',
      finished: 'Finished',
      going: 'Going',
      new: 'New',
      received: 'Received',
      rejected: 'Rejected'
    },
    total_amount: 'Total: ',
    date: 'Date',
    code: 'Order Code',
    order_status: 'Status',
    price: 'Price',
    restaurant_name: 'Restaurant Name'
  },
  profile: {
    alternative_info: 'Alternative info #',
    btn_alternative_info: 'Alternative Info',
    btn_change_password: 'Change Password',
    btn_delete: 'Delete',
    btn_edit: 'Edit',
    btn_login_register: 'Login/Register',
    btn_logout: 'Logout',
    btn_order_history: 'Order History',
    btn_save: 'Save',
    logout_alert: {
      title: 'Notification!',
      content: 'You want to logout ?',
      cancel: 'Cancel',
      ok: 'Ok'
    },
    logout_success: 'Goodbye! See you next time.',
    need_login: 'You need to login \n To use this function',
    placeholder: {
      email: 'Email',
      full_name: 'Full name',
      phone: 'Phone number',
      address: 'Address'
    },
    title: {
      info: 'Info',
      full_name: 'Full name',
      email: 'Email',
      date_of_birth: 'Date of birth',
      phone: 'Phone number',
      address: 'Address'
    }
  },
  tab: {
    home: 'Home',
    profile: 'Profile'
  },
  toast: {
    danger: 'Okey',
    default: 'Okey',
    success: 'Okey',
    warning: 'Okey'
  },
  welcome: {
    ads: {
      location: '1.Choose Location',
      order: '2.Order Food',
      delivery: '3.Delivery or take out'
    },
    btn_go: 'Go',
    location_null: 'Please select a location before starting!',
    logo_content: 'ORDER FOOD ONLINE & DELIVERY IN SAIGON',
    placeholder: {
      city: 'Choose city ...',
      district: 'Choose district ...',
      ward: 'Choose ward ...'
    }
  }
};
