export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}
