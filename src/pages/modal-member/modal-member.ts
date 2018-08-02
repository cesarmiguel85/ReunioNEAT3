import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { MeetingProvider } from '../../providers/meeting/meeting';

/**
 * Generated class for the ModalMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-member',
  templateUrl: 'modal-member.html',
})
export class ModalMemberPage {

  public index: any;
  public numb = "";
  public title = "";
  public cost = "";
  public costScheme = "h";


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public meetingProvider: MeetingProvider
  ) {

    this.index = parseInt(this.navParams.get('data'));
    //alert(this.index);
    if (this.index < 0) {
      //alert("new");
    }
    else {
      this.title = this.meetingProvider.members[this.index].title;
      this.cost = this.meetingProvider.members[this.index].cost;
      this.numb = this.meetingProvider.members[this.index].number;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMemberPage');
  }


  public closeModal() {
    //this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }

  public saveData() {


    if (this.index >= 0) {
      this.meetingProvider.editMember(this.index, this.title, this.cost, this.costScheme, this.numb);
    }
    else {
      this.meetingProvider.addMember(this.title, this.cost, this.costScheme, this.numb);
    }

    this.navCtrl.pop();
  }


}
