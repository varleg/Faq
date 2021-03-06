import { Component } from '@angular/core';
import { Question } from '../question'
import { FormBuilder, Validators } from '@angular/forms';
import { TilkoblingService } from '../tilkobling.service';
import { Dbq } from '../dbq';

@Component({
    selector: 'app-skjema',
    templateUrl: './skjema.component.html',
    styleUrls: ['./skjema.component.css']
})
export class SkjemaComponent {

    q: Question[] = [];

    skjema = this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        body: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        category: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private tilkobling: TilkoblingService) { }

    onSubmit() {
        const skjemaQuestion: Question = Object.assign({},
            this.skjema.value);
        this.saveQ(skjemaQuestion);
    }

    saveQ(question: Question): void {
        if (!question) { return; }
        this.tilkobling.save(question)
            .subscribe(resp => {
                return this.q.push(resp);
            });
    }

    get name() { return this.skjema.get('name'); }
    get title() { return this.skjema.get('title'); }
    get body() { return this.skjema.get('body'); }
    get email() { return this.skjema.get('email'); }
    get category() { return this.skjema.get('category'); }
}
/**

                Body: data['Body'],
                Title: data['Title'],
                Points: data['Points'],
                Answer: data['Answer'],
                Name: data['Name'],
                Email: data['Email'],
                Category: data['Category']
*/
