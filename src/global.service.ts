import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppBootstrapService {

    private readonly route: string = 'route';

    constructor(private router: Router) {

        // get the search portion of the url (everything after the ? including the ?)
        // i.e. http://localhost/?devmode=true&mockData=true....
        // then strip the ? from the string so we can access the hashmap
        const params = new HttpParams({
            fromString: window.location.search.slice(1)
        });

        // urlRoute allows for router navigation that happens before the hash; specially used for navigation in iFrames
        if (params.has(this.route)) {
            const urlRouteParam = params.get(this.route) || '';
            this.router.navigate([urlRouteParam]);
        }
    }

}