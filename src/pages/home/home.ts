import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PostPage} from '../post/post';
import { LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items:any;
  country:any;
  capital:any;

  constructor(public navCtrl: NavController,  private http: Http, public loading: LoadingController) {

  }
  ngOnInit(){   
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
       
     let loader = this.loading.create({
        content: 'Processing please wait...',
      });
    
     loader.present().then(() => {
    
    this.http.post('http://ionicdon.com/mobile/fetch_data.php',options)
    .map(res => res.json())
    .subscribe(res => {
    
     loader.dismiss()
    this.items=res.server_response;
    
    console.log(this.items);
    });
    });
     }
    
    
    
  Post(){
    this.navCtrl.push(PostPage);
  }

}
