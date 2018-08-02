import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MeetingProvider } from '../../providers/meeting/meeting';

import { ModalMemberPage } from '../../pages/modal-member/modal-member';
import { ItemSliding } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { TimerPage } from '../../pages/timer/timer';
import { Platform } from 'ionic-angular';



/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public meetingProvider: MeetingProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public platform: Platform

  ) {



  }

  ionViewDidEnter() {

    //this.initializeBackButtonCustomHandler();

  }

  openModal(num) {
    var data = { data: num };
    /*var modalPage = this.modalCtrl.create(ModalMemberPage, data);
    modalPage.present();*/
    this.navCtrl.push(ModalMemberPage, data);
  }



  removeMember(memberIndex, slidingItem: ItemSliding) {

    this.meetingProvider.removeMember(memberIndex);
    slidingItem.close();
  }

  editMember(memberIndex, slidingItem: ItemSliding) {
    console.log(slidingItem);
    slidingItem.close();
    this.openModal(memberIndex);

  }

  reorderItems(indexes) {
    let element = this.meetingProvider.members[indexes.from];
    this.meetingProvider.members.splice(indexes.from, 1);
    this.meetingProvider.members.splice(indexes.to, 0, element);
  }

  saveMeeting() {

    let alert = this.alertCtrl.create({
      title: 'Save current meeting',
      message: 'Do you want to save the current meeting with its profiles? Give it a name:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.meetingProvider.saveMeeting(data.title);
          }
        }
      ]
    });

    alert.present();


  }

  gotoTimer() {
    this.navCtrl.push(TimerPage);
  }

  gotoCountdown() {

    let alert = this.alertCtrl.create({
      title: 'How much money?',
      message: 'What is the amount of money for this meeting?',
      inputs: [
        {
          name: 'money',
          placeholder: 'Money',
          type: "number"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Launch',
          handler: data => {
            console.log('Countdown clicked');
            console.log(data);

            if (data.money > 0) {
              this.navCtrl.push(TimerPage, data);
            }
            else {
              this.navCtrl.push(TimerPage);
            }

          }
        }
      ]
    });

    alert.present();

  }

  public textCostScheme(costScheme):string {

    let text = "";

    switch (costScheme) {
      case "h": {
        text = "€/hour";
        break;
      }
      case "d": {
        text = "€/day";
        break;
      }
      case "m": {
        text = "€/month";
        break;
      }
      case "y": {
        text = "€/year";
        break;
      }
      default: {
        text = "???";
        break;
      }
    }

    return text;

  }

}
