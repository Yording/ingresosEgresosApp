import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryExit } from './entry-exit.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  constructor(
    private _fbStore: AngularFirestore, 
    private _auth: AuthService,
    private store: Store<AppState>
  ) { }

  initEntryExitListener(){
    this.store.select('auth').pipe(
      filter(auth => auth.user != null),
      map(auth => auth.user)
    )
    .subscribe(
      (user: User) => {
        this.entryExitItems(user.uid)
    })
  }

  private entryExitItems(uid: string){
    this._fbStore.collection(`${uid}/entryExit/items`)
      .valueChanges()
      .subscribe(itemsData => {
        console.log(itemsData)
      })
  }

  createEntryExit(entryExit: EntryExit): Promise<any>{
    return this._fbStore.doc(`${this._auth.getUser().uid}/entryExit`)
      .collection('items').add({...entryExit})
  }


}
