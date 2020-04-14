

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevParameters } from '../../dev/model/devparameters.model';

@Injectable({ providedIn: 'root' })
export class Global {
    public reloadWithParamsParamName: string = 'reloadWithParams';
    private readonly angularExtraChecksDevModeName: string = 'devmode';
    private readonly mockDataParmName: string = 'mockdata';
    private readonly embedModeParmName: string = 'embedMode';
    private readonly routeParmName: string = 'route';
    private readonly xsrfCredentialsRequired: string = 'XSRFCredentials';
    private readonly useridParmName: string = 'userid';
    private readonly userParmName: string = 'user';
    private readonly restServerRootParmName: string = 'restServerRoot';
    private readonly ngrxstoreDevModeParmName: string = 'ngrxstoreDevMode';
    private readonly brandParmName: string = 'brand';
    private readonly productParmName: string = 'product';
    private readonly brokenWebServiceParmName: string = 'brokenWebService';

    // declare defaults for 2 boolean parameters, leave strings undefined
    private readonly parameters: DevParameters = {
        angularExtraChecksDevMode: false,
        mockData: false,
        ngrxstoreDevMode: false,
        xsrfCredentialsrequired: true,
        brokenWebService: false
    };

    constructor() {
        // get the search portion of the url (everything after the ? including the ?)
        // i.e. http://localhost/?devmode=true&mockData=true....
        // then strip the ? from the string so we can access the hashmap
        const params = new HttpParams({
            fromString: window.location.search.slice(1)
        });
        // let params = new URLSearchParams(window.location.search.slice(1));
        if (params.has(this.angularExtraChecksDevModeName)) {
            this.parameters.angularExtraChecksDevMode = this.toBoolean(params.get(this.angularExtraChecksDevModeName) || 'false');
        }

        if (params.has(this.mockDataParmName)) {
            this.parameters.mockData = this.toBoolean(params.get(this.mockDataParmName) || 'false');
        }

        if (params.has(this.embedModeParmName)) {
            this.parameters.embedMode = this.toBoolean(params.get(this.embedModeParmName) || 'false');
        }

        if (params.has(this.routeParmName)) {
            this.parameters.route = params.get(this.routeParmName) || '';
        }

        if (params.has(this.xsrfCredentialsRequired)) {
            this.parameters.xsrfCredentialsrequired = this.toBoolean(params.get(this.xsrfCredentialsRequired) || 'true');
        }

        if (params.has(this.useridParmName)) {
            this.parameters.userid = Number(params.get(this.useridParmName));
        }

        if (params.has(this.userParmName)) {
            this.parameters.user = params.get(this.userParmName) || '';
        }

        if (params.has(this.restServerRootParmName)) {
            this.parameters.restServerRoot = params.get(this.restServerRootParmName) || '';
        }

        if (params.has(this.ngrxstoreDevModeParmName)) {
            this.parameters.ngrxstoreDevMode = this.toBoolean(params.get(this.ngrxstoreDevModeParmName) || 'false');
        }

        if (params.has(this.brandParmName)) {
            this.parameters.brand = params.get(this.brandParmName) || '';
        }

        if (params.has(this.productParmName)) {
            this.parameters.product = params.get(this.productParmName) || '';
        }

        if (params.has(this.brokenWebServiceParmName)) {
            this.parameters.brokenWebService = this.toBoolean(params.get(this.brokenWebServiceParmName) || 'false');
        }
    }

    /**
     * Reload app with the chosen dev properties set.
     * NOTE: causes angular to unload entire angular runtime and re-bootstrap
     */
    reloadWithParams(parametersToReloadWith: DevParameters) {
        let urlParameters = new HttpParams();
        urlParameters = urlParameters.set(this.angularExtraChecksDevModeName, parametersToReloadWith.angularExtraChecksDevMode.toString());
        urlParameters = urlParameters.set(this.mockDataParmName, parametersToReloadWith.mockData.toString());
        urlParameters = urlParameters.set(this.xsrfCredentialsRequired, parametersToReloadWith.xsrfCredentialsrequired.toString());
        urlParameters = urlParameters.set(this.reloadWithParamsParamName, 'true');

        if (parametersToReloadWith && parametersToReloadWith.brokenWebService) {
            urlParameters = urlParameters.set(this.brokenWebServiceParmName, parametersToReloadWith.brokenWebService.toString());
        }

        if (parametersToReloadWith.embedMode) {
            urlParameters = urlParameters.set(this.embedModeParmName, parametersToReloadWith.embedMode.toString());
        }

        if (parametersToReloadWith.route) {
            urlParameters = urlParameters.set(this.routeParmName, parametersToReloadWith.route.toString());
        }

        if (parametersToReloadWith.user && parametersToReloadWith.userid) {
            urlParameters = urlParameters.set(this.useridParmName, parametersToReloadWith.userid.toString());
            urlParameters = urlParameters.set(this.userParmName, parametersToReloadWith.user.toString());
        }

        if (parametersToReloadWith.restServerRoot) {
            urlParameters = urlParameters.set(this.restServerRootParmName, parametersToReloadWith.restServerRoot.toString());
        }

        if (parametersToReloadWith.ngrxstoreDevMode) {
            urlParameters = urlParameters.set(this.ngrxstoreDevModeParmName, parametersToReloadWith.ngrxstoreDevMode.toString());
        }

        if (parametersToReloadWith.brand) {
            urlParameters = urlParameters.set(this.brandParmName, parametersToReloadWith.brand.toString());
        }

        if (parametersToReloadWith.product) {
            urlParameters = urlParameters.set(this.productParmName, parametersToReloadWith.product.toString());
        }

        window.location.search = '?' + urlParameters.toString();
    }

