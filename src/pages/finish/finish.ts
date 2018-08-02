import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MeetingProvider } from '../../providers/meeting/meeting';

import { Platform } from 'ionic-angular';


/**
 * Generated class for the FinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {

  public money:any;
  public meetingTime:any;
  public isCountDown:any;
  public meetingCost:any;
  public people = 0;

  public unregisterBackButtonAction: any;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public meetingProvider: MeetingProvider,
    public platform: Platform
  ) {

    for(let member of this.meetingProvider.members) {
      this.people = this.people + parseInt(member.number);
    }


    let aux = this.navParams.get('isCountDown');
    this.money = this.navParams.get('money');
    this.meetingTime = this.navParams.get('meetingTime');
    this.isCountDown = (aux === true);
    this.meetingCost = this.navParams.get('meetingCost'); 

    

  }


  ionViewWillLeave() {

    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

  }


  ionViewDidEnter() {

    this.initializeBackButtonCustomHandler();

  }

  goBackButton() {
    
    
    this.navCtrl.popToRoot();


  }

  initializeBackButtonCustomHandler(): void {
    let _this=this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.goBackButton();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

}
