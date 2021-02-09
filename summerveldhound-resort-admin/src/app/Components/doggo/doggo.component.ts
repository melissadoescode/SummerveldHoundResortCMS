import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Doggo } from 'src/app/Models/doggo';
import { DoggoService } from 'src/app/Services/Doggo/doggo.service';

@Component({
  selector: 'app-doggo',
  templateUrl: './doggo.component.html',
  styleUrls: ['./doggo.component.css']
})
export class DoggoComponent implements OnInit {

  doggos: Doggo[]=[];
  doggoForm: any;
  doggo: Doggo;
  formHeading: string;
  doggoUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

  constructor(private doggoService: DoggoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.doggoForm = this.formBuilder.group({
      DoggoName:['', Validators.required],
      DoggoProfilePic: ['', Validators.required],
      DoggoDescription: ['', Validators.required],
      DoggoNickname: ['', Validators.required],    
    })
    this.getDoggos();
  }

  addDoggo(doggo:Doggo){
    if(doggo!=undefined && doggo!=null){
      if(this.doggoUpdate==null){
        this.doggoService.addDoggo(doggo).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getDoggos();
        });
      }
      else{
        doggo.doggoId = this.doggoUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.doggoService.updateDoggo(this.doggoUpdate, doggo).subscribe(()=>{
            alert("Doggo Updated Successfully!");
            this.getDoggos();
            this.setHeading();
          });
        }
        else{
          this.getDoggos();
        }
      }
    }
  }
  
  getDoggos(){
    this.doggoService.getDoggo().subscribe((data:any)=>{
      this.doggos = data;
    });
  }

  getDoggoById(doggoId:number){
    this.doggoService.getDoggoById(doggoId).subscribe((data:any)=>{
      this.doggo = data;
    });
  }

  updateDoggo(doggoId:number){
    console.log(doggoId);
    this.doggoService.getDoggoById(doggoId).subscribe((data:any)=>{
      this.doggo = data;
      console.log(data);
      this.doggoUpdate = doggoId;
      this.doggoForm.controls['DoggoName'].setValue(data.doggoName);
      this.doggoForm.controls['DoggoProfilePic'].setValue(data.doggoProfilePic);
      this.doggoForm.controls['DoggoDescription'].setValue(data.doggoDescription);
      this.doggoForm.controls['DoggoNickname'].setValue(data.doggoNickname);
    });
  }

  deleteDoggo(doggoId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.doggoService.deleteDoggo(doggoId).subscribe((data:any)=>{
        this.getDoggos();
      });
    }
    else{
      this.getDoggos();
    }
  }

  onFormSubmit(){
    const doggoData = this.doggoForm.value;
    this.addDoggo(doggoData);
  }

  resetForm(){
    this.doggoForm.reset();
  }

  setHeading(){
    this.doggoUpdate = null;
    this.resetForm();
  } 

}
