import {Component} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {ListaModel} from '../../models/lista.model';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  async agregarLista() {

    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data: ListaModel) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
          }
        }
      ]

    });
    await alert.present();
  }

}
