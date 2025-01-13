type UserLink = {
  url: string;
  link_name: string;
};

export type User = {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
  bio: string;
  image_url: string;
  links: UserLink[];
  email_verified: boolean;
};
