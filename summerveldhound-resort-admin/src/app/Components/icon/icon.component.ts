import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Icons } from 'src/app/Models/icon';
import { IconService } from 'src/app/Services/Icon/icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {


  icons: Icon[]=[];
  iconForm: any;
  icon: Icon;
  formHeading: string;
  iconUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

  constructor(private iconService: IconService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.iconForm = this.formBuilder.group({
      IconSrcUrl:['', Validators.required],
    })
    this.getIcons();
  }

  addIcon(icon:Icons){
    if(icon!=undefined && icon!=null){
      if(this.iconUpdate==null){
        this.iconService.addIcon(icon).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getIcons();
        });
      }
      else{
        icon.iconId = this.iconUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.iconService.updateIcon(this.iconUpdate, icon).subscribe(()=>{
            alert("Icon Updated Successfully!");
            this.getIcons();
            this.setHeading();
          });
        }
        else{
          this.getIcons();
        }
      }
    }
  }
  
  getIcons(){
    this.iconService.getIcon().subscribe((data:any)=>{
      this.icons = data;
    });
  }

  getIconById(iconId:number){
    this.iconService.getIconById(iconId).subscribe((data:any)=>{
      this.icon = data;
    });
  }

  updateIcon(iconId:number){
    console.log(iconId);
    this.iconService.getIconById(iconId).subscribe((data:any)=>{
      this.icon = data;
      console.log(data);
      this.iconUpdate = iconId;
      this.iconForm.controls['IconSrcUrl'].setValue(data.iconSrcUrl);
    });
  }

  deleteIcon(iconId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.iconService.deleteIcon(iconId).subscribe((data:any)=>{
        this.getIcons();
      });
    }
    else{
      this.getIcons();
    }
  }

  onFormSubmit(){
    const iconData = this.iconForm.value;
    this.addIcon(iconData);
  }

  resetForm(){
    this.iconForm.reset();
  }

  setHeading(){
    this.iconUpdate = null;
    this.resetForm();
  } 
}