    /**
     * Check if system is in development mode (angular does extra checks if so)
     * @return True if application is in development mode
     */
    isAngularExtraChecksMode(): boolean {
        return this.parameters.angularExtraChecksDevMode;
    }

    /**
     * Check if system should return mock data payloads for proxies
     * @return True if application should return mock data
     */
    isMockDataMode(): boolean {
        return this.parameters.mockData;
    }

    /**
     * Check if system should return mock data payloads for proxies
     * @return True if application should return mock data
     */
    isXsrfCredentialsRequired(): boolean {
        return this.parameters.xsrfCredentialsrequired;
    }

    /**
     * Check if app should be in embed mode
     * If the app is in embed mode the sei-header and sei-footer will be hidden in the app.
     * @return True if application is in embed mode
     */
    isEmbedMode(): boolean {
        return this.parameters.embedMode;
    }

    /**
     * Returns the route, if specified on the url.
     * @return route present on URL
     */
    getRoute(): string | undefined {
        return this.parameters.route;
    }

    /**
     * Return the userid, if specified on the url.
     * Use hasUserId() to determine if this value has been specified
     * @return userId present on URL
     */
    getUserId(): number | undefined {
        return this.parameters.userid;
    }

    /**
     * To be used for testing (will be ignored in prod by siteminder).
     * @return True if application has a userid 'hardcoded'.
     */
    hasUserId(): boolean {
        return this.parameters.userid ? this.parameters.userid > 0 : false;
    }

    /**
     * Return the user, if specified on the url.
     * Use hasUser() to determine if this value has been specified
     * @return user present on URL
     */
    getUser(): string | undefined {
        return this.parameters.user;
    }

    /**
     * To be used for testing (will be ignored in prod by siteminder).
     * @return True if application has a user 'hardcoded'.
     */
    hasUser(): boolean {
        return !this.isEmpty(this.parameters.user);
    }

    /**
     * Return the value of the rest server root.
     * Utilize hasRestServerRoot() to determine if present prior to retrieving
     * @return Value for rest server root
     */
    getRestServerRoot(): string | undefined {
        return this.parameters.restServerRoot;
    }

    /**
     * To be used for development only
     */
    hasRestServerRoot(): boolean {
        return !this.isEmpty(this.parameters.restServerRoot);
    }

    /**
     * Return if ngrx store dev mde is turned on
     * Utilize hasNgrxStoreDevMode() to determine if present prior to retrieving
     * @return Value for ngrx store dev mode
     */
    isNgrxstoreDevMode(): boolean {
        return this.parameters.ngrxstoreDevMode;
    }

    /**
     * To be used for testing ngrx/store.
     */
    hasNgrxStoreDevMode(): boolean {
        return !this.isEmpty(this.parameters.ngrxstoreDevMode);
    }

    /**
     * Return the brand name, if specified on the url or returned from siteminder.
     * Use hasBrand() to determine if this value has been specified
     * @return brand present on the URL
     */
    getBrand(): string | undefined {
        return this.parameters.brand;
    }

    /**
     * To be used for testing (will be ignored in prod by siteminder).
     * @return True if application has a brand 'hardcoded'.
     */
    hasBrand(): boolean {
        return !this.isEmpty(this.parameters.brand);
    }

    /**
     * Return the product name, if specified on the url or returned from siteminder.
     * Use hasProduct() to determine if this value has been specified
     * @return product present on URL
     */
    getProduct(): string | undefined {
        return this.parameters.product;
    }

    /**
     * Check if system should simulate broken web service
     * @return True if application simulate broken web service
     */
    isBrokenWebService(): boolean {
        return this.parameters.brokenWebService;
    }

    /**
     * True if object is empty (or null/undefined)
     * @params object - object to check for null, undefined, and empty string
     * @return true if object is empty
     */
    isEmpty(object: Object | undefined): boolean {
        return object === null || object === undefined || object === '';
    }

    toBoolean(value: string): boolean {
        return value.includes('true');
    }

    /* for tab closing */

    closeWindow(): void {
        top.close();
    }

    isBrowserChrome(): boolean {
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }

    isBrowserInternetExplorer(): boolean {
        const ua = window.navigator.userAgent;
        // ie 10
        // ua = 'Mozilla/5.0 (compatible; MSie 10.0; Windows NT 6.2; Trident/6.0)';

        // ie 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // ie 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // edge (ie 12+)
        /* ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36
           Edge/13.10586'; */

        if (ua.indexOf('MSie ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
            return true;
        }

        // other browser
        return false;
    }

    dataSizeInMB(value: string): number {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        // https://stackoverflow.com/questions/23318037/size-of-json-object-in-kbs-mbs/23318053#23318053
        const m = encodeURIComponent(value).match(/%[89ABab]/g);
        return (value.length + (m ? m.length : 0)) / 1000000;
    }
}
