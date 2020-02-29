import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  form = {
    type: 'user',
    value: null
  };
  result = null;
  loading: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() { }

  search() {
    //Validar campos
    if (this.form.type && this.form.value) {

      this.form.value =  this.form.value.replace(/[^\w\s]/gi, '');
      
      this.loading = true;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        })
      }

      let data = {
        tag: this.form.value,
        user: this.form.value
      };

      this.http.post('https://apinsta.herokuapp.com/' + this.form.type, data, httpOptions).subscribe((res: any) => {
        this.result = res;

        setTimeout(() => {
          let hash = document.getElementById('target') as HTMLElement;
          console.log(hash)
          hash.scrollIntoView({ behavior: 'smooth' });
          this.loading = false;
        }, 500)

      }, (err) => {
        this.loading = false;
        alert('Erro, por favor. Tente novamente.');
      });
    }
  }

}
