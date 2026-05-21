export interface Message {
  type: 'message' | 'system';
  id?: string;
  username?: string;
  message?: string;
  timestamp?: string;
  own?: boolean;
  text?: string;
  image?: string;
}