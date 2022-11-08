import { Token } from 'src/app/interfaces';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class StorageServiceService {
  
  constructor() { }

  setToken(token : string): StorageServiceService{
    localStorage.setItem(TOKEN_KEY, token);
    return this;
  }

  getToken(): string | null{ 
    const token =localStorage.getItem(TOKEN_KEY);
    if(token){
      return token;
    }
    return null;
  }
  clearToken(): StorageServiceService{
    if(this.getToken()){
      localStorage.removeItem(TOKEN_KEY);
    }
    return this;
  }

  getDecodedToken():Token |null{
      const token = localStorage.getItem(TOKEN_KEY);
      if(token){
        try {
          return jwtDecode<Token>(token);
        } catch (error) {
          console.log("something went wrong while decoding token ");
        }
      }
      return null;
  }

  
  getUserId():string |null{
    const token= this.getDecodedToken();
    if(token && token.userId){
      return token.userId
    }
    return null;
  } 

  getUserEmail(): string | null{
    const token = this.getDecodedToken();
    if(token && token.email){      
      return token.email;
    }
    return null;
  }

  getUserName(): string | null{
    const token = this.getDecodedToken();
    if(token && token.name){
      return token.name;
    }
    return null;
  }
}
