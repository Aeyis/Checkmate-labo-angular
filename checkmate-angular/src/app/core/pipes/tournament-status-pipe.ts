import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tournamentStatus',
})
export class TournamentStatusPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
          case 'waiting': return 'En Attente';
          case 'started': return 'En cours';
          case 'finished': return 'Terminé';
          default: return value;
        }
    }
}
