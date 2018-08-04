import { HttpClient, HttpParams, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment';


interface Response {
  content: Object;
}

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

    pesquisar(filtro: LancamentoFiltro): Promise<any> {

      const search = {};

      if (filtro.descricao && filtro.dataVencimentoInicio && filtro.dataVencimentoFim) {
         search['search'] = new HttpParams()
        .set('descricao', filtro.descricao)
        .set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
        .set('dataVencimentoAte',
          moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
      } else if (filtro.descricao && filtro.dataVencimentoInicio) {
        search['search'] = new HttpParams()
        .set('descricao', filtro.descricao)
        .set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
      } else if (filtro.dataVencimentoInicio && filtro.dataVencimentoFim) {
        search['search'] = new HttpParams()
        .set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
        .set('dataVencimentoAte',
          moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
      } else if (filtro.descricao) {
        search['search'] = new HttpParams()
        .set('descricao', filtro.descricao);
      } else if (filtro.dataVencimentoInicio) {
        search['search'] = new HttpParams()
        .set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
      } else {
        search['search'] = new HttpParams();
      }



      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
        }),
        params: search['search']
      };




      return this.http.get<Response>(`${this.lancamentosUrl}?resumo`, httpOptions)
        .toPromise()
        .then(response => response.content);
    }
}
