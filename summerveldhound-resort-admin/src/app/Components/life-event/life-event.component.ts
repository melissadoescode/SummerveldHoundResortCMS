import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Doggo } from 'src/app/Models/doggo';
import { Icons } from 'src/app/Models/icon';
import { LifeEvent } from 'src/app/Models/life-event';
import { LifeEventViewModel } from 'src/app/Models/ViewModels/LifeEventViewModel';
import { DoggoService } from 'src/app/Services/Doggo/doggo.service';
import { IconService } from 'src/app/Services/Icon/icon.service';
import { LifeEventService } from 'src/app/Services/LifeEvent/life-event.service';

@Component({
  selector: 'app-life-event',
  templateUrl: './life-event.component.html',
  styleUrls: ['./life-event.component.css']
})
export class LifeEventComponent implements OnInit {
  
  lifeEvents: LifeEventViewModel[];
  lifeEvent: LifeEventViewModel;
  lifeEventForm: any;
  doggos: Doggo[];
  icons: Icons[];
  doggo: Doggo;
  icon: Icons;
  selectedDoggo: Doggo;
  selectedIcon: Icons;
  doggoId: number = null;
  iconId: number = null;
  dataFromForm: any;
  updateOption = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;

  constructor(private lifeEventService: LifeEventService, private doggoService: DoggoService, private iconService: IconService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getLifeEvents();
    this.getDoggos();
    this.getIcons();
    this.lifeEventForm= this.formBuilder.group({
      lifeEventName:['', Validators.required],
      lifeEventDate:['',Validators.required],
    });
  }

  addLifeEvents(lifeEvent: LifeEvent){
    if(lifeEvent != undefined && lifeEvent != null){
      if(this.updateOption == null){
        lifeEvent.doggoId = this.doggoId;
        lifeEvent.iconId = this.iconId;
        this.lifeEventService.addLifeEvent(lifeEvent).subscribe((data:any)=>{
          this.changeHeading();
          this.getLifeEvents();
          alert("lifeEvent Added Successfully");
        });
      }
      else{
        lifeEvent.doggoId = this.selectedDoggo.doggoId;
        lifeEvent.iconId = this.selectedIcon.iconId;
        lifeEvent.lifeEventId = this.updateOption;
        if(window.confirm('Are you sure you want to update this record?')){
        this.lifeEventService.updateLifeEvent(this.updateOption, lifeEvent).subscribe((data:any)=>{
          this.getLifeEvents();
          this.changeHeading();
          alert("lifeEvent Updated Successfully");
        });
      }
      else{
        this.getIcons();
      }
      this.updateOption=null;
      }
    }
  }

  getLifeEvents(){
    this.lifeEventService.getLifeEvent().subscribe((data:any)=>{
      this.lifeEvents = data;
    });
  }

  getDoggos(){
    this.selectedDoggo={
      doggoId: null,
      doggoName: 'Select doggo',
      doggoDescription: '',
      doggoNickname: '',
      doggoProfilePic: '',
      doggoDateCreated: null
    };
    this.doggoService.getDoggo().subscribe((data:any)=>{
      this.doggos = data;
    })
  }

  getIcons(){
    this.selectedIcon={
      iconId: null,
      iconSrcUrl: 'Select Icon Type'
    };
    this.iconService.getIcon().subscribe((data:any)=>{
      this.icons = data;
    });
  }

  getReferenceDoggo(){
    this.doggoService.getDoggoById(this.doggoId).subscribe((data:any)=>{
      this.doggo = data;
      this.selectedDoggo = data;
    });
  }

  getReferenceIcon(){
    this.iconService.getIconById(this.iconId).subscribe((data:any)=>{
      this.icon = data;
      this.selectedIcon = data;
    });
  }

  getDoggoId(doggo: any){
    this.selectedDoggo = doggo;
    this.doggoId = doggo.doggoId;
  }

  getIconId(producttype:any){
    this.selectedIcon = producttype;
    this.iconId = producttype.iconId;
  }


  loadLifeEventsToEdit(lifeEventId: number){
    
    this.updateOption = lifeEventId;
    
    this.lifeEventService.getLifeEventById(lifeEventId).subscribe((data:any)=>{
      this.lifeEvent = data;
      this.lifeEventForm.controls['lifeEventName'].setValue(data.lifeEventName);
      this.lifeEventForm.controls['lifeEventDate'].setValue(data.lifeEventDate);
    });
  }

  loadFormToEdit(lifeEventId: number){
    this.updateOption = lifeEventId;
    this.lifeEventService.getLifeEventById(lifeEventId).subscribe((data:any)=>{
      this.lifeEvent = data;
      this.lifeEventForm.controls['lifeEventName'].setValue(data.lifeEventName);
      this.lifeEventForm.controls['lifeEventDate'].setValue(data.lifeEventDate);
      this.doggoId = data.doggoId;
      this.iconId = data.iconId;
      this.getReferenceDoggo();
      this.getReferenceIcon();
    });
  }

  deleteLifeEvent(lifeEventId: number){
    if(window.confirm("Are you sure you want to delete this lifeEvent")){
      this.lifeEventService.deleteLifeEvent(lifeEventId).subscribe((data:any)=>{
        this.getLifeEvents();
      });
    }
  }

  onFormSubmit(){
    this.getReferenceDoggo();
    this.getReferenceIcon();
    const productData = this.lifeEventForm.value;
    var l :LifeEvent = this.lifeEventForm.value;
    this.addLifeEvents(l);
  }

  changeHeading(){
    this.updateOption=null;
    this.lifeEventForm.reset();
    this.selectedDoggo = {
      doggoId: null,
      doggoName: 'Select doggo',
      doggoDescription: '',
      doggoNickname: '',
      doggoProfilePic: '',
      doggoDateCreated: null
    };
    this.selectedIcon = {
      iconId: null,
      iconSrcUrl: 'Select Icon Type'
    };
  }
}
