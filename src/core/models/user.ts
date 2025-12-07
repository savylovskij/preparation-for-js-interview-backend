export interface FirebaseUser {
  firebaseId: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  email: string | null;
  provider: string | null;
}
