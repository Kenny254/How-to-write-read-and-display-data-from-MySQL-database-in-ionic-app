
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  @ViewChild("country") country;
@ViewChild("capital") capital;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  
  Post(){
    //// check to confirm the country and capital fields are filled
   
     if(this.country.value=="" ){
   
    let alert = this.alertCtrl.create({
   
    title:"ATTENTION",
    subTitle:"Country field is empty",
    buttons: ['OK']
    });
   
    alert.present();
     } else
    if(this.capital.value==""){
   
    let alert = this.alertCtrl.create({
   
    title:"ATTENTION",
    subTitle:"Capital field is empty",
    buttons: ['OK']
    });
   
    alert.present();
         
   }
    else 
    {
   
   
   var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });
   
     let data = {
           country: this.country.value,
           capital: this.capital.value,
               
         };
   
   
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
   
    loader.present().then(() => {
   this.http.post('http://ionicdon.com/mobile/post_data.php',data, options)
   .map(res => res.json())
   .subscribe(res => {
   
    loader.dismiss()
   if(res=="post successfull"){
     let alert = this.alertCtrl.create({
       title:"CONGRATS",
       subTitle:(res),
       buttons: ['OK']
       });
      
       alert.present();
    this.navCtrl.push(HomePage);
   
   }else
   {
    let alert = this.alertCtrl.create({
    title:"ERROR",
    subTitle:(res),
    buttons: ['OK']
    });
   
    alert.present();
     } 
   });
   });
    }
   
   }
   }
    

