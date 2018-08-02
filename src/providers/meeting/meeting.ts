import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { AlertController, ModalController, ToastController } from 'ionic-angular';

/*
  Generated class for the MeetingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MeetingProvider {

  public meetings=[];
  /*
  public meetings = [{
    "meeting": "Meeting 1",
    "members": [{
      "title": "Type 1",
      "cost": "250",
      "costScheme": "h",
      "number": "5"
    },
    {
      "title": "Type 2",
      "cost": "150",
      "costScheme": "h",
      "number": "2"
    },
    {
      "title": "Type 3",
      "cost": "450",
      "costScheme": "h",
      "number": "3"
    },
    {
      "title": "Type 4",
      "cost": "400",
      "costScheme": "h",
      "number": "1"
    }]
  },
  {
    "meeting": "Meeting 2",
    "members": [{
      "title": "Type 1b",
      "cost": "450",
      "costScheme": "h",
      "number": "4"
    },
    {
      "title": "Type 2b",
      "cost": "550",
      "costScheme": "h",
      "number": "2"
    },
    {
      "title": "Type 3b",
      "cost": "670",
      "costScheme": "h",
      "number": "3"
    }]
  }
  ]
  */

  public members: any;

  public time = 0;

  public cost = 0;

  public costScheme = "h";

  public timer = true;


  constructor(
    public http: HttpClient,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    public modalCtrl: ModalController,
    private storage: Storage
  ) {
    console.log('Hello MeetingProvider Provider');
  }



  removeMember(i) {
    //Include alert?

    let alert = this.alertController.create({
      title: 'Removal confirmation',
      message: 'Are you sure you want to remove this profile?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Remove clicked');
            this.members.splice(i, 1);
          }
        }
      ]
    });
    alert.present();


  }

  removeMeeting(i) {
    //Include alert?

    let alert = this.alertController.create({
      title: 'Removal confirmation',
      message: 'Are you sure you want to remove this meeting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Remove clicked');
            this.meetings.splice(i, 1);
          }
        }
      ]
    });
    alert.present();


  }





  addMember(title, cost, costScheme, numb) {

    let title_corrected = "Person";
    let cost_corrected = 0;
    let numb_corrected = 0;

    if (cost>0) {
      cost_corrected = cost;
    }
    if (numb>0) {
      numb_corrected = numb;
    }

    if (title.length>=1) {
      title_corrected = title;
    }

    this.members.push({
      "title": title_corrected,
      "cost": cost_corrected,
      "costScheme": costScheme,
      "number": numb_corrected
    });
  }


  editMember(indexMember, title, cost, costScheme, numb) {

    this.members[indexMember].title = title;
    this.members[indexMember].cost = cost;
    this.members[indexMember].costScheme = costScheme;
    this.members[indexMember].number = numb;

    //alert(this.members[indexMember]);

  }

  loadMeeting(index) {
    this.members = JSON.parse(JSON.stringify(this.meetings[index].members));
  }


  saveMeeting(mytitle: any) {
    this.meetings.push({
      "meeting": mytitle,
      "members": this.members
    });

    this.storeMeetings();

  }

  storeMeetings() {
    this.storage.set('meetings', this.meetings)
      .then(
        () => {
          console.log('Stored item!');

          let toast = this.toastCtrl.create({
            message: 'Meeting profile was saved',
            duration: 3000,
            position: 'bottom'
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
        },
        error => {
          console.error('Error storing item', error);
        }
      );
  }

  restoreMeetings() {
    this.storage.get('meetings')
      .then(
        (data) => {
          console.log("Loaded meetings file");
          console.log(data);
          if (!!data) {
            console.log("and it is not null!");
            this.meetings = data;
          }
          else {
            console.log("oh no, it's null!");

            /*this.meetings = [{
              "meeting": "Meeting 1",
              "members": 
                [{
                  "title": "Type 1",
                  "cost": "250",
                  "number": "5"
                },
                {
                  "title": "Type 2",
                  "cost": "150",
                  "number": "2"
                },
                {
                  "title": "Type 3",
                  "cost": "450",
                  "number": "3"
                },
                {
                  "title": "Type 4",
                  "cost": "400",
                  "number": "1"
                }]
            }];*/
          }
          

        },
        error => {
          console.log("No meetings file");
          console.error(error);
        }
      );
  }



}
