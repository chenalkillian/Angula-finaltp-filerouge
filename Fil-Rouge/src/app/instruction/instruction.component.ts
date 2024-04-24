import { Component } from '@angular/core';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent {
  donnee = [''];

  fichierJsonContenu: any; // Nouvelle variable pour stocker le contenu du fichier

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.readFileContent(file);
    }
  }

  readFileContent(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const parsedJson = JSON.parse(content);
        this.fichierJsonContenu = parsedJson; // Stocke le contenu dans la variable
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON :', error);
      }
    };
    reader.readAsText(file);
  }

  onSubmit() {
    const jsonString = JSON.stringify(this.donnee);

    // Création d'un nouveau Blob (objet de données brute) qui contient le contenu JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Création d'un objet URL pour le Blob
    const url = URL.createObjectURL(blob);

    // Création d'un élément <a> pour télécharger le fichier JSON
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    
    // Ajout de l'élément <a> au DOM pour déclencher le téléchargement
    document.body.appendChild(a);
    a.click();
    
    // Nettoyage de l'URL objet
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
 
  }
}
