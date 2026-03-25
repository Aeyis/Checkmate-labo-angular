import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateTournament} from '@core/models/tournament.interface';
import {TournamentService} from '@core/services/tournament.service';

@Component({
    selector: 'app-tournament-create-page',
    imports: [ReactiveFormsModule],
    templateUrl: './tournament-create-page.html',
    styleUrl: './tournament-create-page.css',
})
export class TournamentCreatePage {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    name: ['', Validators.required],
    location:[''],
    minPlayers:[2,Validators.required],
    maxPlayers:[32,Validators.required],
    minElo:[0],
    maxElo:[3000],
    womenOnly: [false],
    endRegistrationDate: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    await this._tournamentService.create(this.form.value as CreateTournament);
    this._router.navigate(['/admin/tournament']);
  }
}
