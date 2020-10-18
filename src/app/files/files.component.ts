import { Component, OnInit } from '@angular/core';
import { FilesService } from './files.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less'],
  providers: [FilesService]
})
export class FilesComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  uploadedFiles: FileList;

  isUpload = false;

  ngOnInit() {
  }

  fileChange(e) {
    this.uploadedFiles = e.target.files;
  }

  upload() {
    const formData = new FormData();
    formData.set('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
    this.isUpload = true;

    this.httpClient.post(`http://localhost:3001/upload`,  formData).subscribe(res => {
      this.isUpload = false;

      if (!res) { return alert('Ошибка при отправке файла'); }

      this.uploadedFiles = null;
      alert('Файл успешно отправлен');
    });
  }
}
