import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MeetingProvider } from '../../providers/meeting/meeting';
import { ItemSliding } from 'ionic-angular';

import { MembersPage } from '../members/members';

import { Platform } from 'ionic-angular';


/**
 * Generated class for the LoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public meetingProvider: MeetingProvider,
    public platform: Platform

  ) {

    platform.registerBackButtonAction(() => {
      console.log("backPressed");
      this.navCtrl.pop();
    },1);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadPage');
  }

  reorderItems(indexes) {
    let element = this.meetingProvider.meetings[indexes.from];
    this.meetingProvider.meetings.splice(indexes.from, 1);
    this.meetingProvider.meetings.splice(indexes.to, 0, element);
  }

  removeMeeting(meetingIndex, slidingItem: ItemSliding) {
    
    this.meetingProvider.removeMeeting(meetingIndex);
    slidingItem.close();
  }

  loadMeeting(meetingIndex) {

    this.meetingProvider.loadMeeting(meetingIndex);
    this.navCtrl.push(MembersPage);

  }


}
