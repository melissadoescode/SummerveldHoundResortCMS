import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Album } from 'src/app/Models/album';
import { AlbumService } from 'src/app/Services/Album/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albums: Album[]=[];
  albumForm: any;
  album: Album;
  formHeading: string;
  albumUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

 constructor(private albumService: AlbumService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.albumForm = this.formBuilder.group({
      doggoId: ['', Validators.required],
      albumName: ['', Validators.required]
    })
    this.getAlbums();
  }

  addAlbum(album:Album){
    if(album!=undefined && album!=null){
      if(this.albumUpdate==null){
        this.albumService.addAlbum(album).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getAlbums();
        });
      }
      else{
        album.albumId = this.albumUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.albumService.updateAlbum(this.albumUpdate, album).subscribe(()=>{
            alert("Album Updated Successfully!");
            this.getAlbums();
            this.setHeading();
          });
        }
        else{
          this.getAlbums();
        }
      }
    }
  }
  
  getAlbums(){
    this.albumService.getAlbum().subscribe((data:any)=>{
      this.albums = data;
    });
  }

  getAlbumById(albumId:number){
    this.albumService.getAlbumById(albumId).subscribe((data:any)=>{
      this.album = data;
    });
  }

  getAlbumByDoggoId(doggoId: number){


  }

  updateAlbum(albumId:number){
    this.albumService.getAlbumById(albumId).subscribe((data:any)=>{
      this.album = data;
      this.albumUpdate = albumId;
      this.albumForm.controls['doggoId'].setValue(data.doggoId);
      this.albumForm.controls['albumName'].setValue(data.albumName);
    });
  }

  deleteAlbum(doggoAlbumId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.albumService.deleteAlbum(doggoAlbumId).subscribe((data:any)=>{
        this.getAlbums();
      });
    }
    else{
      this.getAlbums();
    }
  }

  onFormSubmit(){
    const doggoData = this.albumForm.value;
    this.addAlbum(doggoData);
  }

  resetForm(){
    this.albumForm.reset();
  }

  setHeading(){
    this.albumUpdate = null;
    this.resetForm();
  } 
}
