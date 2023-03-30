import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CountService } from '../services/count.service';
import { PruebaE } from '../entities/pruebaE';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('contadorSpan') contadorSpan: any;

  cantidad: number = 0;
  parametro: string = '';
  delay: any;

  contador = new PruebaE();

  constructor(private CountServ: CountService) {}

  ngOnInit(): void {
    this.CountServ.getParametros().subscribe((resp: any) => {
      this.contador = resp;
      this.parametro = this.contador.parametro;
      //calcular intervalo
      this.contador.interval =
        (this.contador.tiempo * 1000) / this.contador.cantidad;
      console.log(this.contador.interval);
    });
  }

  ngAfterViewInit(): void {
    this.animarContador();
  }

  //Sugerencia de chatGPT, funciona bien hay que pasarle la cantidad
  animarContador(): void {
    let numeroActual: number = 0;
    const incremento: number = Math.ceil(this.cantidad / 100); //milisegundos
    const intervalo = setInterval(() => {
      numeroActual += incremento;
      if (numeroActual >= this.cantidad) {
        clearInterval(intervalo);
        numeroActual = this.cantidad;
      }
      this.contadorSpan.nativeElement.innerHTML = numeroActual.toLocaleString();
    }, 10);
  }

  contar() {
    if (this.cantidad < this.contador.cantidad) {
      this.setDelay(this.contador.interval);
    } else {
      this.cantidad = this.contador.cantidad;
      window.clearTimeout(this.delay);
    }
  }

  setDelay(inter: number) {
    this.delay = window.setTimeout(this.funct.bind(this), inter);
  }

  funct() {
    this.cantidad += 57;
    this.contar();
  }
}
