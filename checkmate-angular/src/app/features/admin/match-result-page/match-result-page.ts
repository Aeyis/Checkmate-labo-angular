import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchService } from '@core/services/match.service';

@Component({
  selector: 'app-match-result-page',
  imports: [ReactiveFormsModule],
  templateUrl: './match-result-page.html',
  styleUrl: './match-result-page.css',
})
export class MatchResultPage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _matchService = inject(MatchService);
  private readonly _fb = inject(FormBuilder);

  matchId: number = 0;

  form = this._fb.group({
    result: ['', Validators.required],
  });

  ngOnInit(): void {
    this.matchId = +this._route.snapshot.params['matchId'];
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    await this._matchService.setResult(this.matchId, this.form.value.result!);
    this._router.navigate(['/admin/members']);
  }
}