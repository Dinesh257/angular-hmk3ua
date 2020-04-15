<div *ngIf="global.isAngularExtraChecksMode()">
    <button type="button"
            class="btn btn-default btn-xs"
            (click)="devModal.show()"
            id="sei-dev-params-button"><small>Show Dev Parameters</small>
    </button>

    <div bsModal
         #devModal="bs-modal"
         class="modal fade"
         tabindex="-1"
         role="dialog"
         aria-labelledby="devParmsModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button"
                            class="close"
                            aria-label="Close"
                            (click)="devModal.hide()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Developer Options</h4>
                </div>
                <div class="modal-body">
                    <form #devToolsForm="ngForm"
                          (ngSubmit)="reloadMe()">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"
                                       [(ngModel)]="parameters.angularExtraChecksDevMode"
                                       id="sei-dev-mode-cb"
                                       name="sei-dev-mode-cb">Development Mode
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"
                                       [(ngModel)]="parameters.mockData"
                                       id="sei-dev-mock-data-cb"
                                       name="sei-dev-mock-data-cb">Mock Data Mode
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"
                                       [(ngModel)]="parameters.brokenWebService"
                                       id="sei-dev-broken-web-service-cb"
                                       name="sei-dev-broken-web-service-cb">Simulate Broken Mock Data Service
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"
                                       [(ngModel)]="parameters.xsrfCredentialsrequired"
                                       id="sei-dev-xsrfCredentials"
                                       name="sei-dev-xsrfCredentials">XSRF Credential Required
                            </label>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox"
                                                   [(ngModel)]="parameters.embedMode"
                                                   id="sei-dev-embed-mode-cb"
                                                   name="sei-dev-embed-mode-cb">Embed Mode
                                            <span class="help-block">Removes sei-header and sei-footer.</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <label for="route">Route</label>
                                    <input type="text"
                                           class="form-control"
                                           [(ngModel)]="parameters.route"
                                           id="route"
                                           name="route"
                                           placeholder="sei-alert">
                                    <span class="help-block">Direct linking to components for iFrames.</span>
                                </div>
                            </div>
                        </div>
                        <!--
                                Commented out until understand how ngrx devtools works with rc6+
                                <div class="checkbox">
                                    <label>
                                    <input [hidden]="true" type="checkbox"
                                            [(ngModel)]="parameters.ngrxstoreDevMode"
                                            id="sei-dev-ngrx-mode-cb"
                                            name="sei-dev-ngrx-mode-cb">@ngrx/store Development Mode
                                    </label>
                                </div> -->
                        <div class="form-group">
                            <label for="userid">User Id</label>
                            <input type="number"
                                   class="form-control"
                                   [(ngModel)]="parameters.userid"
                                   id="userid"
                                   name="userid"
                                   placeholder="ex. 351">
                        </div>
                        <div class="form-group">
                            <label for="user">User</label>
                            <input type="text"
                                   class="form-control"
                                   [(ngModel)]="parameters.user"
                                   id="user"
                                   name="user"
                                   placeholder="ex. q02qseigen05">
                        </div>
                        <div class="form-group">
                            <label for="restServerRoot">Rest Server URL Root</label>
                            <input type="text"
                                   class="form-control"
                                   [(ngModel)]="parameters.restServerRoot"
                                   id="restServerRoot"
                                   name="resetServerRoot"
                                   placeholder="ex. http://seidevc10wls01.gwpdev.seic.com:8003">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-6">
                                    <label for="brand">Brand</label>
                                    <div class="input-group">
                                        <div class="input-group-btn">
                                            <button type="button"
                                                    class="btn btn-default dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">Examples <span class="caret"></span></button>
                                            <ul class="dropdown-menu">
                                                <li *ngFor="let brandDefault of brandDefaults"
                                                    (click)="selectBrand(brandDefault)">
                                                    <a>{{ brandDefault.name }}</a>
                                                </li>
                                            </ul>
                                        </div><!-- /btn-group -->
                                        <input type="text"
                                               class="form-control"
                                               [(ngModel)]="parameters.brand"
                                               id="brand"
                                               name="brand"
                                               placeholder="i.e. seic, regions, frma, thrivent">
                                    </div><!-- /input-group -->
                                </div>
                                <div class="col-xs-6">
                                    <label for="product">Product (use only when Brand is &quot;seic&quot;)
                                    </label>
                                    <input type="text"
                                           class="form-control"
                                           [(ngModel)]="parameters.product"
                                           id="product"
                                           name="product"
                                           placeholder="i.e. appadmin, backoffice, pme">
                                </div>
                                <div class="col-xs-12">
                                    <span class="help-block">
                                            See <a href="{{brandingLink}}" target="_blank">sei-common-components-branding</a> for the
                                            complete list of brands and products.
                                        </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit"
                                class="btn btn-default"
                                id="sei-dev-reload-app-button">Reload App
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>




sei-dev-parms {
    #sei-dev-params-button {
        position: fixed;
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1050;
    }

}

/*
 * Copyright: This information constitutes the exclusive property of SEI
 * Investments Company, and constitutes the confidential and proprietary
 * information of SEI Investments Company.  The information shall not be
 * used or disclosed for any purpose without the written consent of SEI
 * Investments Company.
 */

import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Global } from '../../global/service/global.service';
import { DevParameters } from '../model/devparameters.model';

@Component({
    selector: 'sei-dev-parms',
    templateUrl: './devparms.component.html'
})
export class DevParametersComponent {
    brandingLink: string = 'http://scm.gwpdev.seic.com:8300/projects/BUILD/repos/sei-common-components-branding/browse/lib/branding/firms';
    global: Global;
    @ViewChild('devModal', { static: false }) public devModal: ModalDirective;
    parameters: DevParameters = {
        angularExtraChecksDevMode: false,
        mockData: false,
        embedMode: false,
        route: '',
        user: '',
        userid: 0,
        restServerRoot: '',
        ngrxstoreDevMode: false,
        xsrfCredentialsrequired: true,
        brokenWebService: false
    };

    constructor(global: Global) {
        this.global = global;
        this.parameters = {
            angularExtraChecksDevMode: this.global.isAngularExtraChecksMode(),
            mockData: this.global.isMockDataMode(),
            embedMode: this.global.isEmbedMode(),
            route: this.global.getRoute(),
            user: this.global.getUser(),
            userid: this.global.getUserId(),
            restServerRoot: this.global.getRestServerRoot(),
            ngrxstoreDevMode: this.global.isNgrxstoreDevMode(),
            brand: this.global.getBrand(),
            product: this.global.getProduct(),
            xsrfCredentialsrequired: this.global.isXsrfCredentialsRequired(),
            brokenWebService: this.global.isBrokenWebService()
        };
    }

    brandDefaults = [
        { name: 'seic.compact', brand: 'seic.compact' },
        { name: 'seic', brand: 'seic' },
        { name: 'regions', brand: 'regions' },
        { name: 'frma', brand: 'frma' },
        { name: 'thrivent', brand: 'thrivent' }

    ];

    selectBrand(brandDefault) {
        this.parameters.brand = brandDefault.brand;
    }

    reloadMe() {
        this.global.reloadWithParams(this.parameters);
    }

}

