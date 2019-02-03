import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryExit } from './entry-exit.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  constructor(private _fbStore: AngularFirestore, private _auth: AuthService ) { }

  createEntryExit(entryExit: EntryExit): Promise<any>{
    return this._fbStore.doc(`${this._auth.getUser().uid}/entryExit`)
      .collection('items').add({...entryExit})
  }


}
