import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tournamentStatus',
})
export class TournamentStatusPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }
}
