export type UserInfoType = {
  pk: string;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  is_verified: boolean;
  media_count: number;
  follower_count: number;
  following_count: number;
  biography: string;
  external_url: string | null;
  account_type: number | null;
  is_business: boolean;
  public_email: string | null;
  contact_phone_number: string | null;
  public_phone_country_code: string | null;
  public_phone_number: string | null;
  business_contact_method: string;
  business_category_name: string | null;
  category_name: string | null;
  category: string | null;
  address_street: string | null;
  city_id: string | null;
  city_name: string | null;
  latitude: number | null;
  longitude: number | null;
  zip: string | null;
  instagram_location_id: string | null;
  interop_messaging_user_fbid: string | null;
};
