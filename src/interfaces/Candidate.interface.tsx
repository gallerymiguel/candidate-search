// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    name: string;       
    login: string;             
    location: string | null;   
    avatar_url: string;        
    email: string | null;     
    html_url: string;          
    bio: string | null;
    company: string | null;   
    followers: number;
    following: number;
  }
