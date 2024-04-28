type UserStateType = {
  title?: any | null
  name?: string | null
  email?: string | null
  username?: string | null
  phone_number?: any | null
  image?: string | null
  country?: any | null
  state?: any | null
  city?: any | null
}

type APIResponseType<T> = {
  message: string
  data: Array<T>
  path: string
  per_page: number
  next_cursor: string
  next_page_url?: string
  prev_cursor?: string
  prev_page_url?: string
}

type UserApiType = {
  id?: number | null
  title?: any | null
  name?: string | null
  email?: string | null
  username?: string | null
  phone_number?: any | null
  image?: string | null
  country?: any | null
  state?: any | null
  city?: any | null
  is_active?: boolean | null
  is_banned?: boolean | null
  otp?: number | null
  otp_expires_at?: string | null
  email_verified_at?: any | null
  last_login_at?: any | null
  current_login_at?: any | null
  last_login_ip?: any | null
  current_login_ip?: any | null
  login_count?: number | null
  created_at?: string | null
  updated_at?: string | null
  deleted_at?: any | null
}

type TitleApiType = {
  id: number
  name: string
  created_at?: string | null
  updated_at?: string | null
  deleted_at?: any | null
}

type CountryApiType = {
  id: number
  name: string
  iso3: string
  iso2: string
  phonecode: string
  capital: string
  currency: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  timezones: string
  translations: string
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
  flag: number
  wikiDataId: string
  created_at: string
  updated_at: string
  deleted_at: string
}

type StateApiType = {
  id: number
  country_id: number
  name: string
  country_code: string
  fips_code: string
  iso2: string
  latitude: string
  longitude: string
  flag: number
  wikiDataId: string
  created_at: string
  updated_at: string
  deleted_at: string
}

type CityApiType = {
  id: number
  country_id: number
  state_id: number
  name: string
  state_code: string
  country_code: string
  latitude: string
  longitude: string
  flag: number
  wikiDataId: string
  created_at: string
  updated_at: string
  deleted_at: string
}
