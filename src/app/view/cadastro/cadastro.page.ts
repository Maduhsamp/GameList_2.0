import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome! : string;
  lancamento! : number;
  distribuidora! : string;
  genero! : number;
  tipo! : number;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService){
      
    }
  
  ngOnInit() {

  }

  cadastro(){
    if (this.nome && this.lancamento) {
      let create: Itens = new Itens(this.nome, this.lancamento);
      create.distribuidora = this.distribuidora;
      create.genero = this.genero;
      create.tipo = this.tipo;
      this.firebase.register(create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERRO!', 'Nome e lançamento são campos obrigatórios!');
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Jogos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
