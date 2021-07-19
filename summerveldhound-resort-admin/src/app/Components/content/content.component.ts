import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Content } from 'src/app/Models/content';
import { ContentService } from 'src/app/Services/content/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contents: Content[]=[];
  contentForm: any;
  content: Content;
  formHeading: string;
  contentUpdate = null;
  pencil = faPencilAlt;
  trash = faTrashAlt;
  plus = faPlus;

 constructor(private contentService: ContentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contentForm = this.formBuilder.group({
      albumId: ['', Validators.required],
      contentUpload: ['', Validators.required],
      contentDescription: ['', Validators.required]
    })
    this.getContents();
  }
  addContent(content:Content){
    if(content!=undefined && content!=null){
      if(this.contentUpdate==null){
        this.contentService.addContent(content).subscribe(()=>{
          alert("Record Added Successfully!");
          this.setHeading();
          this.getContents();
        });
      }
      else{
        content.albumId = this.contentUpdate;
        if(window.confirm('Are you sure you want to update this record?')){
          this.contentService.updateContent(this.contentUpdate, content).subscribe(()=>{
            alert("Record Updated Successfully!");
            this.getContents();
            this.setHeading();
          });
        }
        else{
          this.getContents();
        }
      }
    }
  }
  
  getContents(){
    this.contentService.getContent().subscribe((data:any)=>{
      this.contents = data;
    });
  }

  getContentById(contentId:number){
    this.contentService.getContentById(contentId).subscribe((data:any)=>{
      this.content = data;
    });
  }

  getContentByAlbumId(albumId: number){


  }

  updateContent(contentId:number){
    this.contentService.getContentById(contentId).subscribe((data:any)=>{
      this.content = data;
      this.contentUpdate = contentId;
      this.contentForm.controls['albumId'].setValue(data.albumId);
      this.contentForm.controls['contentUpload'].setValue(data.contentUpload);
      this.contentForm.controls['contentDescription'].setValue(data.contentDescription);
    });
  }

  deleteContent(doggoContentId:number){
    if(window.confirm('Are you sure you want to delete this record?')){
      this.contentService.deleteContent(doggoContentId).subscribe((data:any)=>{
        this.getContents();
      });
    }
    else{
      this.getContents();
    }
  }

  onFormSubmit(){
    const doggoData = this.contentForm.value;
    this.addContent(doggoData);
  }

  resetForm(){
    this.contentForm.reset();
  }

  setHeading(){
    this.contentUpdate = null;
    this.resetForm();
  } 
}
