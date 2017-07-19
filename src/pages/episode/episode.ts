import { EpisodeService } from './service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
  providers: [EpisodeService]
})
export class EpisodePage {

  items: Array<{id: number, videoUrl: string, durationSeconds: number, watched: boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private episodeService: EpisodeService, private toastController: ToastController) {

    var navItem: any = navParams.get('item');

    this.episodeService.listEpisode(navItem.id).subscribe(
      data => {
        this.items = data;
        console.log(data);
      },
      err => {
        this.showServerIpMissingToast(err)
        console.log(err);
      }, 
      () => console.log('completed')
    );
  }

  itemTapped(event, item){
      console.log("set as watched" + item.id);
      this.episodeService.setAsWatched(item.id).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
            this.showServerIpMissingToast(err)
          }, 
          () => console.log('completed')
        );
        
      window.open(item.videoUrl, '_system');
  }

  private showServerIpMissingToast(err: Error){
    if (err.constructor.name === 'NativeStorageError'){
      this.toastController.create({message: JSON.stringify(err) ,duration: 3000}).present();
    }
  }

}
