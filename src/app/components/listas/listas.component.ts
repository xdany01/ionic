import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {ListaModel} from '../../models/lista.model';
import {AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList, {static: true}) lista: IonList;
  @Input() terminada = true;

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
  }

  listaSeleccionada(lista: ListaModel) {
    if (this.terminada) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: ListaModel) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: ListaModel) {
    console.log(lista);
    const alert = await this.alertController.create({
      header: 'Editar titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actializar',
          handler: (data: ListaModel) => {
            if (data.titulo.length === 0) {
              return;
            } else {
              lista.titulo = data.titulo;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            }
          }
        }
      ]

    });
    await alert.present();

  }

}
