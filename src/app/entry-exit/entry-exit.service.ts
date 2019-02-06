import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryExit } from './entry-exit.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { User } from '../auth/user.model';
import * as fromEntryExitActions from './entry-exit.actions'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryExitService {

  private _subListener: Subscription = new Subscription()
  private _subListenerItems: Subscription = new Subscription()

  constructor(
    private _fbStore: AngularFirestore, 
    private _auth: AuthService,
    private store: Store<AppState>
  ) { }

  initEntryExitListener(){
    this._subListener =  this.store.select('auth').pipe(
      filter(auth => auth.user != null),
      map(auth => auth.user)
    )
    .subscribe(
      (user: User) => {
        this.entryExitItems(user.uid)
    })
  }

  private entryExitItems(uid: string){
    this._subListenerItems = this._fbStore.collection(`${uid}/entryExit/items`)
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(
            doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              }
          })
        })
      )
      .subscribe((itemsData: any[]) => {
        this.store.dispatch(new fromEntryExitActions.SetItemsAction(itemsData))
      })
  }

  createEntryExit(entryExit: EntryExit): Promise<any>{
    return this._fbStore.doc(`${this._auth.getUser().uid}/entryExit`)
      .collection('items').add({...entryExit})
  }

  deleteEntryExit(uid: string): Promise<any>{
    return this._fbStore.doc(`${this._auth.getUser().uid}/entryExit/items/${uid}`)
      .delete()
  }

  removeSubs(){
    this._subListener.unsubscribe()
    this._subListenerItems.unsubscribe()
  }


}
