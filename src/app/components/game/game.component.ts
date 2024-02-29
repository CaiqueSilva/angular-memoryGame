import { Component, OnInit } from '@angular/core';
import * as cards_memory from '../../../assets/data/cards_memory.json';

interface Card{
  id:number
  url:string
  alia:string
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  cardsMemory: any // Declara a propriedade cardsMemory
  urls:string[] = []
  elementoHTML: any;
  pontosJogador:any = 0
  textoVitoria:string = ""
  // id:number
  // url:string
  // alias:string[] = []
  arrayVerificacao:string[] | any = []
  quantosClique: number = 0;

  constructor() { }

  ngOnInit(): void {

    if(cards_memory){
      this.cardsMemory = cards_memory
      this.urls = this.cardsMemory.cards.map((card: Card) => card.url);
            // Duplica o array de URLs
      this.urls = this.urls.concat(this.urls);
            // Embaralha o array de URLs
      this.shuffleArray(this.urls);
    }
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onClickCard(event: Event): void {
    this.quantosClique += 1
    console.log(this.urls.length)
    console.log(this.pontosJogador)

    if(this.quantosClique <= 2){
    const target = event.target as HTMLElement;

    this.arrayVerificacao.push((target as HTMLImageElement).src)

    if(target.classList.value == 'body__image rotate-animation'){
      target.classList.add('rotate');
      target.classList.remove('rotate-animation');

      target.parentElement?.classList.remove('rotateCardParent')
      target.parentElement?.classList.add('rotateCardReverseParent')

      // logica do jogo
      this.logicaJogo()
      this.verificaPontosJogador()
      }
      else if(target.classList.value == 'body__image rotate'){
      target.classList.add('rotate-animation');
      target.classList.remove('rotate');

      target.parentElement?.classList.add('rotateCardParent')
      target.parentElement?.classList.remove('rotateCardReverseParent')

      // logica do jogo
      this.logicaJogo()
      this.verificaPontosJogador()

    } else {
      target.classList.add('rotate-animation');
      target.parentElement?.classList.add('rotateCardParent')

      // logica do jogo
      this.logicaJogo()
      this.verificaPontosJogador()
    }
  }
}

  logicaJogo() {

    if (this.arrayVerificacao.length == 2) {
      if (this.arrayVerificacao[0] != this.arrayVerificacao[1]) {
        // As cartas não correspondem: aguarda um breve período e, em seguida, vira as cartas de volta suavemente
        setTimeout(() => {
          const cartasViradas = document.querySelectorAll('.body__image.rotate-animation');
          cartasViradas.forEach(cart => {
            cart.classList.remove('rotate-animation');
            cart.parentElement?.classList.remove('rotateCardParent');
            cart.parentElement?.classList.add('rotateCardReverseParent');
            this.quantosClique = 0;
          });
          this.arrayVerificacao = [];
          this.excluiClasses();
        }, 899);
      } else {

        const cartasViradas = document.querySelectorAll('.body__image.rotate-animation');
        cartasViradas.forEach(cart => {
          cart.classList.add('rotate-animation2');
          cart.parentElement?.classList.add('rotateCardParent2');

        });

        this.quantosClique = 0;
        this.pontosJogador += 1;
        this.arrayVerificacao = [];
      }
    }
  }

  excluiClasses(){
    setTimeout(() => {
      const cartasViradas = document.querySelectorAll('.body__image');
      cartasViradas.forEach(cart => {

        cart.parentElement?.classList.remove('rotateCardReverseParent');
      });
    }, 200);

  }

  verificaPontosJogador() {
    if(this.pontosJogador >= this.urls.length/2){
      this.textoVitoria = "SUCCESS!!"
    }
  }

  reiniciarJogo(): void {
    window.location.reload();
  }
}
