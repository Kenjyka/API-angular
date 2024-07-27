import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-atualiza-produto',
  templateUrl: './atualiza-produto.component.html',
  styleUrls: ['./atualiza-produto.component.css']
})
export class AtualizaProdutoComponent implements OnInit{

  public produtoId:number = 0;
  public produto: Produto = new Produto(0, "", "", "", 0); 

  constructor(private _produtoService:ProdutoService, private _router: Router, private _activatedRoute: ActivatedRoute){
    this._activatedRoute.params.subscribe(params => this.produtoId = params['id'])
  }

  ngOnInit(): void {
    this.listarProduto();
  }

  listarProduto():void {
    this._produtoService.getProduto(this.produtoId).subscribe(
      (response : any) => {
        this.produto = new Produto(
          response[0].id,
          response[0].produto,
          response[0].descricao,
          response[0].foto,
          response[0].preco
        );
      }
    )
  }

  atualizar(id: number):void {
    this._produtoService.atualizaProduto(id, this.produto).subscribe(
      produto => {
        this.produto = new Produto(0, "", "", "", 0)
      },
      erro => {
        alert("erro ao atualizar")
      }

    );

    this._router.navigate(["restrito/lista"])
  }

}
