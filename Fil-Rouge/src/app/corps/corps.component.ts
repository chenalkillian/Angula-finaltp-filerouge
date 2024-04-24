import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.css']
})



export class CorpsComponent implements OnInit, OnDestroy {

  //déclaration des variables pour l'app
  listeLog = []; //liste pour les alerte log 
  alerteAffichee = false;
  heure: string;
  intervalId: any;
  heureAvancee: number = 0;
  garageColorGreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.actualiserHeure();
    this.intervalId = setInterval(() => {
      this.actualiserHeure();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  changestatus(valeur: string): void {
    let test = document.getElementById(valeur);
    let content = document.querySelectorAll('.' + valeur);
    let mot = valeur; // Correction ici, pour récupérer la valeur directement


//Partie Nicolas et Killian  bouton de forçage avec changement de couleurs
    //switch pour savoir quelle couleur mettre
    switch (test.style.backgroundColor) {
      case 'green':
        test.style.backgroundColor = 'red';
        content.forEach((element) => {
          element.textContent = 'Allumer';
          this.listeLog.push(mot + " sur close à " + this.heure);
        });
        break; 
      default:
        test.style.backgroundColor = 'green';
        content.forEach((element) => {
          element.textContent = 'Eteindre';
          this.listeLog.push(mot + " sur open à " + this.heure);
        });
        break;
    }
  }


  
  toggleGarageColor(): void {
    this.garageColorGreen = !this.garageColorGreen;
    const garageColor = document.getElementById('Garage');
    if (this.garageColorGreen) {
      garageColor.style.backgroundColor = 'green';
    } else {
      garageColor.style.backgroundColor = 'red';
    }
  }

//Partie Lenny et Elyes
  //actualise l'heure
  actualiserHeure(): void {
    const maintenant = new Date();
    const minutesAvancees = this.heureAvancee * 30;
    maintenant.setMinutes(maintenant.getMinutes() + minutesAvancees);
    this.heure = this.formaterHeure(maintenant);
  
    const heureActuelle = maintenant.getHours();

    // Vérifier si l'heure actuelle est supérieure à 23h00 et si l'alerte n'a pas déjà été affichée
    if (heureActuelle >= 23 && !this.alerteAffichee) {
      this.alerteAffichee = true; // Mettre la variable à true pour indiquer que l'alerte a été affichée
      let piscine = document.getElementById("Piscine");
      piscine.style.backgroundColor = 'red';
      let content = document.querySelectorAll('.Piscine');
      content.forEach((element) => {
        element.textContent = 'Allumer';
      });
      this.listeLog.push("le PAC est désactivé de 23h00 à 7h00");
      this.listeLog.push("la piscine s'est éteinte");

    }

    // Vérifiez si l'heure actuelle est entre 23h et 7h et si l'alerte n'a pas déjà été affichée
    if ((heureActuelle >= 23 || heureActuelle < 7) && !this.alerteAffichee) {
      // Affichez l'alerte
      this.alerteAffichee = true;
    }

    // Sélectionner tous les boutons avec la classe 'Pac'
    const boutons = document.querySelectorAll('.Pac') as NodeListOf<HTMLButtonElement>;
    const color = document.getElementById('Pac');

    if ((heureActuelle >= 23 || heureActuelle < 7)) {
      // Désactiver tous les boutons avec la classe 'Pac'
      boutons.forEach(bouton => {
        bouton.disabled = true;
      });
      color.style.backgroundColor = 'aqua';
    } else {
      // Activer tous les boutons avec la classe 'Pac'
      boutons.forEach(bouton => {
        bouton.disabled = false;
      });
    }

    //garage:
    const garageColor = document.getElementById('Garage');

    if (heureActuelle >= 7 && heureActuelle < 9) {
      if (!this.garageColorGreen) {
        garageColor.style.backgroundColor = 'green';
        setTimeout(() => {
          garageColor.style.backgroundColor = 'red';
          this.garageColorGreen = false;
        }, 7200000);
      }
    }
  }

  changetime(): void {
    this.heureAvancee++;
  }


  formaterHeure(date: Date): string {
    let heures: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();
    let secondes: number | string = date.getSeconds();

    heures = heures < 10 ? '0' + heures : heures;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secondes = secondes < 10 ? '0' + secondes : secondes;

    return heures + ':' + minutes + ':' + secondes;
  }
}
