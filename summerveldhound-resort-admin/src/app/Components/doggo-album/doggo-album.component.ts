import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DoggoAlbum } from 'src/app/Models/doggo-album';
import { DoggoAlbumService } from 'src/app/Services/DoggoAlbum/doggo-album.service';

@Component({
  selector: 'app-doggo-album',
  templateUrl: './doggo-album.component.html',
  styleUrls: ['./doggo-album.component.css']
})
export class DoggoAlbumComponent implements OnInit {

  doggoAlbums: DoggoAlbum[]=[];
  doggoAlbumForm: any;
  doggoAlbum: DoggoAlbum;
  formHeading: string;
  doggoAlbumUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

  constructor(private doggoAlbumService: DoggoAlbumService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.doggoAlbumForm = this.formBuilder.group({
      doggoId: ['', Validators.required],
      doggoAlbumName: ['', Validators.required],
      dateDoggoAlbumDateCreated: ['', Validators.required]    
    })
    this.getDoggoAlbums();
  }

  addDoggoAlbum(doggoAlbum:DoggoAlbum){
    if(doggoAlbum!=undefined && doggoAlbum!=null){
      if(this.doggoAlbumUpdate==null){
        this.doggoAlbumService.addDoggoAlbum(doggoAlbum).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getDoggoAlbums();
        });
      }
      else{
        doggoAlbum.doggoAlbumId = this.doggoAlbumUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.doggoAlbumService.updateDoggoAlbum(this.doggoAlbumUpdate, doggoAlbum).subscribe(()=>{
            alert("doggoAlbum Updated Successfully!");
            this.getDoggoAlbums();
            this.setHeading();
          });
        }
        else{
          this.getDoggoAlbums();
        }
      }
    }
  }
  
  getDoggoAlbums(){
    this.doggoAlbumService.getDoggoAlbum().subscribe((data:any)=>{
      this.doggoAlbums = data;
    });
  }

  getDoggoAlbumById(doggoAlbumId:number){
    this.doggoAlbumService.getDoggoAlbumById(doggoAlbumId).subscribe((data:any)=>{
      this.doggoAlbum = data;
    });
  }

  updateDoggoAlbum(doggoAlbumId:number){
    this.doggoAlbumService.getDoggoAlbumById(doggoAlbumId).subscribe((data:any)=>{
      this.doggoAlbum = data;
      this.doggoAlbumUpdate = doggoAlbumId;
      this.doggoAlbumForm.controls['doggoAlbumId'].setValue(data.doggoAlbumId);
      this.doggoAlbumForm.controls['doggoId'].setValue(data.doggoId);
      this.doggoAlbumForm.controls['doggoAlbumName'].setValue(data.doggoAlbumName);
      this.doggoAlbumForm.controls['dateDoggoAlbumDateCreated'].setValue(data.dateDoggoAlbumDateCreated);
    });
  }

  deleteDoggoAlbum(doggoAlbumId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.doggoAlbumService.deleteDoggoAlbum(doggoAlbumId).subscribe((data:any)=>{
        this.getDoggoAlbums();
      });
    }
    else{
      this.getDoggoAlbums();
    }
  }

  onFormSubmit(){
    const doggoData = this.doggoAlbumForm.value;
    this.addDoggoAlbum(doggoData);
  }

  resetForm(){
    this.doggoAlbumForm.reset();
  }

  setHeading(){
    this.doggoAlbumUpdate = null;
    this.resetForm();
  } 
}
